import React, { useState } from "react";
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useFormikContext } from "formik";

export const Images = (data) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const formikProps = useFormikContext();

  const handleCancel = () => setPreviewVisible(false);
  const handleChange = ({ file, fileList }) => {
    data.setUploadedImages(fileList);
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

  return (
    <>
    <Upload
      action="/api/items/dummy"
      listType="picture-card"
      fileList={data.uploadedImages || []}
      onPreview={handlePreview}
      disabled={data.editingKey !== data.recordId}
      onChange={handleChange}
    >
      {data.uploadedImages.length >= 3 ? null : uploadButton}
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
