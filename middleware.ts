import authConfig from "./auth.config";
import NextAuth from "next-auth";

export const { auth: middleware } = NextAuth(authConfig);

// export default withAuth(
//     function middleware(req) {
//         console.log(req.nextUrl.pathname);
//         console.log(req.nextauth.token);

//         if (
//             req.nextUrl.pathname.startsWith('/admin') &&
//             req.nextauth.token?.role != "admin"
//         ) {
//             return NextResponse.rewrite(new URL('/denied', req.url));
//         }
//     },
//     {
//         pages: {
//             signIn: '/auth/signin',
//         },
//         callbacks: {
//             authorized: ({ token }) => !!token,
//         }
//     }
// )

export const config = {
    matcher: ['/admin']
}