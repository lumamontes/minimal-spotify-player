import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { Session } from "next-auth"


export type CustomSession = Session & {
  accessToken: string
  refreshToken: string
  providerAccountId: string
}


export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  console.log('session', session)
  return session?.user
}

export async function getCurrentTokens() {
  const session = await getServerSession(authOptions) as CustomSession

  return {
    accessToken: session?.accessToken,
    refreshToken: session?.refreshToken,
    providerAccountId: session?.providerAccountId,
  }
}