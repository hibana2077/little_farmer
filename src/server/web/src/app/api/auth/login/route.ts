import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    if (!apiBaseUrl) {
      throw new Error('API_BASE_URL is not defined')
    }

    const response = await fetch(`${apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { message: errorData.message || 'Invalid username or password' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json({
      user: data.user,
      access_token: data.access_token,
      refresh_token: data.refresh_token
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 })
  }
}