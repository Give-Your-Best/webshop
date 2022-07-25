import React, { useState } from "react";
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useFormikContext } from "formik";
import { Notification } from '../../atoms';

export const Images = (data) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const formikProps = useFormikContext();

  const checkFileType = (file) => {
    //do not upload if not in accepted file types
    const acceptedFormats = ['jpeg', 'jpg', 'png', 'heic'];
    if (!acceptedFormats.includes(file.name.split('.')[1])) {
      Notification('Error!', 'Error uploading image. Please make sure your file is an image type', 'error');
      return Upload.LIST_IGNORE
    } else {
      return true
    }
  }

  const handleCancel = () => setPreviewVisible(false);

  const handleChange = ({ file, fileList }) => {

    fileList[0].front = true; //set first image to front image
    data.setUploadedImages(fileList)

    if (data.handleChange) {
      data.handleChange(data.uploadedImages)
    }

    //update dummy field for image validation
    formikProps.setFieldValue("photos", data.uploadedImages)
  }

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview || file.src);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const custom = ({ onSuccess }) => {
    onSuccess("Ok");
  }

  return (
    <>
    <Upload
      customRequest={custom}
      listType="picture-card"
      multiple={true}
      beforeUpload={checkFileType}
      fileList={data.uploadedImages || []}
      onPreview={handlePreview}
      disabled={data.editingKey !== data.recordId}
      onChange={handleChange}
    >
      {data.uploadedImages.length >= 4 ? null : uploadButton}
    </Upload>
    <Modal
      visible={previewVisible}
      className= "modalStyle"
      title={previewTitle}
      footer={null}
      onCancel={handleCancel}
    >
      <img alt="preview" style={{ width: '100%' }} src={previewImage} />
    </Modal>
  </>
  );
};
