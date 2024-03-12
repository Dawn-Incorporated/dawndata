"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
    const pathname = usePathname()

    return (
        <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                dawndata.
            </Link>
            <nav className="flex items-center gap-6 text-sm">
                <Link
                    href="/databases"
                    className={ cn(
                        "transition-colors hover:text-foreground/80",
                        pathname?.startsWith("/databases")
                            ? "text-foreground"
                            : "text-foreground/60"
                    ) }
                >
                    Databases
                </Link>
                <Link
                    href="/users"
                    className={ cn(
                        "transition-colors hover:text-foreground/80",
                        pathname?.startsWith("/users")
                            ? "text-foreground"
                            : "text-foreground/60"
                    ) }
                >
                    Users & Groups
                </Link>
                <Link
                    href="/settings"
                    className={ cn(
                        "transition-colors hover:text-foreground/80",
                        pathname?.startsWith("/settings")
                            ? "text-foreground"
                            : "text-foreground/60"
                    ) }
                >
                    Settings
                </Link>
            </nav>
        </div>
    )
}