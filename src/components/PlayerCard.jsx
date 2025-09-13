import React from "react";
import { Card, Typography } from "antd";

export default function PlayerCard({ title }) {
  return (
    <Card>
      <div className="viewer-head">
        <div className="title">
          <Typography.Title level={4} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
        </div>
        <div className="meta">Auto-play</div>
      </div>
      <div className="player-box">
        <Typography.Text type="secondary">
          Reproducción automática (Pausar/Detener)
        </Typography.Text>
      </div>
    </Card>
  );
}

//tipography.title = tipografía de Ant Design
