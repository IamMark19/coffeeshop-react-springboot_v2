import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { register } from '@/service/user';
import PageLoading from '@/components/shared/PageLoading';
import Title1 from '@/components/shared/typo/Title1';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { token, user } = await register({ name, email, password });
      login(user, token);
    } catch (err) {
      setError('Failed to register. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen p-4 bg-primary">
        <div className="relative z-10 flex flex-col w-full max-w-md bg-gray bg-gray-100 rounded-3xl p-10 mx-auto">
          <div className="flex items-center gap-3 mb-10 mx-auto">
            <img
              src="/images/app-logo.svg"
              alt="App Logo"
              className="w-20 h-20 rounded-full object-cover"
            />
            <p className="text-primary">
              <span className="block text-xl font-thin">Coffee</span>
              <span className="block text-2xl font-semibold">Shop</span>
            </p>
          </div>
          <Title1 className="text-primary">Register</Title1>
          <p className="text-gray-500 font-medium mt-2">
            Create an account to start your coffee journey
          </p>
          <form onSubmit={handleRegister} className="space-y-4 mt-12">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create an account'}
            </button>
            <p className="text-sm font-light text-gray-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
      <PageLoading show={isLoading} />
    </>
  );
}
