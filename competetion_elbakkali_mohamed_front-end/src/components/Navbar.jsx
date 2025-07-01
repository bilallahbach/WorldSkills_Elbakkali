import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
      <Link className="navbar-brand" to="/">🤡 WOW</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Anecdotes</Link>
          </li>
          {user && (
            <li className="nav-item">
              <Link className="nav-link" to="/submit">Publier</Link>
            </li>
          )}
        </ul>
        <ul className="navbar-nav">
          {!user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Connexion</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Inscription</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item nav-link">👤 {user.name}</li>
              <li className="nav-item">
                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                  Déconnexion
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}