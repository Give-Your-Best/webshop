import React, { useState } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useFormikContext } from 'formik';
import { Notification } from '../../atoms';
import { getImageUrl } from '../../../utils/helpers';
import {
  getSignedUrl,
  handleDestroy,
  handleUpload,
} from '../../../services/cloudinary';

export const Images = (data) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const formikProps = useFormikContext();

  const checkFileType = (file) => {
    // Do not upload if not in accepted file types
    const acceptedFormats = ['jpeg', 'jpg', 'png', 'heic'];

    const fileName = file.name.toLowerCase();

    // Just get the last item, there may be periods in the original file name
    const ext = fileName.split('.').pop();

    if (!acceptedFormats.includes(ext)) {
      Notification(
        'Error!',
        'Error uploading image. Please make sure your file is an image type',
        'error'
      );
      return Upload.LIST_IGNORE;
    } else {
      return true;
    }
  };

  const handleChange = ({ fileList }) => {
    fileList[0].front = true; // Set first image to front image
    data.setUploadedImages(fileList);

    if (data.handleChange) {
      data.handleChange(fileList);
    }

    // Update dummy field for image validation
    formikProps.setFieldValue('photos', fileList);
  };

  const getThumbUrl = async (file) => {
    return getImageUrl({
      publicId: file.uid,
      transformations: 'q_auto,f_auto,c_thumb,w_200,ar_1',
    });
  };

  const handlePreview = async (file) => {
    setPreviewImage(
      getImageUrl({
        publicId: file.uid,
        transformations: 'q_auto,f_auto,c_fill,w_400',
      })
    );
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  // Destroy the asset in cloudinary
  const handleRemove = async (file) => {
    const params = {
      public_id: file.uid,
    };

    const { apikey, cloudname, signature, timestamp } = await getSignedUrl(
      params,
      data.token
    );

    const formData = new FormData();

    formData.append('api_key', apikey);
    formData.append('signature', signature);
    formData.append('timestamp', timestamp);

    Object.entries(params).forEach(([k, v]) => {
      formData.append(k, String(v));
    });

    await handleDestroy(formData, cloudname);
  };

  // Upload the asset to cloudinary via signed url
  const customRequest = async ({ file, onSuccess }) => {
    console.log('CALLED');
    const params = {
      public_id: file.uid,
    };

    const { apikey, cloudname, signature, timestamp } = await getSignedUrl(
      params,
      data.token
    );

    const formData = new FormData();

    formData.append('file', file);
    formData.append('api_key', apikey);
    formData.append('signature', signature);
    formData.append('timestamp', timestamp);

    Object.entries(params).forEach(([k, v]) => {
      formData.append(k, String(v));
    });

    const {
      created_at: createdAt,
      public_id: publicId,
      secure_url: url,
    } = await handleUpload(formData, cloudname);

    const mainUrl = getImageUrl({
      publicId: file.uid,
      transformations: 'q_auto,f_auto,c_fill,w_400',
    });

    const thumbUrl = getImageUrl({
      publicId: file.uid,
      transformations: 'q_auto,f_auto,c_thumb,w_200,ar_1',
    });

    const imageData = {
      createdAt,
      name: file.name,
      publicId,
      mainUrl,
      thumbUrl,
      url,
      uid: publicId,
    };

    onSuccess(imageData);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        disabled={data.editingKey !== data.recordId}
        fileList={data.uploadedImages || []}
        listType="picture-card"
        multiple={true}
        beforeUpload={checkFileType}
        customRequest={customRequest}
        previewFile={getThumbUrl}
        onChange={handleChange}
        onPreview={handlePreview}
        onRemove={handleRemove}
      >
        {data.uploadedImages.length >= 4 ? null : uploadButton}
      </Upload>

      <Modal
        visible={previewVisible}
        className="modalStyle"
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};
