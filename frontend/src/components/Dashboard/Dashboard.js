import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./Dashboard.css";
import { methodContext } from "../../App";

//Dashboard component
export const Dashboard = () => {
  const { token, setToken, message, setMessage } = useContext(methodContext);

  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [show, setShow] = useState(false);
  //================================================================================
  const getAllCategories = async () => {
    console.log(token);

    try {
      const result = await axios.get(`http://localhost:5000/categories`, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      if (result.data.success) {
        console.log(result);
        setCategories(result.data.categories);
        // setMessage("");
        // setShow(true);

        // console.log(" dashboardهووون", result.data.categories);
        setUserId(result.data.userId);
      } else throw Error;
    } catch (error) {
      //   return setMessage(error.response.data.message);
    }
    // setMessage("Error happened while Get Data, please try again");
  };
  //================================================================================
  const addCategoryButton = async (e) => {
    e.preventDefault();
    try {
      const category = { title, img };

      const result = await axios.post(`http://localhost:5000/categories/`, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  //================================================================================
  useEffect(() => {
    getAllCategories();
  }, []);
  //================================================================================
  return (
    <>
      <div className="dashboard">
        {categories.length &&
          categories.map((category) => {
            return (
              <div>
                <div className="category">
                  {/* <h1 className="title">{category.title}</h1> */}

                  {/* http://localhost:5000/products/search_1?category=2 */}
                  {/* "/category/:id"  */}

                  <Link
                    className="categoryTitle"
                    to={`/category/${category._id}`}
                  >
                    {category.title}{" "}
                  </Link>
                  <Link
                    
                    to={`/category/${category._id}`}
                  >
                    <img className="categoryImage" src={`${category.img}`} />{" "}
                  </Link>
                </div>
               
              </div>
            );
          })}
 <Link className="link" to="/CreateCategory">
        Add New Category
      </Link>
        {/* {message && <div>{message}</div>} */}
      </div>
    </>
  );
};
