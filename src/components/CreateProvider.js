import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa FontAwesome CSS
import './CreateProvider.css'; // Importa el archivo CSS con la clase personalizada
import { API_URL } from '../config';

const CreateProvider = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProvider = {
            name,
            address,
            phone,
            description
        };

        axios.post(`${API_URL}/providers.php`, newProvider)
            .then(() => {
                navigate('/list-provider'); // Redirige al usuario a la página /list-provider
            })
            .catch(error => {
                console.error('Error creating provider:', error);
                setError('Error creating provider.');
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
            <div className="custom-background p-4 rounded"> {/* Usa la clase personalizada */}
                <h1 className="text-white mb-4">
                    <i className="fas fa-plus"></i> Create New Provider
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="providerName" className="form-label text-white">
                            <i className="fas fa-user"></i> Name:
                        </label>
                        <input
                            id="providerName"
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="providerAddress" className="form-label text-white">
                            <i className="fas fa-map-marker-alt"></i> Address:
                        </label>
                        <input
                            id="providerAddress"
                            type="text"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="providerPhone" className="form-label text-white">
                            <i className="fas fa-phone"></i> Phone:
                        </label>
                        <input
                            id="providerPhone"
                            type="text"
                            className="form-control"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="providerDescription" className="form-label text-white">
                            <i className="fas fa-pencil-alt"></i> Description:
                        </label>
                        <textarea
                            id="providerDescription"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-light">
                        <i className="fas fa-save"></i> Create
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProvider;
