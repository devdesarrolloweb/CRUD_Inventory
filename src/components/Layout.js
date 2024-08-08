// src/components/Layout.js
import React from 'react';
import MyNavbar from './Navbar'; // 
import Footer from './Footer';   //
import './Layout.css';          // Importa el archivo CSS para los estilos

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <MyNavbar />
      <main className="content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
