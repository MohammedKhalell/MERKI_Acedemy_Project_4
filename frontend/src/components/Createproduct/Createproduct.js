import React, { useContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Createproduct.css";
import { methodContext } from "../../App";

//===============================================================
export const Createproduct = () => {
  const navigate = useNavigate();
  const { token, isLoggedIn } = useContext(methodContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================
  const uploadImage = async (e) => {
    e.preventDefault();
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

         CreateProductButton(response.data.secure_url)
      })

      .catch((error) => {
        console.log(error);
      });
  };
  //   }

  //project4_images
  //
// const waiting = async(e,url) => {
//   await CreateProductButton(e,url);
// }
  //===============================================================
  const CreateProductButton = async (url) => {
  
    
console.log(url);
    try {
      const product = {
        title,
        description,
        price,
        img:url
      };
      const result = await axios.post(
        "http://localhost:5000/products",
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        console.log(result);
        setStatus(true);
        setMessage("The product has been created successfully");
        navigate("/products");
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
        <form onSubmit={uploadImage}>
          <br />
          <input
            type="text"
            placeholder="product title here"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Product description here"
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Price here ..."
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <div>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
            {/* <button onClick={uploadImage}>upload image</button> */}
            <button>Create New Product</button>
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
