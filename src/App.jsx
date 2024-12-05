import { useState } from 'react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';

export default function Login() {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://p5zqaemgax.us-east-2.awsapprunner.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username, 
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json();
      const token = data.token;

      localStorage.setItem('token', token);

      window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 ">
        <h2 className="text-2xl font-semiboldlogin text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full"
              required
            />
          </div>

          <div className="mb-4">
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full"
              required
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <Button
            type="submit"
            className="w-full"
            variant="default"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Entrar'}
          </Button>
        </form>
      </div>
    </div>
  );
}
