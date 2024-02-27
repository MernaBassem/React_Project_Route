import React from 'react';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Toaster } from 'react-hot-toast';
export default function Layout() {
  return <>
       <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <Navbar />
          <div style={{ marginTop: "100px" }}> 
        <Outlet />
        <Toaster />
      </div>
          <Footer />
        </body>
      </html>
  </>
}
