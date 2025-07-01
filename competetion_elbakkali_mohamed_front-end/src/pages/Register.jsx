import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/register', { name, email, password });
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      alert('Registration failed.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Inscription</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Nom</label>
          <input type="text" className="form-control"
                 value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control"
                 value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Mot de passe</label>
          <input type="password" className="form-control"
                 value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success">S'inscrire</button>
      </form>
    </div>
  );
}