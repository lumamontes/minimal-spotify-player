"use client"

import * as React from "react"
import { signIn } from "next-auth/react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"
import { motion } from "framer-motion"
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}


export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  return (
    <div className={"grid gap-6"} {...props}>
      <motion.button
        type="button"
        onClick={() => {
          setIsLoading(true)
          signIn("spotify")
        }}
        className={cn(buttonVariants({variant: "outline"}))}
        disabled={isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <div className="mr-2 h-4 w-4" />
        )}{" "}
       Login with Spotify
      </motion.button>
    </div>
  )
}
