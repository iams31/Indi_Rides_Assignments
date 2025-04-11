import React from "react";
import CommentSection from "./components/CommentSection";
import "./App.css";

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <span>Thoughts(25)</span>
        <span>Top Holders</span>
        <span>Activity</span>
      </nav>
      <CommentSection />
    </div>
  );
}

export default App;
