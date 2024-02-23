import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const reqHeaders = new Headers(request.headers)
  reqHeaders.set('x-request-pathname', request.nextUrl.pathname)

  return NextResponse.next({
    request: {
      headers: reqHeaders,
    }
  })
}
