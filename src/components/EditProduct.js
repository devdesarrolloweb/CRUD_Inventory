import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa FontAwesome CSS
import './EditProduct.css'; // Importa el archivo CSS con la clase personalizada

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [providers, setProviders] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [providerId, setProviderId] = useState(''); // Nuevo estado para el proveedor seleccionado
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener la lista de proveedores
        axios.get('http://localhost:8000/v1/providers.php')
            .then(response => {
                setProviders(response.data); // 
            })
            .catch(error => {
                console.error('Error fetching providers:', error);
                setError('Error fetching providers.');
            });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8000/v1/products.php?id=${id}`)
            .then(response => {
                const data = response.data;
                if (data && data.id) {
                    setProduct(data);
                    setName(data.name);
                    setPrice(data.price);
                    setDescription(data.description);
                    setProviderId(data.provider_id); //
                } else {
                    setError('Product not found');
                }
            })
            .catch(error => {
                console.error('Error fetching product:', error);
                setError('Error fetching product.');
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProduct = {
            name,
            price: parseFloat(price),
            description,
            provider_id: providerId // Incluye el ID del proveedor
        };
        axios.put(`http://localhost:8000/v1/products.php?id=${id}`, updatedProduct)
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('Error updating product:', error);
                setError('Error updating product.');
            });
    };

    if (error) return (
        <div className="container mt-4">
            <div className="alert alert-danger" role="alert">
                <i className="fas fa-exclamation-triangle"></i> {error}
            </div>
        </div>
    );
    if (!product) return <div className="container mt-4"><div className="alert alert-info" role="alert"><i className="fas fa-spinner fa-spin"></i> Loading...</div></div>;

    return (
        <div className="container mt-4">
            <div className="custom-background p-4 rounded"> {/* Usa la clase personalizada */}
                <h1 className="text-white mb-4"><i className="fas fa-edit"></i> Edit Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label text-white"><i className="fas fa-box"></i> Name:</label>
                        <input
                            id="productName"
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productPrice" className="form-label text-white"><i className="fas fa-tag"></i> Price:</label>
                        <input
                            id="productPrice"
                            type="text"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productDescription" className="form-label text-white"><i className="fas fa-info-circle"></i> Description:</label>
                        <textarea
                            id="productDescription"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="providerSelect" className="form-label text-white"><i className="fas fa-truck"></i> Provider:</label>
                        <select
                            id="providerSelect"
                            className="form-select"
                            value={providerId}
                            onChange={(e) => setProviderId(e.target.value)}
                        >
                            <option value="">Select a provider</option>
                            {providers.map(provider => (
                                <option key={provider.id} value={provider.id}>
                                    {provider.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        <i className="fas fa-save"></i> Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
