// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; // Importa el CSS específico del Navbar si lo tienes

const MyNavbar = () => {
  return (
    <Navbar className="navbar-custom" expand="lg">
      <Navbar.Brand as={Link} to="/" className="navbar-brand">
        CRUD Inventory
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto navbar-nav">
          <Nav.Link as={Link} to="/">
            <i className="fas fa-home"></i> Home
          </Nav.Link>
          <Nav.Link as={Link} to="/create-product">
            <i className="fas fa-plus"></i> Create New Product
          </Nav.Link>
          <Nav.Link as={Link} to="/create-provider">
            <i className="fas fa-truck"></i> Create New Provider
          </Nav.Link>
          <Nav.Link as={Link} to="/list-provider">
            <i className="fas fa-list"></i> List Provider
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
