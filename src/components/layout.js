
//Layout component
import React from "react"
import Navbar from "./Navigation/navbar"
import Footer from "./Navigation/footer"
import { Helmet } from 'react-helmet';

export default function Layout({ children }) {
    return (
      <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Data and Dragons</title>
        <body class="bg-white-0 dark:bg-gray-700"/>
      </Helmet>

      <div class="flex flex-col h-screen">
        <Navbar />
          <main class="flex-grow">
            {children}
          </main>
        <Footer />
      </div>
      </div>
    )
    }