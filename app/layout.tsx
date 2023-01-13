"use client";

import './global.css';
import { ReactNode } from "react";
import Provider from './providers';
import Header from './header';
import Footer from './footer';

interface IProps {
  children: ReactNode;
  session: any;
}

export default function RootLayout({ children, session }: IProps) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Header />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
