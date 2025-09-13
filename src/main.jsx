import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router.dom";
import "./index.css";

import Create from "./pages/Create.jsx";
import Viewer from "./pages/Viewer.jsx";
import Stats from "/.pages/Stats.jsx";
import App from "./App.jsx";
import {HelpersContext } from "./helpers-context.js";

//Presentación con duración
function generateSimpleDeck( durationMs = 20000){
  return {durationMs: Math.max (durationMs, 3000)} //duración mínima 3 seg
}

//Codificación de la presentación para convertira string para URL
 function encodeDeck(deck) { //recibe cualquier objeto deck
  const json = JSON.stringify(deck) //convierte a JSON
  const bytes = new TextEncoder().encode(json); //TextEncoder transforma el string en su representación binaria
  const bin = String.fromCharCode(...bytes) //convierte cada byte en un caracter
  return btoa(bi) //codifica el string binario a Base 64 y lo devuelve, creando cadena ASCII segura para URLs.
 

 function decodeDeckParam(b64) { //La función recibe una cadena Base 64
  try {
    const bin = atob(b64);                                // Decodifica la cadena Base 64 a un string binario
    const bytes = Uint8Array.from(bin, c => c.charCodeAt(0)); // Recorre ese string binario para reconstruir un Unit8Array de bytes
    const json = new TextDecoder().decode(bytes);         // TextDecoder convierte los bytes UTF-8 a un string JSON
    return JSON.parse(json);                              // string → objeto
  } catch {
    return null;                                          // si falla, devuelve null
  }

  // Métricas mínimas en localStorage por presentación
const KEY = "metricasAudiencia.simple.metrics";
function readAll(){ try{ return JSON.parse(localStorage.getItem(KEY) || "{}"); }catch{ return {}; } }
function writeAll(data){ localStorage.setItem(KEY, JSON.stringify(data)); }
function ensure(deckId){
  const all = readAll();
  all[deckId] = all[deckId] || { views:0, pauses:0, stops:0 };
  return all;
}
function incView(deckId){ const all = ensure(deckId); all[deckId].views += 1; writeAll(all); }
function incPause(deckId){ const all = ensure(deckId); all[deckId].pauses += 1; writeAll(all); }
function incStop(deckId){ const all = ensure(deckId); all[deckId].stops  += 1; writeAll(all); }
function getMetrics(deckId){ const all = readAll(); return all[deckId] || { views:0, pauses:0, stops:0 }; }
  // Objeto de helpers que vamos a proveer por Context
const helpers = {
  generateSimpleDeck, encodeDeck, decodeDeckParam,
  incView, incPause, incStop, getMetrics
};


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelpersContext.Provider value={helpers}>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<App><Create /></App>} />
          <Route path="/v/:id" element={<App><Viewer /></App>} />
          <Route path="/stats/ïd" element={<App><Stats /></App>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </HelpersContext.Provider>
  </StrictMode>
);
