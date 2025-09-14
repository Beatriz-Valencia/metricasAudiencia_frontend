import React, { useEffect, useRef, useState } from "react"; //usamos useRef para referencias mutables como tiempo restante, timeout
import { useLocation, useParams, Link, useNavigate } from "react-router-dom"; //useLocation lee params de ruta id
import { Space, Button } from "antd";
import PlayerCard from "../components/PlayerCard.jsx";
import { useHelpers } from "../helpers-context.js"; //Hook propio que expone utilidades como decodificar y contar eventos

export default function Viewer() {
  const { decodeDeckParam, incView, incPause, incStop } = useHelpers(); //extrae de helpers paa decodificar el query param d (objeto deck). Usar métricas y contadores
  const { id } = useParams();
  const { search } = useLocation(); //obtiene el ?query de la URL
  const nav = useNavigate();
  const d = new URLSearchParams(search).get("d");
  const deck = d ? decodeDeckParam(d) : null;

  const durationMs = deck?.durationMs || 20000;
  const slides = deck?.slides || []; // ← slides del deck
  const slideCount = Math.max(1, slides.length);
  const perSlideMs = Math.max(1000, Math.floor(durationMs / slideCount));

  //Estados de reproducción
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [ended, setEnded] = useState(false);
  const [current, setCurrent] = useState(0);

  //control de tiempo: timeout y contador
  const remainingRef = useRef(durationMs); //controla tiempo restante
  const timeoutRef = useRef(null); //guarda el id del setTimeout activo
  const slideIntervalRef = useRef(null);
  const startedAtRef = useRef(null);

  function clearT() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (slideIntervalRef.current) {
      //  limpiar también el intervalo de slides
      clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
  }
  //Función utilitaria: si hay timeout, lo limpia y pone el ref a null.

  function finish() {
    clearT();
    remainingRef.current = 0;
    setEnded(true);
    setPlaying(false);
    setPaused(false);
  }
  //Función para limpiar el timeout, pone restante a 0, cambia estados

  function start() {
    if (!deck) return;
    incView(id);
    setCurrent(0);
    setPlaying(true);
    setPaused(false);
    setEnded(false);
    remainingRef.current = durationMs; //Resetea tiempo restante a duración total.
    startedAtRef.current = Date.now(); //Registra startedAt.
    clearT();
    timeoutRef.current = setTimeout(finish, remainingRef.current);
    // Avance automático de slide cada perSlideMs
    slideIntervalRef.current = setInterval(() => {
      setCurrent((prev) => Math.min(slideCount - 1, prev + 1));
    }, perSlideMs);
  }

  function pause() {
    if (!playing || paused || ended) return;
    incPause(id);
    const elapsed = Date.now() - (startedAtRef.current || Date.now()); //Calcula tiempo transcurrido desde startedAt.
    remainingRef.current = Math.max(0, remainingRef.current - elapsed); //Resta lo transcurrido al tiempo restante (con Math.max por seguridad).
    clearT();
    setPaused(true);
  }

  function resume() {
    if (!playing || !paused || ended) return;
    setPaused(false);
    startedAtRef.current = Date.now();
    timeoutRef.current = setTimeout(finish, remainingRef.current);
    // reanudar avance de slides
    slideIntervalRef.current = setInterval(() => {
      setCurrent((prev) => Math.min(slideCount - 1, prev + 1));
    }, perSlideMs);
  }

  function stop() {
    if (!playing || ended) return;
    incStop(id);
    clearT();
    remainingRef.current = 0;
    setEnded(true);
    setPlaying(false);
    setPaused(false);
  }

  useEffect(() => () => clearT(), []); //limpieza al desmontar el componente

  useEffect(() => {
    // 🟡
    if (deck && !playing && !paused && !ended) start();
    return () => clearT();
  }, [d]);

  // RENDER dentro del componente
  if (!deck) {
    return (
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {" "}
        <PlayerCard title="Deck inválido" />
        <Link to="/">
          <Button>Volver</Button>
        </Link>{" "}
      </Space>
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <PlayerCard title={deck.title} />
      {/*  Muestra la imagen actual si hay slides */}
      {slides[current] && (
        <img
          src={slides[current].url}
          alt={slides[current].caption}
          style={{
            width: "100%",
            maxHeight: 520,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      )}{" "}
      <Space>
        {!playing && !ended && (
          <Button
            type="primary"
            className="lime"
            onClick={start}
          >
            Reproducir
          </Button>
        )}
        {playing && !paused && <Button onClick={pause}>Pausar</Button>}
        {playing && paused && <Button onClick={resume}>Reanudar</Button>}
        {playing && (
          <Button danger onClick={stop}>
            Detener
          </Button>
        )}
        <Button onClick={() => nav(`/stats/${id}?d=${encodeURIComponent(d)}`)}>
          Ver métricas
        </Button>
      </Space>
    </Space>
  );
}
