import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.register({ username, email, password }); // ✅ Use "username"
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4 mt-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
