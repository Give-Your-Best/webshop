import React, { useState } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useFormikContext } from 'formik';
import { Notification } from '../../atoms';
import { getImageUrl } from '../../../utils/helpers';

export const Images = (data) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const formikProps = useFormikContext();

  const checkFileType = (file) => {
    //do not upload if not in accepted file types
    const acceptedFormats = ['jpeg', 'jpg', 'png', 'heic']; // TODO casing!!
    if (!acceptedFormats.includes(file.name.split('.')[1])) {
      // TODO this might not work beacuse periods in filename
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

  const handleCancel = () => setPreviewVisible(false);

  const handleChange = ({ fileList }) => {
    fileList[0].front = true; //set first image to front image
    data.setUploadedImages(fileList);

    if (data.handleChange) {
      data.handleChange(fileList);
    }

    //update dummy field for image validation
    formikProps.setFieldValue('photos', fileList);
  };

  const getThumbUrl = async (file) => {
    console.log('THUMB', { file });
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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const customRequest = async ({ file, onSuccess }) => {
    const params = {
      public_id: file.uid,
    };

    const { apikey, cloudname, signature, timestamp } = await fetch(
      '/api/cloudinary/upload_url',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': data.token,
        },
        body: JSON.stringify(params),
      }
    ).then((res) => res.json());

    // console.log({ apikey, cloudname, signature, timestamp });

    const formData = new FormData();

    formData.append('file', file);
    formData.append('api_key', apikey);
    formData.append('signature', signature);
    formData.append('timestamp', timestamp);

    Object.entries(params).forEach(([k, v]) => {
      formData.append(k, String(v));
    });

    const response = JSON.parse(
      await fetch(
        'https://api.cloudinary.com/v1_1/' + cloudname + '/auto/upload',
        {
          method: 'POST',
          body: formData,
        }
      ).then((res) => res.text())
    );

    // console.log('FFFFSSSS', { response });

    const {
      created_at: createdAt,
      public_id: publicId,
      secure_url: url,
    } = response;

    const thumbUrl = getImageUrl({
      publicId: file.uid,
      transformations: 'q_auto,f_auto,c_thumb,w_200,ar_1',
    });

    const imageData = {
      createdAt,
      name: file.name,
      publicId,
      thumbUrl,
      url,
      uid: publicId,
    };

    onSuccess(imageData);
  };

  return (
    <>
      <Upload
        customRequest={customRequest}
        listType="picture-card"
        multiple={true}
        beforeUpload={checkFileType}
        fileList={data.uploadedImages || []}
        previewFile={getThumbUrl}
        onPreview={handlePreview}
        disabled={data.editingKey !== data.recordId}
        onChange={handleChange}
      >
        {data.uploadedImages.length >= 4 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        className="modalStyle"
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};
