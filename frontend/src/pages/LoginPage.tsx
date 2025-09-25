import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getMe, login } from '@/service/user';
import PageLoading from '@/components/shared/PageLoading';
import Title1 from '@/components/shared/typo/Title1';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const { login: loginToApp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoError, setVideoError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await login({ email, password });
      loginToApp(user);
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center w-full h-screen p-4 ${
          videoError ? 'bg-primary' : ''
        }`}
      >
        {!videoError && (
          <>
            <video
              src="/videos/coffee-shop.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setVideoError(true)}
            ></video>
            <div className="absolute inset-0 w-full h-full bg-black/40"></div>
          </>
        )}
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
          <Title1 className="text-primary">Login</Title1>
          <p className="text-gray-500 font-medium mt-2">
            Sign in to continue your coffee journey
          </p>
          <form onSubmit={handleLogin} className="space-y-4 mt-12">
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
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <p className="text-sm font-light text-gray-500">
              Don’t have an account yet?{' '}
              <Link
                to="/register"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <PageLoading show={isLoading} />
    </>
  );
}