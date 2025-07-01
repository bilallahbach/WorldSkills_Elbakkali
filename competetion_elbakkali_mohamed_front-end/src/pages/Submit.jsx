import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Submit() {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Histoire');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/anecdotes', { content, category });
      alert('Anecdote ajoutée !');
      navigate('/');
    } catch (err) {
      alert('Erreur envoi');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Ajouter une anecdote</h2>
      <form onSubmit={handleSubmit}>
        <select className="form-select mb-3" value={category} onChange={(e) => setCategory(e.target.value)}>
          {["Histoire", "Humour", "Vie quotidienne", "Échec", "Succès"].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="4"
            placeholder="Écris une situation drôle ou embarrassante..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success">Publier</button>
      </form>
    </div>
  );
}