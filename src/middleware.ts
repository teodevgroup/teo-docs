import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const reqHeaders = new Headers(request.headers)
  reqHeaders.set('x-request-pathname', request.nextUrl.pathname)
  let serverPreferences = request.cookies.get('server')?.value || '0'
  let databasePreferences = request.cookies.get('database')?.value || '0'
  let clientPreferences = request.cookies.get('client')?.value || '0'
  reqHeaders.set('x-server-preferences', serverPreferences)
  reqHeaders.set('x-database-preferences', databasePreferences)
  reqHeaders.set('x-client-preferences', clientPreferences)
  return NextResponse.next({
    request: {
      headers: reqHeaders,
    }
  })
}
