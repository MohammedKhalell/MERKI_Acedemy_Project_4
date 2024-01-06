import {Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className='Nav' style={{ display: "flex", gap: "16px" }}>
        <Link to="/">Register</Link> 
        ||
        <Link to="/">Login</Link>
    </div>
  )
};

export default Navbar