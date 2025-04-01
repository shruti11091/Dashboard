import React from "react";
import "./Footer.css"; // Make sure to create this CSS file

const Footer = ({ isAtBottom }) => {
  return (
    <footer className={`footer ${isAtBottom ? "visible" : ""}`}>
      <p>© 2025 My Website</p>
    </footer>
  );
};

export default Footer;
