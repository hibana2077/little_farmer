import { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: '登入',
  description: '登入您的帳戶',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">歡迎回來</h1>
            <p className="text-sm text-gray-600">請輸入您的登入資訊</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}