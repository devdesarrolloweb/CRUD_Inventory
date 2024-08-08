import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductList.css'; // Importa el archivo CSS para estilos personalizados
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import { Modal, Button } from 'react-bootstrap'; // Importa componentes de Bootstrap
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa FontAwesome CSS
import { API_URL } from '../config';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]); // Productos que se muestran en la página actual
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchName, setSearchName] = useState('');
    const [sortOrder, setSortOrder] = useState('desc'); // Orden por defecto (descendente)
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
    const [productToDelete, setProductToDelete] = useState(null); // ID del producto a eliminar

    const productsPerPage = 3;

    // Función para obtener todos los productos
    const fetchAllProducts = (searchName) => {
        axios.get(`${API_URL}/products.php?name=${searchName}`)
            .then(response => {
                const fetchedProducts = response.data;
                if (Array.isArray(fetchedProducts)) {
                    // Ordenar los productos antes de actualizar el estado
                    const sortedProducts = sortProducts(fetchedProducts, sortOrder);
                    setProducts(sortedProducts);
                    updateDisplayedProducts(sortedProducts);
                } else {
                    console.error('Unexpected data format:', response.data);
                    setProducts([]);
                }
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setProducts([]);
            });
    };

    // Ordenar los productos según sortOrder
    const sortProducts = (products, order) => {
        return products.slice().sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);

            if (order === 'asc') {
                return dateA - dateB; // Orden ascendente (más viejo a más nuevo)
            } else {
                return dateB - dateA; // Orden descendente (más nuevo a más viejo)
            }
        });
    };

    // Actualizar los productos mostrados en la página actual
    const updateDisplayedProducts = (products) => {
        const offset = (currentPage - 1) * productsPerPage;
        const paginatedProducts = products.slice(offset, offset + productsPerPage);
        setDisplayedProducts(paginatedProducts);
        setTotalPages(Math.ceil(products.length / productsPerPage)); // Actualizar totalPages basado en el número total de productos
    };

    useEffect(() => {
        fetchAllProducts(searchName);
    }, [searchName, sortOrder]); // Refetch products cuando cambie la búsqueda o el orden

    useEffect(() => {
        updateDisplayedProducts(products); // Actualizar los productos mostrados cuando cambie la página actual
    }, [currentPage, products]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reinicia la página actual al realizar una búsqueda
        fetchAllProducts(searchName);
    };

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleDelete = (productId) => {
        axios.delete(`${API_URL}/products.php?id=${productId}`)
            .then(() => {
                setShowModal(false); // Oculta el modal después de eliminar
                fetchAllProducts(searchName); // Refrescar la lista de productos
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    };

    const confirmDelete = (productId) => {
        setProductToDelete(productId);
        setShowModal(true); // Muestra el modal
    };

    return (
        <div className="product-list-container bg-light-gray">
            <h1 className="mb-4">
                <i className="fas fa-boxes"></i> Product List
            </h1>

            {/* Formulario de búsqueda */}
            <form onSubmit={handleSearchSubmit} className="mb-4">
                <div className="form-group">
                    <label htmlFor="searchName">
                        <i className="fas fa-search"></i> Search by Name:
                    </label>
                    <div className="input-group">
                        <input
                            type="text"
                            id="searchName"
                            className="form-control"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-primary">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Botón para alternar el orden */}
            <div className="mb-4">
                <button
                    className="btn btn-primary"
                    onClick={toggleSortOrder}
                >
                    <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                    {sortOrder === 'asc' ? ' Sort by Date: New to Old' : ' Sort by Date: Old to New'}
                </button>
            </div>

            <div className="row">
                {displayedProducts.length > 0 ? (
                    displayedProducts.map(product => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <div className="card bg-blue text-white fade-in">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <i className="fas fa-box"></i> {product.name}
                                    </h5>
                                    <p className="card-text">
                                        <i className="fas fa-tag"></i> Price: ${product.price}
                                    </p>
                                    <p className="card-text">
                                        <i className="fas fa-info-circle"></i> Description: {product.description}
                                    </p>
                                    <p className="card-text">
                                        <i className="fas fa-calendar-alt"></i> Created At: {new Date(product.created_at).toLocaleDateString()}
                                    </p>
                                    <div className="d-flex">
                                        <Link to={`/edit/${product.id}`} className="btn btn-light me-2">
                                            <i className="fas fa-edit"></i> Edit
                                        </Link>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => confirmDelete(product.id)}
                                        >
                                            <i className="fas fa-trash"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>

            <div className="d-flex justify-content-between mt-4">
                <button 
                    className="btn btn-secondary"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <i className="fas fa-chevron-left"></i> Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                    className="btn btn-secondary"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next <i className="fas fa-chevron-right"></i>
                </button>
            </div>

            {/* Modal de confirmación */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title><i className="fas fa-exclamation-triangle"></i> Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        <i className="fas fa-times"></i> Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(productToDelete)}>
                        <i className="fas fa-trash"></i> Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductList;
