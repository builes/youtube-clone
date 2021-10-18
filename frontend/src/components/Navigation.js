import axios from "axios";
import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

export default function Navigation() {
  const [search, setSearch] = useState("initialState");
  const [videos, setVideos] = useState();

  const handleSearch = (e) => {
    // console.log(e.target.value);
    setSearch(e.target.value);
  };

  const getVideos = async (e) => {
    e.preventDefault();
    const res = await axios.get("http://localhost:4000/api/videos/" + search);
    console.log(res.data);
    <Redirect to={"/"} />;
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <Link to="/" style={{ textDecoration: "none" }} className="p-2">
            Youtube
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form
            className="d-flex ms-5"
            style={{ width: "50%" }}
            onSubmit={getVideos}
          >
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2 "
              aria-label="Search"
              onChange={handleSearch}
            />
            <Button type="submit">Search</Button>
          </Form>
          <Nav
            className="me-auto my-2 my-lg-0 d-flex justify-content-end"
            style={{ maxHeight: "100px", width: "44%" }}
            navbarScroll
          >
            <Link
              to="/uploadvideo"
              style={{ textDecoration: "none" }}
              className="p-2"
            >
              Upload video
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
