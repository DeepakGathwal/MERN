import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector,useDispatch } from 'react-redux';
import { action } from '../redux/store';
axios.defaults.withCredentials = true

const Header = () => {
  const disptach = useDispatch()
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const [posts,setPosts] =useState()
 
 const handelLogout =async() => {
  const res = await axios.post("http://localhost:8080/api/refresh",null,{
      withCredentials:true
    })
    if(res.status ==200){
      return res;
    }
    return new Error("Unable to Logout,Please try Again")
 }

 const finalShow = async() => {
  handelLogout().then(() => disptach(action.logout()))
 }
  return (
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#">{posts ?  <h4>{posts.name.toUpperCase()}</h4>: "NavBar" }</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/singUp">SignUp</Nav.Link>
        { isLoggedIn &&
         <Nav.Link href="/" onClick={finalShow}>LogOut</Nav.Link> }
                <NavDropdown title="Link" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/user">Welcome</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#" disabled>
                  Link
                </Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success" >Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
    

export default Header
