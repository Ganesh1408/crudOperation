
// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderContainer, HeaderOptions } from "./styledComponent";
import Cookies from "js-cookie";

function Header() {
  const navigate = useNavigate();

  const Logout = () => {
    Cookies.remove("accessToken");
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <div>
        <Link
          style={{
            paddingLeft: "20px",
            textDecoration: "none",
            color: "black",
          }}
          to="/Home"
        >
          <h1>IMS</h1>
        </Link>
      </div>
      <HeaderOptions>
        <Link
          style={{
            paddingRight: "20px",
            textDecoration: "none",
            color: "black",
            fontSize: "20px",
          }}
          to="/Home"
        >
          <a>Home</a>
        </Link>
        <Link
          style={{
            paddingRight: "20px",
            textDecoration: "none",
            color: "black",
            fontSize: "20px",
          }}
          to="/Invoice"
        >
          <a>Form</a>
        </Link>
        <button
          style={{
            paddingRight: "20px",
            color: "black",
            fontSize: "20px",
            backgroundColor:'transparent',
            border:'none'
          }}
        >
          <a onClick={Logout}> Logout</a>
        </button>
      </HeaderOptions>
    </HeaderContainer>
  );
}

export default Header;
