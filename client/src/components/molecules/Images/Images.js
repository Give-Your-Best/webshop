import React, { useState } from "react";
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useFormikContext } from "formik";
// import heic2any from "heic2any";

export const Images = (data) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const formikProps = useFormikContext();

  const checkFileType = (file) => {
    console.log('checking...')
    console.log(file)
    const reader = new FileReader();
    reader.readAsText(file);
    console.log(reader)
  }

  const handleCancel = () => setPreviewVisible(false);
  const handleChange = ({ file, fileList }) => {
    console.log(fileList);
    data.setUploadedImages(fileList)
    // data.setUploadedImages(fileList.map((f) => {
    //   if (f.name.includes('.heic')) {
    //     //this is a heic file type
    //     console.log('cpnvert?')
    //     heic2any({
    //       blob: f,
    //       toType: "image/jpg"
    //     })
    //     .then((result) => {
    //       console.log(result)
    //       console.log('did this works')
    //     })
    //     return {}
    //   } else {
    //     return f
    //   }
    // }));
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
      multiple={true}
      beforeUpload={checkFileType}
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
