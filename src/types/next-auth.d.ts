import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: 'STUDENT' | 'INSTRUCTOR'
    }
  }

  interface User {
    id: string
    role: 'STUDENT' | 'INSTRUCTOR'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role?: 'STUDENT' | 'INSTRUCTOR'
  }
}
