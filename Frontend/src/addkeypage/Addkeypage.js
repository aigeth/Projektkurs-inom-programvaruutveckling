import React, { Component } from "react";
import { Link } from "react-router-dom";
//@Baran Polat

/* This function represents the layout of the addkey page with two options, one directing you to 
/menu/addkey/onekey and the other to /menu/addkey/morekeys  */
export default function Addkeypage() {
  return (
    <div>
      <h1 style={{ color: "black" }} className="p-4">
        One or more ?
      </h1>
      <Link to="/menu/addkey/onekey">
        <button
          style={{ fontSize: 20 }}
          className="btn btn-secondary btn-sm m-2"
        >
          Add one key
        </button>

        <Link to="/menu/addkey/morekeys">
          <button
            style={{ fontSize: 20 }}
            className="btn btn-secondary btn-sm m-t-2"
          >
            Add more keys
          </button>
        </Link>
      </Link>
    </div>
  );
}
