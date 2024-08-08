// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProviderList from './components/ProviderList'; // Importa el nuevo componente
import EditProduct from './components/EditProduct';
import EditProvider from './components/EditProvider'; // Importa el nuevo componente para editar proveedores
import CreateProduct from './components/CreateProduct'; // Importa el nuevo componente
import CreateProvider from './components/CreateProvider'; // Importa el nuevo componente
import MyNavbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'; // Importa el CSS personalizado

const App = () => {
  return (
    <Router>
      <MyNavbar className="navbar" /> {/* */}
      <div className="container mt-4"> {/* El contenedor con margen */}
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/edit-provider/:id" element={<EditProvider />} /> {/* Nueva ruta para EditProvider */}
          <Route path="/create-product" element={<CreateProduct />} /> {/* Ruta para crear productos */}
          <Route path="/create-provider" element={<CreateProvider />} /> {/* Ruta para crear proveedores */}
          <Route path="/list-provider" element={<ProviderList />} /> {/* Ruta para la lista de proveedores */}
        </Routes>
      </div>
      <Footer className="footer" /> {/*  */}
    </Router>
  );
};

export default App;
