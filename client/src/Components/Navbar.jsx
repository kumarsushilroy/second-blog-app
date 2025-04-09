import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {

  const token = localStorage.getItem("token");
  const auth = JSON.parse(localStorage.getItem('user'));
  //  const user = auth.user.username
  
   

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="m-2 top-0 sticky">
      <div className="flex bg-purple-500 text-white font-bold items-center p-4 justify-between ">
      <h1>Logo</h1>
        {token ? (
          
          <div className="flex justify-between w-full">
             <div></div>
            <ul className="flex items-center ">
              <h1 className="px-10">WELCOME: { auth.user.username}</h1>
              
           
              <NavLink to={"/"}>
                
                <li className="px-2">All Blogs</li>
              </NavLink>
              <NavLink to={"/userblogs"}>
                
                <li className="px-2">My Blogs</li>
              </NavLink>
              <NavLink to={"/addBlog"}>
               
                <li className="px-2">+Add Blog</li>
              </NavLink>
            </ul>
            
            <h1 className="cursor-pointer px-4" onClick={logOut}>
              Logout
            </h1>
            
            
          </div>
        ) : (
          <ul className="flex items-center">
           <NavLink to={'/register'}><li className="px-2">Register</li></NavLink> 
            <NavLink to={'/login'}><li className="px-2">Login</li></NavLink>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
