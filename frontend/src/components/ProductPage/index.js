import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loginStatusContext } from "../../App";
import { Rating } from "react-simple-star-rating";
import "./style.css";
const ProductPage = () => {
  let { elementId } = useParams();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState();
  const { state, setState,token, cartLength, setCartLength, subtotal, setSubtotal} =
    useContext(loginStatusContext);
  const [message, setMessage] = useState();
  const [comment, setComment] = useState("");
  const [commentArray, setCommentArray] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [rating, setRating] =useState(0)
  const [rateArray, setRateArray]=useState()
  const [rateCheck, setRateCheck]=useState()

  const [commentMessage, setCommentMessage] = useState("");
  const [cartMessage, setCartMessage] = useState("");
 const [err,setErr]=useState(false)
  // Catch Rating value
  useEffect(() => {
    
if(!err){
    axios.get(`http://localhost:5000/products/${elementId}`).then((result) => {
      setTitle(result.data.title);
      setDescription(result.data.description);
      setImageUrl(result.data.imageUrl);
      setPrice(result.data.price);
      setCommentArray(result.data.comments);
      setRateArray(result.data.rate);
    }).catch((err)=>{
        setErr(true)
        console.log("error")

    })}
  }, [state]);
  const handleRating = (rate:number) => {
    setRating(rate);
    /* axios
      .post(
        `https://localhost:5000/products/${elementId}/rate`,
        {
          rate: rate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        
        setState(!state)
      }); */

    // other logic
  };
  
 /*  const filteredRating= rateArray.filter((element)=>{
      return element.rater._id == token.id
  }) */
  if (rateArray)
  setRateCheck(
    rateArray.filter((element)=>{
        return element.rater._id == token.id
    })
)
if(err)
return(<h1>Error 404</h1>)
  return (
    <div className="content">
        {}
        {console.log(rateArray,rating)}
      <h1 className="title">{title}|</h1>
      <img className="productpageimg" src={imageUrl} />
      <p className="description">{description}</p>
      <div className="pay">
        <h1 className="price">Unit price: {price ? price : ""}JOD</h1>
        <div style={{display:"flex",flexDirection:"column"}}>
        <div className="quantitydiv">
          <input
            min={1}
            className="quantity"
            defaultValue={1}
            type={"number"}
            placeholder={"Quantity"}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
          <button
            className="addtocart"
            onClick={() => {
              axios
                .post(
                  "http://localhost:5000/users/cart",
                  {
                    product: elementId,

                    quantity: quantity,
                    total: quantity * price,
                  },
                  { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((result) => {
                  setMessage(result);
                  setSubtotal(price ? subtotal + quantity * price : "");
                  setCartLength(cartLength + 1);
                  setState(!state);
                })
                .catch((err) => setCartMessage(<p className="cartmessage">Please login first</p>));
            }}
          >
            add to cart
          </button>
        
        </div>
        {cartMessage? cartMessage :""}
        </div>
              <h1 className="total">total: {price ? quantity * price : ""}JOD</h1>
        

      </div>
      <div className="commentandreview">
        <textarea
          value={inputValue}
          placeholder="put your comment"
          onChange={(e) => {
            setInputValue(e.target.value);
            setComment(e.target.value);
          }}
        ></textarea>
        <p>Add Rating</p>
        <Rating
          onClick={handleRating}
          ratingValue={rating} /* Available Props */
        />
        <button
          className="commentbutton"
          onClick={() => {
            if (inputValue) {
              

              axios
                .post(
                  `http://localhost:5000/products/${elementId}/comments/`,
                  {
                    comment: comment,
                    rate: rating
                  },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                )
                .then(() => {
                  
                  setInputValue("");
                  setState(!state);
                }).catch((err)=>{
                  setCommentMessage( <p className="nocomment">Please login first</p>)})
            } else {
              setCommentMessage(
                <p className="nocomment">Please enter comment first</p>
              );
            }
          }}
        >
          Add comment and rating
        </button>
        {inputValue ?localStorage.getItem("isLoggedIn")=="true"?"":commentMessage : commentMessage}
        {/* {localStorage.getItem("isLoggedIn")=="false"?commentMessage:""} */}
        
      </div>
      <div className="commentsection">
        {commentArray.length ? <h1>Comments</h1> : ""}
        <div className="commentarea">
          {commentArray.length
            ? commentArray.map((element) => {
                return (
                  <p className="comments" key={element._id}>
                    {element.commenter.firstName} {element.commenter.lastName} <Rating ratingValue={element.rate} readonly={true} size={20}/>:{" "}
                    {element.comment}
                  </p>
                );
              })
            : ""}
          
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
