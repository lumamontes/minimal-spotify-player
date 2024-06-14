"use client"

import * as React from "react"
import { MainNavItem } from "@/types"
import { Presets } from "./presets"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Presets />
    </div>
  )
}
