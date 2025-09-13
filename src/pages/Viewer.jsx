import React,  {useEffect, useRef, useState} from "react"; //usamos useRef para referencias mutables como tiempo restante, timeout
import {useLocation, useParams, Link, useNavigate} from "react-router-dom"; //useLocation lee params de ruta id
import {Space, Button} from "antd";
import { PlayCircleOutlined, PauseCircleOutlined, StopOutlined, BarChartOutlined } from "@ant-design/icons";
import PlayerCard from "../components/PlayerCard.jsx";
import {useHelpers} from "../helpers-context.js"; //Hook propio que expone utilidades como decodificar y contar eventos

export default function Viewer(){
    const {decodeDeckParam, incView, incPause, incStop} = useHelpers(); //extrae de helpers paa decodificar el query param d (objeto deck). Usar métricas y contadores
    const {id} =useParams();
    const {search} =useLocation(); //obtiene el ?query de la URL
    const nav = useNavigate();
    const d = new URLSearchParams(search).get("d");
    const deck = d ? decodeDeckParam(d) : null
    const durationMs = deck?.durationMs || 20000;
    
    //Estados de reproducción
    const [playing, setPlaying] =useState(false);
    const [paused, setPaused] = useState(false);
    cont [ended, setEnded] = useState(false);

    //control de tiempo: timeout y contador
    const remainingRef =useRef(durationMs); //controla tiempo restante
    const timeoutRef = useRef(null); //guarda el id del setTimeout activo
    const startedAtRef = useRef(null);

    function clearT(){if(timeoutRef.current){clearTimeout(timeoutRef.current); timeoutRef.current = null; } }
    //Función utilitaria: si hay timeout, lo limpia y pone el ref a null.

    function finish(){ clearT(); remainingRef.current = 0; setEnded(true); setPlaying(false); setPaused(false); }
    //Función para limpiar el timeout, pone restante a 0, cambia estados
    
     function start(){
    if(!deck) return;
    incView(id);
    setPlaying(true); setPaused(false); setEnded(false);
    remainingRef.current = durationMs; //Resetea tiempo restante a duración total.
    startedAtRef.current = Date.now(); //Registra startedAt.
    clearT();
    timeoutRef.current = setTimeout(finish, remainingRef.current);
  }

  function pause(){
    if(!playing || paused || ended) return;
    incPause(id);
    const elapsed = Date.now() - (startedAtRef.current || Date.now()); //Calcula tiempo transcurrido desde startedAt.
    remainingRef.current = Math.max(0, remainingRef.current - elapsed); //Resta lo transcurrido al tiempo restante (con Math.max por seguridad).
    clearT();
    setPaused(true);
  }

   function resume(){
    if(!playing || !paused || ended) return;
    setPaused(false);
    startedAtRef.current = Date.now();
    timeoutRef.current = setTimeout(finish, remainingRef.current);
  }

   function stop(){
    if(!playing || ended) return;
    incStop(id);
    clearT();
    remainingRef.current = 0;
    setEnded(true); setPlaying(false); setPaused(false);
  }

    useEffect(()=>()=>clearT(), []); //limpieza al desmontar el componente

    
}
