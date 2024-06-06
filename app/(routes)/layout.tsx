import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { SearchProvider } from "@/context/context";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
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

export default MainLayout;
