import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from "next-auth/providers/credentials"

import { postData } from '@/helpers/api'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "select_account",
        },
      },
      async profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      async profile(profile) {
        return {
          email: profile.email,
          name: profile.name,
          image: profile.picture.data.url,
        };
      },
    }),
    CredentialsProvider({
      id: "login",
      async authorize(credentials) {
        return {
          username: credentials.username,
          password: credentials.password,
        }
      },
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
    error: '/',
  },
  // cookies: {
  //   sessionToken: {
  //     name: 'next-auth.session-token',
  //     options: {
  //       httpOnly: false, // Доступность для JS
  //       sameSite: 'Lax',
  //       path: '/',
  //       secure: process.env.NODE_ENV === 'production', // Только HTTPS в продакшене
  //     },
  //   },
  //   callbackUrl: {
  //     name: "next-auth.callback-url",
  //     options: {
  //       httpOnly: false,
  //       sameSite: "lax",
  //       path: '/',
  //       secure: process.env.NODE_ENV === "production",
  //     },
  //   },
  // },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        let type = 0

        if(account.provider === 'google') {
          type = 1
        }
        else if(account.provider === 'facebook') {
          type = 2
        }

        const formData = new FormData()
        formData.append('username', user.username || null)
        formData.append('password', user.password || null)
        formData.append('email', user.email || null)
        formData.append('image', user.image || null)
        formData.append('name', user.name || null)
        formData.append('type', type)

        const response = await postData('login/', formData)

        if (!response.code) {
          token.code = response.code
          token.id = response.id || null
          token.username = response.username
          token.email = response.email || null
          token.image = response.image || null
          token.name = response.name || null
          token.userType = response.userType
          token.account = response.account
        } else {
          throw new Error('Authentication failed')
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id
        session.username = token.username
        session.email = token.email
        session.image = token.image
        session.name = token.name
        session.userType = token.userType
        session.account = token.account  
      }
            
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
