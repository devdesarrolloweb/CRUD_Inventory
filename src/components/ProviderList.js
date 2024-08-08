import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProviderList.css'; // Asegúrate de importar el archivo CSS para los estilos personalizados
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import { Modal, Button } from 'react-bootstrap'; // Importa componentes de Bootstrap
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa FontAwesome CSS
import { API_URL } from '../config';

const ProviderList = () => {
    const [providers, setProviders] = useState([]);
    const [displayedProviders, setDisplayedProviders] = useState([]); // Proveedores que se muestran en la página actual
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOrder, setSortOrder] = useState('desc'); // Orden por defecto (descendente)
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
    const [providerToDelete, setProviderToDelete] = useState(null); // ID del proveedor a eliminar

    const providersPerPage = 3;

    // Función para obtener todos los proveedores
    const fetchProviders = () => {
        axios.get(`${API_URL}/providers.php`)
            .then(response => {
                const fetchedProviders = response.data;
                if (Array.isArray(fetchedProviders)) {
                    // Ordenar los proveedores antes de actualizar el estado
                    const sortedProviders = sortProviders(fetchedProviders, sortOrder);
                    setProviders(sortedProviders);
                    updateDisplayedProviders(sortedProviders);
                } else {
                    console.error('Unexpected data format:', response.data);
                    setProviders([]);
                }
            })
            .catch(error => {
                console.error('Error fetching providers:', error);
                setProviders([]);
            });
    };

    // Ordenar los proveedores según sortOrder
    const sortProviders = (providers, order) => {
        return providers.slice().sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);

            if (order === 'asc') {
                return dateA - dateB; // Orden ascendente (más viejo a más nuevo)
            } else {
                return dateB - dateA; // Orden descendente (más nuevo a más viejo)
            }
        });
    };

    // Actualizar los proveedores mostrados en la página actual
    const updateDisplayedProviders = (providers) => {
        const offset = (currentPage - 1) * providersPerPage;
        const paginatedProviders = providers.slice(offset, offset + providersPerPage);
        setDisplayedProviders(paginatedProviders);
        setTotalPages(Math.ceil(providers.length / providersPerPage)); // Actualizar totalPages basado en el número total de proveedores
    };

    useEffect(() => {
        fetchProviders();
    }, [sortOrder]); // Refetch providers cuando cambie el orden

    useEffect(() => {
        updateDisplayedProviders(providers); // Actualizar los proveedores mostrados cuando cambie la página actual
    }, [currentPage, providers]);

    const handleDelete = (providerId) => {
        axios.delete(`${API_URL}/providers.php?id=${providerId}`)
            .then(() => {
                setShowModal(false); // Oculta el modal después de eliminar
                fetchProviders(); // Refrescar la lista de proveedores
            })
            .catch(error => {
                console.error('Error deleting provider:', error);
            });
    };

    const confirmDelete = (providerId) => {
        setProviderToDelete(providerId);
        setShowModal(true); // Muestra el modal
    };

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="provider-list-container bg-light-gray">
            <h1 className="mb-4">
                <i className="fas fa-handshake"></i> Provider List
            </h1>

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
                {displayedProviders.length > 0 ? (
                    displayedProviders.map(provider => (
                        <div className="col-md-4 mb-4" key={provider.id}>
                            <div className="card bg-blue text-white fade-in">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <i className="fas fa-building"></i> {provider.name}
                                    </h5>
                                    <p className="card-text">
                                        <i className="fas fa-map-marker-alt"></i> Address: {provider.address}
                                    </p>
                                    <p className="card-text">
                                        <i className="fas fa-phone"></i> Phone: {provider.phone}
                                    </p>
                                    <p className="card-text">
                                        <i className="fas fa-info-circle"></i> Description: {provider.description}
                                    </p>
                                    <p className="card-text">
                                        <i className="fas fa-calendar-alt"></i> Created At: {new Date(provider.created_at).toLocaleDateString()}
                                    </p>
                                    <div className="d-flex">
                                        <Link to={`/edit-provider/${provider.id}`} className="btn btn-light me-2">
                                            <i className="fas fa-edit"></i> Edit
                                        </Link>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => confirmDelete(provider.id)}
                                        >
                                            <i className="fas fa-trash"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No providers available</p>
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
                <Modal.Body>Are you sure you want to delete this provider?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        <i className="fas fa-times"></i> Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(providerToDelete)}>
                        <i className="fas fa-trash"></i> Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProviderList;
