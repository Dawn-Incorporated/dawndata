'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/custom/site-header";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {

    return (
        <html lang="en">
        <body className={ inter.className }>
        <SiteHeader/>
        { children }
        </body>
        </html>
    );
}
