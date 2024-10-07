'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // 使用 try-catch 來確保所有 localStorage 操作都成功執行
        try {
          localStorage.setItem('user', JSON.stringify(data.user))
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('refresh_token', data.refresh_token)
          localStorage.setItem('isAuthenticated', 'true')
          
          console.log('Authentication data saved successfully')
          console.log('isAuthenticated:', localStorage.getItem('isAuthenticated'))
          
          // 可選：驗證所有數據是否正確保存
          if (
            localStorage.getItem('user') &&
            localStorage.getItem('access_token') &&
            localStorage.getItem('refresh_token') &&
            localStorage.getItem('isAuthenticated') === 'true'
          ) {
            console.log('All authentication data verified')
            // push to the dashboard page
            router.push('/dashboard')
          } else {
            throw new Error('Failed to save all authentication data')
          }
        } catch (storageError) {
          console.error('Error saving to localStorage:', storageError)
          setError('登入成功，但保存數據時出錯。請重試。')
        }
      } else {
        const errorData = await response.json()
        setError(errorData.message || '用戶名或密碼無效')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('發生錯誤，請重試。')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <Label htmlFor="username" className="sr-only">用戶名</Label>
          <Input
            id="username"
            name="username"
            type="text"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
            placeholder="用戶名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password" className="sr-only">密碼</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
            placeholder="密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div>
        <Button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          登入
        </Button>
      </div>
    </form>
  )
}