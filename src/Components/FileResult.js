import React from "react";

export default function FileResult({ id, location, checksum }) {
  return (
    <div className="result">
      {id} <br />
      {location} <br />
      {checksum}
    </div>
  );
}
