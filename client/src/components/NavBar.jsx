import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Navbar = () => {
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">My Blog</Link>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/create">New Post</Link>
            <button onClick={handleLogout} className="text-white">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
