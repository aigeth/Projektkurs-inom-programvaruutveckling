import React, { Component } from "react";
import { Link } from "react-router-dom";
/* kladd för remove key sidan*/
export default function Removekeypage() {
  return (
    <Link to="/menu/addkey/onekey">
      <button style={{ fontSize: 25 }} className="btn btn-secondary btn-sm m-2">
        Add one key
      </button>
    </Link>
  );
}
