import { NextAuthOptions } from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  providers: [
    SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorization: "https://accounts.spotify.com/authorize?scope=user-read-email,user-library-read,streaming,user-read-private,user-read-playback-state,user-modify-playback-state&response_type=code",
      })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
        return true
      },
      async redirect({ url, baseUrl}) {
        console.log('url', JSON.stringify(url, undefined, " "))
        console.log('baseUrl', JSON.stringify(baseUrl, undefined, " "))
        
        if(url === `${baseUrl}/`) {
          return `${baseUrl}/dashboard`
        }

        return `${baseUrl}/`
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        
        await account
        if(account) {
          return {
            email: token.email,
            name: token.name,
            image: token.picture,
            provider: account.provider,
            scopes: account.scope,
            providerAccountId: account.providerAccountId,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            expires_at: account.expires_at,
          }
        }
      return token
      },
      async session({ session, user, token }) {

        return {
          ...session,
          scopes: token.scopes,
          provider: token.provider,
          providerAccountId: token.providerAccountId,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          expires_at: token.expires_at,
        };
      },
    
  },
}
