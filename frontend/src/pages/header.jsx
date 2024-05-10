import React, { useState, useEffect } from "react";
import {
  Avatar,
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import { MDBBadge } from "mdb-react-ui-kit";
import { AutoComplete, Input } from "antd";
import icon from "../assets/web.png";
import { useNavigate, Link } from "react-router-dom";
// import logo from "../assets/"
export default function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    console.log("onSelect", value);
    // setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    console.log("onSelect", value);
  };
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const [user, setUser] = useState(null);
  const getUserDataFromLocalStorage = () => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  };

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = getUserDataFromLocalStorage();
    if (userData) {
      setUser(userData);
    }
  }, []);

  const navigate = useNavigate();
  const logOut = () => {
    setUser(null);
    localStorage.removeItem("userData");
    navigate("/Login")
    window.location.reload();
  };
  const profile = () => {
    navigate("/Profile")
    window.location.reload();
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:justify-between w-full lg:gap-6 ">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <div className="hidden md:block pl-5">
          <AutoComplete
            className="flex-1 w-64"
            popupMatchSelectWidth={252}
            style={{
              width: 500,
            }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
            size="large"
          >
            <Input.Search
              size="large"
              placeholder="input here"
              enterButton
              buttonProps={{
                style: { background: "black", color: "red" },
              }}
            />
          </AutoComplete>
        </div>
      </Typography>
      <div className="flex gap-5">
        {/* <div className="d-inline-flex position-relative"> */}
        <MDBBadge className="rounded bg-blue-500 text-white position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
            <button onClick={profile} className="visually-hidden">
              Profile
            </button>
          </MDBBadge>
          <MDBBadge className="rounded bg-blue-500 text-white position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
            <button onClick={logOut} className="visually-hidden">
              Log Out
            </button>
          </MDBBadge>
        {/* </div> */}
      </div>
    </ul>
  );

  return (
    <div className="-mt-6 pt-5  w-full bg-gray-100 ">
      <Navbar
        className={`${
          user !== null ? "" : "hidden"
        } sticky w-full top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:py-4 shadow-md`}
      >
        <div className="flex ">
          <a href="/" className="w-14 pr-4 pt-1">
            <Avatar src={icon} />
          </a>
          <div className="flex w-full items-center justify-end gap-4">
            <div className="w-full  mr-4 hidden lg:block">{navList}</div>

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>{navList}</MobileNav>
      </Navbar>
      {/* <div className="mx-auto w-full ">
        {user !=null ? <Basic /> : <Login/>}
        
      </div> */}
    </div>
  );
}
<Typography
  as="li"
  variant="small"
  color="blue-gray"
  className="p-1 font-normal"
>
  <a href="#" className="flex md:items-end items-end">
    Profile
  </a>
</Typography>;
