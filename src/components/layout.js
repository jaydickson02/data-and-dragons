
//Layout component
import React from "react"
import Navbar from "./Navigation/navbar"
import Footer from "./Navigation/footer"
import { Helmet } from 'react-helmet';

export default function Layout({ children, hideFooter, hideNav }) {
  //Hide nav and footer
  if(hideNav && hideFooter) {
    return (
      <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Data and Dragons</title>
        <body className="bg-white-0 dark:bg-gray-800"/>
      </Helmet>

      <div className="flex flex-col h-screen">
          <main className="flex-grow">
            {children}
          </main>
      </div>
      </div>
    )
  }
    if(hideNav) {
      return (
        <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Data and Dragons</title>
          <body className="bg-white-0 dark:bg-gray-800"/>
        </Helmet>
  
        <div className="flex flex-col h-screen">
            <main className="flex-grow">
              {children}
            </main>
        </div>
        </div>
      )
    }
    if(hideFooter) {
      return (
        <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Data and Dragons</title>
          <body className="bg-white-0 dark:bg-gray-800"/>
        </Helmet>
  
        <div className="flex flex-col h-screen">
          <Navbar />
            <main className="flex-grow">
              {children}
            </main>
        </div>
        </div>
      )
    }

    return (
      <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Data and Dragons</title>
        <body className="bg-white-0 dark:bg-gray-800"/>
      </Helmet>

      <div className="flex flex-col h-screen">
        <Navbar />
          <main className="flex-grow">
            {children}
          </main>
        <Footer />
      </div>
      </div>
    )
    }