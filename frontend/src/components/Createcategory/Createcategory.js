import React, { useContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Createcategory.css";
import { methodContext } from "../../App";

//===============================================================
export const CreateCategory = () => {
  const navigate = useNavigate();
  const { token, isLoggedIn } = useContext(methodContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================
  const uploadImage = async (e) => {
    const data = new FormData();

    data.append("file", image);
    data.append("upload_preset", "fzupywns");
    // data.append("cloud_name","mylaptob")

    console.log(image);
    console.log(data);

    await axios
      .post("https://api.cloudinary.com/v1_1/how-to-tube/upload", data)
      .then(async(response) => {
        // console.log(response)
        // .then((res) => {
        console.log(response.data);
        setUrl(response.data.secure_url)

        createCategoryButton(e,response.data.secure_url);
      })

      .catch((error) => {
        console.log(error);
      });
  };
  //   }

  //project4_images
  //

  //===============================================================
  const createCategoryButton = async (e,url) => {
    e.preventDefault();
console.log(url);
    try {
      const category = {
        title,
        img:url
      };
      const result = await axios.post(
        "http://localhost:5000/categories",
        category,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        setStatus(true);
        setMessage("The category has been created successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(false);
        setMessage(error.response.data.message);
      }
    }
  };
  return (
    <div>
      <>
        <form onSubmit={createCategoryButton}>
          <br />
          <input
            type="text"
            placeholder="category title here"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          
          <div>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
            <button onClick={uploadImage}>Create New Category</button>
          </div>
          <br />

          {/* <img className="img" src={"url"} /> */}
        </form>
        <br />
        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}

        {/* <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
            <button onClick={uploadImage}>Create New Category</button>

            <img className="img"
            src="https://res.cloudinary.com/dvg9eijgb/image/upload/v1652787187/jctpjlys42zsksjpqgoj.jpg"/>

            <img className="img" src={"url"}/> */}
      </>
    </div>
  );
};
