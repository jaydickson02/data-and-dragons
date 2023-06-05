
//Layout component
import React from "react"
import Navbar from "./Navigation/navbar"
import Footer from "./Navigation/footer"

export default function Layout({ children }) {
    return (
      <div class="flex flex-col h-screen bg-white-0 dark:bg-gray-700">
        <Navbar />
          <main class="flex-grow dark:bg-gray-700">
            {children}
          </main>
        <Footer />
      </div>
    )
    }