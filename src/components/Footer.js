// src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; // Importa el archivo CSS específico para el Footer

const Footer = () => {
  return (
    <>
      <br />
      <footer className="footer-custom text-center py-3">
        <Container>
          <Row>
            <Col>
              <p className="footer-text mb-0">© {new Date().getFullYear()} CRUD Inventory.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
