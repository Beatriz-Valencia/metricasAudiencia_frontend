import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Card, Typography, Input, Space, Button, message} from "antd";
import {RocketOutlined} from "@ant-design/icons";
import {useHelpers} from "../helpers-context.js";

export default function Create() {
    const { buildDeckFromTitle, encodeDeck} =useHelpers();
    const [text, setText] = useState("");
    const [ms, setMs] = useState(20000);
    const nav = useNavigate();

async function onPublish(){
    const deck = await buildDeckFromTitle(text, ms);
    const d = encodeDeck(deck)
    const id = crypto.randomUUID(); 
    nav(`/v/${id}?d=${encodeURIComponent(d)}`); 
   
  
}
return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <Card style={{ width: "100%", maxWidth: 640 }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Typography.Paragraph type="secondary">
            Mide cómo tu audiencia interactua con tu presentación
          </Typography.Paragraph>

          <Input.TextArea
            rows={4}
            placeholder="Título de la presentación..."
            value={text}
            onChange={(e)=>setText(e.target.value)}
          />
          <Space.Compact>
            <Button type="primary" className="lime" icon={<RocketOutlined/>} onClick={onPublish}>
              Crear presentación
            </Button>
          </Space.Compact>
        </Space>
      </Card>
    </div>
  );
}