import React from "react";
import {useLocation, useParams, Link} from "react-router-dom";
import {Card, Typography, Space, Button, Statistic} from "antd";
import {useHelpers} from "../helpers-context.js";


export default function Stats(){
    const {decodeDeckParam, getMetrics} = useHelpers();
    const {id} = useParams(); //Lee el parámetro de ruta id desde la URL (por ejemplo, en /stats/:id)
    const {search} = useLocation(); //Obtiene la cadena de query completa (ej.: "?d=...") de la URL actual.
    const d = new URLSearchParams(search).get("d"); //Crea un URLSearchParams con search y extrae el valor del query param d
    const deck = d? decodeDeckParam(d) : null;
      const m = getMetrics(id);

      return (
        <Card>
             <Typography.Title level={2} style={{ marginBottom: 16 }}>Métricas</Typography.Title>
      <Space wrap>
        <Card bordered><Statistic title="Vistas" value={m.views} /></Card>
        <Card bordered><Statistic title="Pausas (clics)" value={m.pauses} /></Card>
        <Card bordered><Statistic title="Detenidas" value={m.stops} /></Card>
      </Space>

      <div style={{ marginTop: 16 }}>
        <Link to={`/v/${id}?d=${encodeURIComponent(d)}`}><Button>Volver al visor</Button></Link>
      </div>
    </Card>
  );
}
//Link to = Enlace que lleva de vuelta al visor de ese id, reinyectando el parámetro d (codificado 
// con encodeURIComponent para que sea seguro en la URL