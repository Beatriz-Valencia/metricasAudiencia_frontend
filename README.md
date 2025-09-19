# Presentaciones con interactividad

[![React](https://img.shields.io/badge/React-18%2F19-61DAFB?logo=react&logoColor=white&style=flat)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?logo=vite&logoColor=white&style=flat)](https://vitejs.dev/)
[![CSS](https://img.shields.io/badge/CSS-Modules-1572B6?logo=css3&logoColor=white&style=flat)](https://developer.mozilla.org/docs/Web/CSS)

Aplicación **React + Vite** que genera una presentación visual a partir de un título o tema. Las imágenes se obtienen de **Unsplash** y se reproducen en un pase automático (slideshow). No hay backend: los datos viajan en la propia URL y las métricas se guardan en el navegador. Durante la presentación, se computan el número de veces que la presentación se ha visualizado, y cuántas veces se ha pausado o detenido. Esos datos están disponibles al final la presentación para su uso por parte de departmentos de venta o marketing.

---

## 🚀 Puesta en marcha

```
# 1) Instalar dependencias
npm install

# 2) Configurar la clave de Unsplash
# crea un archivo .env.local en la raíz con:
# VITE_UNSPLASH_ACCESS_KEY=TU_CLAVE_DE_UNSPLASH

# 3) Entorno de desarrollo
npm run dev
```
La app usa VITE_UNSPLASH_ACCESS_KEY para buscar imágenes mediante la API de Unsplash.

## 🧩 Estructura (archivos clave)
```
src/
├─ main.jsx
├─ helpers-context.js
├─ App.jsx
├─ Create.jsx
├─ Viewer.jsx
├─ Stats.jsx
└─ PlayerCard.jsx
````

-main.jsx: punto de entrada. Declara helpers (generar deck, codificar/decodificar, métricas), los inyecta por Context y configura las rutas.

-helpers-context.js: define el HelpersContext y el hook useHelpers() para consumir los helpers en toda la app.

-App.jsx: layout contenedor simple.

-Create.jsx: pantalla inicial. Pide un título, construye el deck con Unsplash y navega al visor con el deck codificado en la URL.

-Viewer.jsx: visor que decodifica el deck, muestra las imágenes y controla reproducción/pausa/detener, con temporizadores limpios.

-Stats.jsx: muestra métricas locales (vistas, pausas, detenciones) y permite volver al visor o al inicio.

-PlayerCard.jsx: tarjeta de encabezado del visor.

---
##🔧 Funcionamiento técnico (resumen)
---
1) Generación del deck (Unsplash)
buildDeckFromTitle(title, durationMs, count) lanza un fetch a la Unsplash Search API y construye slides = [{ url, caption, author }, ...]. Si no hay resultados, se puede usar un fallback o manejar el error en Create.

2) Encapsular el deck en la URL (encode)
encodeDeck(deck) hace: JSON.stringify(deck) → TextEncoder (UTF-8) → “binary string” → btoa (Base64). El resultado se pasa por encodeURIComponent y se inyecta como ?d=... al navegar a /v/:id.

Es codificación, no cifrado. No deben ponerse datos sensibles en la URL. 

3) Restaurar el deck desde la URL (decode)
En Viewer, useLocation() lee ?d=... y decodeDeckParam revierte el proceso: atob (Base64 → binario) → Uint8Array → TextDecoder (UTF-8) → JSON.parse para reconstruir el objeto.

4) Reproducción y métricas
El visor avanza por las slides con un setInterval y finaliza con un setTimeout. Los IDs de timers viven en useRef para no provocar re-renders; useEffect limpia los timers al desmontar o cambiar de deck.
Las métricas (views/pauses/stops) se persisten en localStorage mediante helpers (incView, incPause, incStop, getMetrics) indexados por :id.

## 🖥️ Rutas
/ → Create (introducir título y generar presentación)

/v/:id?d=... → Viewer (reproduce la presentación)

/stats/:id?d=... → Stats (métricas básicas)

## 📝 Notas
Si usas React 19 con Ant Design v5, importa al principio de main.jsx:

```
import '@ant-design/v5-patch-for-react-19';
```
## 👥 Tu Feedback
Si te ha gustado este proyecto o quieres comentar cualquier mejora conmigo, no dudes en contactarme por email o por Linkedin.
