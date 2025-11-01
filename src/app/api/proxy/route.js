import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000'

async function handleRequest(req, method) {
  try {
    const cookieStore = cookies()
    const sessionSID = cookieStore.get('SID')?.value

    const { searchParams } = new URL(req.url)
    const path = searchParams.get('path')
    if (!path) return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 })

    const contentType = req.headers.get('content-type') || ''
    let body

    if (method !== 'GET' && method !== 'HEAD') {
      if (contentType.includes('application/json')) {
        const text = await req.text()
        body = text ? JSON.parse(text) : undefined
      } else if (
        contentType.includes('multipart/form-data') ||
        contentType.includes('application/x-www-form-urlencoded')
      ) {
        body = await req.formData()
      }
    }

    const res = await fetch(`${API_BASE_URL}/${path}`, {
      method,
      headers: {
        ...(contentType && { 'Content-Type': contentType }),
        ...(sessionSID && { 'Cookie': `SID=${sessionSID}` }),
      },
      body:
        method !== 'GET' && method !== 'HEAD'
          ? body instanceof FormData
            ? body
            : body
              ? JSON.stringify(body)
              : undefined
          : undefined,
      credentials: 'include',
    })

    let data
    try { data = await res.json() }
    catch { data = await res.text() }

    return NextResponse.json(data, { status: res.status })
  } catch (err) {
    console.error('Proxy error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function GET(req) { return handleRequest(req, 'GET') }
export async function POST(req) { return handleRequest(req, 'POST') }
export async function PUT(req) { return handleRequest(req, 'PUT') }
export async function DELETE(req) { return handleRequest(req, 'DELETE') }
