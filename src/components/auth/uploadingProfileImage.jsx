import React, { useState } from "react";
import PlaceholderImage from "../../assets/placeholder-profile-pic.png";

const UploadingProfileImage = (props) => {
  const [image, setImage] = useState("");
  const { setProfilePhoto } = props;

  const UploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Jake-test");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/jgreene/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const File = await res.json();

    setImage(File.secure_url);
    setProfilePhoto(File.secure_url);
  };

  return (
    <div>
      <img
        id='profile-pic'
        src={image === "" ? PlaceholderImage : image}
        alt=''
      />
      <form id='uploader'>
        <label htmlFor='profile-image-upload' className='custom-file-upload'>
          <input
            style={{ width: 1, height: 1 }}
            id='profile-image-upload'
            type='file'
            name='file'
            placeholder='Upload Image Here'
            onChange={UploadImage}
            required='required'
          />{" "}
          Add your Photo
        </label>
      </form>
    </div>
  );
};

export default UploadingProfileImage;
