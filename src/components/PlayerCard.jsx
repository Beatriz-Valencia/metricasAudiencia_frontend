import React from "react";
import { Card, Typography } from "antd";

export default function PlayerCard({ title }) {
  return (
    <Card>
      <div className="">
        <Typography.Text type="secondary">
          Presentación creada a partir de título
        </Typography.Text>
      </div>
    </Card>
  );
}


