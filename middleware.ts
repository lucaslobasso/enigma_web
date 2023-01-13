import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
 
export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  console.log(!session);
  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const encoded = encodeURIComponent(requestedPage);
    const url = req.nextUrl.clone();

    console.log(requestedPage);

    url.pathname = `/auth/login`;
    url.search = `callbackUrl=${requestedPage}`;
    
    return NextResponse.redirect(url);
  }
 
  return NextResponse.next();
}


export const config = {
  matcher: ['/applications', '/logs']
};