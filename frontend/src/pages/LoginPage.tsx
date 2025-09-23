import { useState } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { loginUser } from '@/service/user';
import PageLoading from '@/components/shared/PageLoading';
import Title1 from '@/components/shared/typo/Title1';
import { useAuth } from '@/hooks/useAuth';
import { AuthUser } from '@/types';

interface DecodedToken {
  email: string;
  name: string;
  sub: string;
}

export default function LoginPage() {
  const { login: loginToApp } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [fbBtnClick, setFbBtnClick] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleGLoginSuccess = async (credentialResponse: CredentialResponse) => {
    setLoading(true);
    const idToken = credentialResponse.credential;

    if (!idToken) {
      console.log('Google Login Failed: No ID token received.');
      setLoading(false);
      return;
    }

    try {
      const decodedToken: DecodedToken = jwtDecode(idToken);
      const { email, name, sub: googleId } = decodedToken;

      const backendUser = await loginUser({
        email,
        name,
        googleId,
        idToken,  // 👈 include this
      });

      setLoading(false);
      if (backendUser) {
        loginToApp(backendUser, idToken);
      } else {
        console.log('Error logging in to backend');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error decoding ID token or logging in:', error);
    }
  };

  const handleGLoginFail = () => {
    console.log('Google Login Fail');
  };

  const handleFaceBookLoginClick = () => {
    setFbBtnClick(true);
    setTimeout(() => {
      setFbBtnClick(false);
    }, 2000);
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
          <div className="space-y-4 mt-12">
            <GoogleLogin
              onSuccess={handleGLoginSuccess}
              onError={handleGLoginFail}
              useOneTap
            />
            <hr />
            <button
              type="button"
              onClick={handleFaceBookLoginClick}
              className="inline-flex items-center justify-center gap-2 w-full bg-[#3b5998] hover:bg-[#3b5998]/90 text-white text-sm font-medium border rounded-lg px-5 py-2.5 focus:outline-none focus:ring-2 focus:[#3b5998]/50"
            >
              {/* Facebook SVG */}
            </button>
            {fbBtnClick && (
              <p className="text-red-600 text-sm font-medium text-center">
                This feature is not implemented yet!
              </p>
            )}
          </div>
        </div>
      </div>
      <PageLoading show={isLoading} />
    </>
  );
}