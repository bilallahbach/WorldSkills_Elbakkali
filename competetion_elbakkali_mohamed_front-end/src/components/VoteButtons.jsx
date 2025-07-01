import axios from '../api/axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function VoteButtons({ anecdoteId, votes = [] }) {
  const { user } = useContext(AuthContext);

  const handleVote = async (type) => {
    try {
      await axios.post(`/anecdotes/${anecdoteId}/vote`, { type });
      alert("Vote envoyé !");
      window.location.reload();
    } catch (err) {
      alert("Erreur de vote !");
    }
  };

  const hasVoted = (type) => votes.some(v => v.type === type && v.user_id === user?.id);
  const voteCount = (type) => votes.filter(v => v.type === type).length;

  return (
    <div className="mt-2">
      {['Bof', 'Excellent', 'Technique', 'Wow'].map((type) => (
        <button
          key={type}
          className="btn btn-outline-primary btn-sm me-2 mb-2"
          onClick={() => handleVote(type)}
          disabled={!user || hasVoted(type)}
        >
          {type} ({voteCount(type)})
        </button>
      ))}
    </div>
  );
}