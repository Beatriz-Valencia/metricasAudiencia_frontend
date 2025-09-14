import React from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import { Card, Typography, Space, Button, Statistic } from "antd";
import { useHelpers } from "../helpers-context.js";
import { HomeOutlined } from "@ant-design/icons";

export default function Stats() {
  const nav = useNavigate();
  const { decodeDeckParam, getMetrics } = useHelpers();
  const { id } = useParams(); //Lee el parámetro de ruta id desde la URL (por ejemplo, en /stats/:id)
  const { search } = useLocation(); //Obtiene la cadena de query completa (ej.: "?d=...") de la URL actual.
  const d = new URLSearchParams(search).get("d"); //Crea un URLSearchParams con search y extrae el valor del query param d
  const deck = d ? decodeDeckParam(d) : null;
  const m = getMetrics(id);

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
    <Card style={{width:"100%", maxWidth:720}}>
      <Typography.Title level={2} style={{ marginBottom: 16 }}>
        Métricas
      </Typography.Title>
      <Space wrap>
        <Card>
          <Statistic title="Número de veces vista" value={m.views} />
        </Card>
        <Card>
          <Statistic title="Número de veces pausada" value={m.pauses} />
        </Card>
        <Card>
          <Statistic title="Número de veces detenida" value={m.stops} />
        </Card>
      </Space>
      

      <div style={{ marginTop: 16 }}>
        <Link to={`/v/${id}?d=${encodeURIComponent(d)}`}>
          <Button>Volver al visor</Button>
        </Link>
        <Button
          type="primary"
          className="lime"
          icon={<HomeOutlined />}
          onClick={() => nav("/")}
        >
          Volver al inicoi
        </Button>
      </div>
    </Card>
    </div>
  );
}
/* Link to = Lleva de vuelta al visor de ese id, reinyectando el parámetro d (codificado
 con encodeURIComponent para que sea seguro en la URL */
