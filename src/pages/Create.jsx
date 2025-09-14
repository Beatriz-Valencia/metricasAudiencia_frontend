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
    const id = crypto.randomUUID(); //usa API nativa del navegador. Llama a randomUUID(), que genera un identificador único aleatorio
    nav(`/v/${id}?d=${encodeURIComponent(d)}`); //redirige navegación a una ruta que incluye el UUID generado com oparte de la URL.
    //añade una query param d, con el contenido de d, codificado encodeURIComponent para que sea seguro en URL aunque contenga espacios, comillas
  
}

return (
    <Card>
        <Space direction="vertical" size="large" style={{width: "100%"}}>
            <Typography.Title level={2}>Crear presentación</Typography.Title>
            <Typography.Paragraph type="secondary">
                Mide cómo tu audiencia interactua tu presentación
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
)
}