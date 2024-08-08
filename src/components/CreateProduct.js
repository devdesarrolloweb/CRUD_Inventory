import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // 
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa FontAwesome CSS
import './CreateProduct.css'; // Importa el archivo CSS con la clase personalizada
import { API_URL } from '../config';

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [providerId, setProviderId] = useState(''); // 
    const [providers, setProviders] = useState([]); // Lista de proveedores
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener la lista de proveedores
        axios.get(`${API_URL}/v1/providers.php`)
            .then(response => {
                setProviders(response.data); // 
            })
            .catch(error => {
                console.error('Error fetching providers:', error);
                setError('Error fetching providers.');
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            name,
            price: parseFloat(price),
            description,
            provider_id: providerId
        };

        axios.post(`${API_URL}/v1/products.php`, newProduct)
            .then(() => {
                navigate('/'); // Redirige al usuario a la página principal
            })
            .catch(error => {
                console.error('Error creating product:', error);
                setError('Error creating product.');
            });
    };

    if (error) return (
        <div className="container mt-4">
            <div className="alert alert-danger" role="alert">
                <i className="fas fa-exclamation-triangle"></i> {error}
            </div>
        </div>
    );

    return (
        <div className="container mt-4">
            <div className="custom-background p-4 rounded"> {/* Usar la clase personalizada */}
                <h1 className="text-white mb-4"><i className="fas fa-plus"></i> Create New Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label text-white">
                            <i className="fas fa-box"></i> Name:
                        </label>
                        <input
                            id="productName"
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productPrice" className="form-label text-white">
                            <i className="fas fa-dollar-sign"></i> Price:
                        </label>
                        <input
                            id="productPrice"
                            type="number"
                            step="0.01"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productDescription" className="form-label text-white">
                            <i className="fas fa-pencil-alt"></i> Description:
                        </label>
                        <textarea
                            id="productDescription"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productProvider" className="form-label text-white">
                            <i className="fas fa-truck"></i> Provider:
                        </label>
                        <select
                            id="productProvider"
                            className="form-control"
                            value={providerId}
                            onChange={(e) => setProviderId(e.target.value)}
                            required
                        >
                            <option value="">Select a provider</option>
                            {providers.map(provider => (
                                <option key={provider.id} value={provider.id}>
                                    {provider.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-light">
                        <i className="fas fa-save"></i> Create
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
