import React, { useState } from "react";
import { Modal, Button, Upload } from "antd";
import { ShadcnButton } from "./ui/button";
import { FaEdit } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import moment from "moment";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./Firebase"; // Adjust the path to your firebaseConfig
import { v4 } from "uuid";
const WritePost: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [showQuill, setShowQuill] = useState(false);
  const [imageUploads, setImageUploads] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const userPhoto = localStorage.getItem("Photo");
  const userName = localStorage.getItem("Name");
  const userEmail = localStorage.getItem("Email");
  const timeStamp = moment().format("LL");

  const handleOk = () => {
    setOpen(false);
    addPost();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = async (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.fileList) {
      // Extract valid files
      const files = info.fileList
        .map((file) => file.originFileObj as File)
        .filter(Boolean) as File[];

      const name = v4();
      const uploadPromises = files.map(async (file) => {
        const storageRef = ref(storage, `uploads/${file.name}${name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      });

      // Wait for all uploads to complete
      try {
        const urls = await Promise.all(uploadPromises);
        console.log("Download URLs:", urls);
        setImageUrls(urls); // Save URLs in state
        setImageUploads(files); // Optionally keep the files in state if needed
        setShowQuill(true);
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };
  console.log(imageUrls);
  const addPost = async () => {
    try {
      const postData = {
        userName,
        userPhoto,
        textValue,
        timeStamp,
        userEmail,
        imageUrls,
      };

      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      await response.json();
      window.location.reload();
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <>
      <ShadcnButton
        variant="default"
        onClick={() => setOpen(true)}
        className="flex gap-3 w-full "
      >
        <FaEdit /> Write a Post
      </ShadcnButton>
      <Modal
        title={
          <span className="flex gap-1 items-center">
            <FaEdit /> Write your Post
          </span>
        }
        centered
        open={open}
        onCancel={handleCancel}
        footer={[
          <Button
            key="link"
            onClick={handleOk}
            className="mt-[60px] md:mt-3"
            disabled={!showQuill} // Corrected property name to "disabled"
          >
            Post it
          </Button>,
        ]}
      >
        {showQuill ? (
          <>
            <div>
              <ReactQuill
                className="w-full my-10 h-[200px] resize-none"
                placeholder="Write your thoughts ....."
                onChange={(content) => setTextValue(content)}
                value={textValue}
              />
            </div>
          </>
        ) : (
          <>
            <Upload.Dragger
              multiple
              listType="picture"
              accept=".png,.jpeg,.jpg, .avif, .webp"
              maxCount={10}
              beforeUpload={() => false}
              onChange={handleChange}
            >
              <div className="text-[15px] h-[100px] text-center flex items-center justify-center flex-col">
                Drag or
                <br />
                <Button type="primary">Upload File</Button>
              </div>
            </Upload.Dragger>
          </>
        )}
      </Modal>
    </>
  );
};

export default WritePost;
