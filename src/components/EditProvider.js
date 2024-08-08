import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // 
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa FontAwesome CSS
import './ProviderList.css'; // Importa el archivo CSS con la clase personalizada

const EditProvider = () => {
    const { id } = useParams();
    const [provider, setProvider] = useState(null);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/v1/providers.php?id=${id}`)
            .then(response => {
                const data = response.data;
                if (data && data.id) {
                    setProvider(data);
                    setName(data.name);
                    setAddress(data.address);
                    setPhone(data.phone);
                    setDescription(data.description);
                } else {
                    setError('Provider not found');
                }
            })
            .catch(error => {
                console.error('Error fetching provider:', error);
                setError('Error fetching provider.');
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/v1/providers.php?id=${id}`, { name, address, phone, description })
            .then(() => {
                navigate('/list-provider'); // Redirige a la lista de proveedores después de la actualización
            })
            .catch(error => {
                console.error('Error updating provider:', error);
                setError('Error updating provider.');
            });
    };

    if (error) return (
        <div className="container mt-4">
            <div className="alert alert-danger" role="alert">
                <i className="fas fa-exclamation-triangle"></i> {error}
            </div>
        </div>
    );
    if (!provider) return (
        <div className="container mt-4">
            <div className="alert alert-info" role="alert">
                <i className="fas fa-spinner fa-spin"></i> Loading...
            </div>
        </div>
    );

    return (
        <div className="container mt-4">
            <div className="custom-background p-4 rounded"> {/* Usa la clase personalizada */}
                <h1 className="text-white mb-4"><i className="fas fa-user-edit"></i> Edit Provider</h1>
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
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="providerDescription" className="form-label text-white">
                            <i className="fas fa-info-circle"></i> Description:
                        </label>
                        <textarea
                            id="providerDescription"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-light">
                        <i className="fas fa-save"></i> Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProvider;
