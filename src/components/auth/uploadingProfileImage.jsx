import React, { useState } from "react";
import PlaceholderImage from "../../assets/placeholder-profile-pic.png";

const UploadingProfileImage = ({ setProfileImage }) => {
  const [image, setImage] = useState("");
  // const { setProfileImage } = props;

  const UploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "horror-house");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/courtneydowns/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const File = await res.json();

    setImage(File.secure_url);
    setProfileImage(File.secure_url);
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
