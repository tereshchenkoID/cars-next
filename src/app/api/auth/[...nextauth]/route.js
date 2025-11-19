import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
// import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers"
import { signOut } from "next-auth/react";

const backendLogin = async (userData) => {
  const res = await fetch(`${process.env.API_BASE_URL}/login/`, {
    method: "POST",
    body: userData
  })

  if (!res.ok) return null

  return await res.json()

  // if (type === 'credentials') {
  //   return await res.json()
  // }
  // else {
  //   const setCookieHeader = res.headers.get('set-cookie')
  //   let SID = null
  //   if (setCookieHeader) {
  //     const match = setCookieHeader.match(/SID=([^;]+);/)
  //     if (match) SID = match[1]
  //   }
  //   return SID
  // }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "login",
      async authorize(credentials) {
        const formData = new FormData()
        formData.append("username", credentials.username)
        formData.append("password", credentials.password)

        const data = await backendLogin(formData)
        if (!data?.token) return null

        return { ...data, SID: data.token }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: { params: { scope: "openid email profile", prompt: "select_account" } },
      async profile(profile) {
        const formData = new FormData()
        formData.append("email", profile.email)
        formData.append("name", profile.name)
        formData.append("image", profile.picture)
        formData.append("provider", 'google')
        formData.append("type", '1')

        const data = await backendLogin(formData)
        if (!data?.token) return null

        return { ...data, SID: data.token }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/", signOut: "/", error: "/" },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.SID) token.SID = user.SID
      if (user?.id) token.id = user.id
      if (user?.username) token.username = user.username
      if (user?.email) token.email = user.email
      if (user?.name) token.name = user.name
      if (user?.image) token.image = user.image
      return token
    },

    async session({ session, token }) {
      if (token?.SID) {
        session.SID = token.SID
        session.id = token.id
        session.username = token.username
        session.email = token.email
        session.name = token.name
        session.image = token.image
      }
      return session
    },
  },
  // events: {
  //   async signIn({ user, account }) {
  //     const SID = user?.SID
  //     if (SID) {
  //       const cookieStore = await cookies()
  //       cookieStore.set("SID", SID, {
  //         path: "/",
  //         httpOnly: true,
  //         sameSite: "lax",
  //         secure: process.env.NODE_ENV === "production",
  //       })
  //     }
  //   },
  // },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
