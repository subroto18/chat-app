import React, { useState } from "react";
import { Upload, message, Button, List, Spin, Progress } from "antd";

import { UPLOAD } from "../../service/media";
import { useRecoilState } from "recoil";
import {
  mediaFileListAtom,
  mediaLoadingAtom,
  mediaPreviewAtom,
  mediaPreviewImageAtom,
} from "../../recoil/atoms/media";

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const Media = () => {
  //   const [fileList, setFileList] = useRecoilState(mediaFileListAtom);
  const [loading, setLoading] = useRecoilState(mediaLoadingAtom);
  //   const [previewImage, setPreviewImage] = useRecoilState(mediaPreviewImageAtom);
  //   const [previewOpen, setPreviewOpen] = useRecoilState(mediaPreviewAtom);
  const [fileList, setFileList] = useState([{}]);
  const [progress, setProgress] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleUpload = async ({ file, onSuccess, onError, onProgress }) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setFileList([
        {
          uid: 1,
          percent: progress,
          name: "image.png",
          status: "uploading",
          url: await getBase64(file.originFileObj as FileType),
        },
      ]);
      const response = await UPLOAD(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress({ percent: percentCompleted });
            setProgress(percentCompleted);
          }
        },
      });
      onSuccess(response.data);
      setFileList([{ url: response.data.url, status: "done" }]);
      setProgress(0);
      message.success(`${file.name} file uploaded successfully.`);
    } catch (error) {
      onError(error);
      message.error(`${file.name} file upload failed.`);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (file) => {
    setFileList(fileList.filter((f) => f.uid !== file.uid));
    message.success(`${file.name} file removed successfully.`);
  };

  const props = {
    name: "file",
    multiple: true,
    customRequest: handleUpload,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div>
      <Upload
        {...props}
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onRemove={handleRemove}
      >
        {fileList?.url == "" ? null : uploadButton}
      </Upload>
      <Progress percent={progress} />
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: true,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default Media;
