
//Layout component
import React from "react"
import Navbar from "./navbar"
import Footer from "./footer"

export default function Layout({ children }) {
    return (
        <div class="flex flex-col h-screen bg-white-0">
  <Navbar />
  <main class="flex-grow">
    {children}
  </main>
  <Footer />
</div>
    )
    }