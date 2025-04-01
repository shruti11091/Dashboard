import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = () => {
    const isBottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
    setIsAtBottom(isBottom);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div style={{ paddingTop: "80px", paddingBottom: "80px", minHeight: "100vh" }}>
    <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
    <Dashboard darkMode={darkMode} />
    <Footer isAtBottom={isAtBottom} /> {/* Pass isAtBottom prop to Footer */}
  </div>
  );

};

export default App;

