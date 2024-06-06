import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { SearchProvider } from "@/context/context";
import React from "react";

interface AuthLayoutPageProps {
  children: React.ReactNode;
}

const AuthLayoutPage = ({ children }: AuthLayoutPageProps) => {
  return (
    <>
      <SearchProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SearchProvider>
    </>
  );
};

export default AuthLayoutPage;
