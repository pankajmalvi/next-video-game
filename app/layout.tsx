'use client'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { GameProvider } from "@/hooks/useGame";
import React from "react";
import './../styles/globals.scss'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <GameProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </GameProvider>
      </body>
    </html>
  )
}
