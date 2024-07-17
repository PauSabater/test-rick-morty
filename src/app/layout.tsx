import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/Header/Header"
import '../styles/variables.scss'
import styles from './layout.module.scss'
import Head from "next/head"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Rick and Morty test Pau Sabater",
    description: "Test para web que muestra los personajes de Rick and Morty y efectua peticiones a la API de Rick and Morty",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Head>
                <link rel="icon" href="/logo.svg" type="image/svg+xml" />
            </Head>
            <body className={inter.className}>
                <Header />
                <main className={styles.main}>
                    {children}
                </main>
            </body>
        </html>
    )
}
