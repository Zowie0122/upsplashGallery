import React from "react";
import { Spinner } from "react-bootstrap";

export default function Sprinnerdots() {
  return (
    <div className="spinner">
      <Spinner animation="grow" variant="dark" />
      <Spinner animation="grow" variant="dark" />
      <Spinner animation="grow" variant="dark" />
    </div>
  );
}
