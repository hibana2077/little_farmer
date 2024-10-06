import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-green-800 mb-6">Login to Hydroponic Education Platform</h1>
        <LoginForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="font-medium text-green-600 hover:text-green-500">
            Contact your administrator
          </a>
        </p>
      </div>
    </div>
  );
}