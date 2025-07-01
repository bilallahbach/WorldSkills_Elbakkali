import VoteButtons from './VoteButtons';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axios';

export default function AnecdoteCard({ anecdote }) {
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    if (!window.confirm('Supprimer cette anecdote ?')) return;
    try {
      await axios.delete(`/anecdotes/${anecdote.id}`);
      alert('Anecdote supprimée');
      window.location.reload();
    } catch {
      alert('Erreur suppression');
    }
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <span className="badge bg-secondary me-2">{anecdote.category}</span>
        <p className="card-text mt-2">{anecdote.content}</p>
        <small className="text-muted">Posté par {anecdote.user.name}</small>
        {user?.role === 'admin' && (
          <button className="btn btn-danger btn-sm float-end" onClick={handleDelete}>
            Supprimer
          </button>
        )}
        <VoteButtons anecdoteId={anecdote.id} votes={anecdote.votes} />
      </div>
    </div>
  );
}