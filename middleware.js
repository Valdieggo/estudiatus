import { withAuth } from "next-auth/middleware"

export default withAuth(
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",

    },

  }
)

export const config = {
  matcher: ["/administrator/:path*",
   
    
    "/api/college/delete:path",
    "/api/college/create:path",
    "/api/college/update:path",
    
    "/api/career/delete:path",
    "/api/career/create:path",
    "/api/career/update:path",
    "/api/career/subscribe:path",
    
    "/api/subject/delete:path",
    "/api/subject/create:path",
    "/api/subject/update:path",
    ]
}