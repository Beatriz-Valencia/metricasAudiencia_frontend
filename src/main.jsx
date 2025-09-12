import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router.dom";
import "./index.css";
import Create from "./pages/Create.jsx";
import Viewer from "./pages/Viewer.jsx";
import Stats from "/.pages/Stats.jsx";
import App from "./App.jsx";

//Presentación con título y duración
function SimpleDeck( durationMs = 20000){
  return {durationMs: Math.max (durationMs, 3000)} //duración mínima 3 seg
}

function 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Create />} />
          <Route path="/v/:id" element={<Viewer />} />
          <Route path="/stats/ïd" element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
