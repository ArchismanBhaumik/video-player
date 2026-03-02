import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";
import upload_icon from "../../assets/upload.png";
import { useDebounce } from "../../hooks";

const Navbar = ({setSidebar,search,setSearch}) => {
  const navigate = useNavigate();
  function setSideBarStatus(){
    setSidebar((prev)=>!prev)
  }
  const setSearchValue=(value)=>{
    console.log('Searching for:',value);
    setSearch(value);
  }
  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img className="menu-icon" onClick={()=>setSideBarStatus()} src={menu_icon} alt="" />
        <img className="logo" src={logo} alt="" onClick={()=>navigate('/')}/>
      </div>
      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder="Search" value={search} onChange={(e)=>setSearchValue(e.target.value)}/>
          <img className="search" src={search_icon} alt="" />
        </div>
      </div>
      <div className="nav-right flex-div">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notification_icon} alt="" />
        <img className="user-icon" src={profile_icon} alt="" />
      </div>
    </nav>
  );
};

export default Navbar;
