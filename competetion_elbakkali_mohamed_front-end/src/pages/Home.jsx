import { useEffect, useState } from 'react';
import axios from '../api/axios';
import AnecdoteCard from '../components/AnecdoteCard';

export default function Home() {
  const [anecdotes, setAnecdotes] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchAnecdotes = async (pageNumber = 1) => {
    try {
      const res = await axios.get(`/anecdotes?page=${pageNumber}`);
      setAnecdotes(res.data.data);
      setPage(res.data.current_page);
      setLastPage(res.data.last_page);
    } catch {
      alert('Erreur chargement');
    }
  };

  const fetchSorted = async (type) => {
    try {
      const res = await axios.get(`/anecdotes?sort=${type}`);
      setAnecdotes(res.data.data || res.data);
    } catch {
      alert('Erreur filtre');
    }
  };

  useEffect(() => {
    fetchAnecdotes();
  }, []);

  return (
    <div className="container mt-4">
      <h2>📰 Anecdotes</h2>
      <div className="d-flex gap-3 mb-3">
        <button className="btn btn-outline-dark" onClick={() => fetchSorted('wow')}>Max de Wow!</button>
        <button className="btn btn-outline-warning" onClick={() => fetchSorted('week')}>Les WOW d'or</button>
        <button className="btn btn-outline-info" onClick={() => fetchSorted('technique')}>Les plus techniques</button>
      </div>
      {anecdotes.length === 0 ? <p>Aucune anecdote.</p> : (
        anecdotes.map(a => <AnecdoteCard key={a.id} anecdote={a} />)
      )}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            {[...Array(lastPage)].map((_, i) => (
              <li key={i} className={`page-item ${i+1 === page ? 'active' : ''}`}>
                <button className="page-link" onClick={() => fetchAnecdotes(i + 1)}>{i + 1}</button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}