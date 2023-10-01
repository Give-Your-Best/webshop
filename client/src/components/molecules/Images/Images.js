import React, { useState } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useFormikContext } from 'formik';
import { Notification } from '../../atoms';
import {
  getSignedUrl,
  assetDestroy,
  assetUpload,
} from '../../../services/cloudinary';

const cloudinaryErrorConfig = [
  'Error!',
  'Error updating image. Please try again later',
  'error',
];

export const Images = (data) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [thumbUrl, setThumbUrl] = useState('');
  const { setFieldValue } = useFormikContext();

  const checkFileType = (file) => {
    // Do not upload if not in accepted file types
    const acceptedFormats = ['jpeg', 'jpg', 'png', 'heic', 'webp'];

    // Just get the last item, there may be periods in the original file name
    const fileName = file.name.toLowerCase();
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

  const handleChange = ({ file, fileList }) => {
    // Set first image to front image
    fileList[0].front = true;
    // Update the component
    data.setUploadedImages(fileList);

    if (['uploading', 'error'].includes(file.status)) {
      return;
    }

    // Set the form field
    setFieldValue('photos', fileList);
  };

  const getThumbUrl = async (file) => {
    return file.thumbUrl || thumbUrl || '';
  };

  const handlePreview = async (file) => {
    setPreviewImage(file.mainUrl || file.response.mainUrl || '');
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

    const { error, apikey, cloudname, signature, timestamp } =
      await getSignedUrl(params, data.token);

    if (error) {
      return Notification(...cloudinaryErrorConfig);
    }

    const formData = new FormData();

    formData.append('api_key', apikey);
    formData.append('signature', signature);
    formData.append('timestamp', timestamp);

    Object.entries(params).forEach(([k, v]) => {
      formData.append(k, String(v));
    });

    const { error: destroyError } = await assetDestroy(formData, cloudname);

    if (destroyError) {
      return Notification(...cloudinaryErrorConfig);
    }
  };

  // Upload the asset to cloudinary via signed url
  const customRequest = async ({ file, onSuccess, onError }) => {
    const params = {
      public_id: file.uid,
      overwrite: false,
      format: 'jpg',
      eager: 'q_auto,f_auto,c_fill,w_100,ar_1|q_auto,f_auto,c_fit,w_400',
    };

    const { error, apikey, cloudname, signature, timestamp } =
      await getSignedUrl(params, data.token);

    if (error) {
      Notification(...cloudinaryErrorConfig);

      return onError();
    }

    const formData = new FormData();

    formData.append('file', file);
    formData.append('api_key', apikey);
    formData.append('signature', signature);
    formData.append('timestamp', timestamp);

    Object.entries(params).forEach(([k, v]) => {
      formData.append(k, String(v));
    });

    const result = await assetUpload(formData, cloudname);

    const {
      error: uploadError,
      created_at: createdAt,
      public_id: publicId,
      secure_url: url,
      eager,
    } = result;

    console.log({ result });

    if (uploadError) {
      Notification(...cloudinaryErrorConfig);

      return onError();
    }

    const [thumb, main] = eager;

    setThumbUrl(thumb.secure_url);

    const imageData = {
      createdAt,
      name: file.name,
      publicId, // Can get rid of this later perhaps?
      thumbUrl: thumb.secure_url,
      mainUrl: main.secure_url,
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
