import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import api from "../services/api";

export default function MapView() {
  const mapRef = useRef(null);
  const [obras, setObras] = useState([]);

  const carregarObras = async () => {
    try {
      const res = await api.get("/obras");
      setObras(res.data);
    } catch (error) {
      console.error("Erro ao carregar obras:", error);
    }
  };

  useEffect(() => {
    carregarObras();
  }, []);

  useEffect(() => {
    if (mapRef.current) return; // já inicializado

    const map = L.map("map-root", {
      center: [-2.5307, -44.3068], // São Luís, MA (aprox)
      zoom: 12,
      layers: [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors"
        })
      ]
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || obras.length === 0) return;

    // Limpar marcadores existentes
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current.removeLayer(layer);
      }
    });

    // Adicionar marcadores das obras
    obras.forEach((obra) => {
      if (obra.latitude && obra.longitude) {
        const marker = L.marker([obra.latitude, obra.longitude]).addTo(mapRef.current);

        const statusColor = {
          'planejada': '#fbbf24',
          'em_andamento': '#3b82f6',
          'concluida': '#10b981',
          'cancelada': '#ef4444'
        };

        const statusText = {
          'planejada': 'Planejada',
          'em_andamento': 'Em Andamento',
          'concluida': 'Concluída',
          'cancelada': 'Cancelada'
        };

        const popupContent = `
          <div style="font-family: Arial, sans-serif; max-width: 250px;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px;">${obra.titulo}</h3>
            <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px;">${obra.descricao}</p>
            <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 12px;">Bairro: ${obra.bairro}</p>
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <span style="background: ${statusColor[obra.status] || '#6b7280'}; color: white; padding: 2px 6px; border-radius: 3px; font-size: 11px; font-weight: bold;">
                ${statusText[obra.status] || obra.status}
              </span>
            </div>
            ${obra.progresso !== null ? `<p style="margin: 0 0 4px 0; color: #6b7280; font-size: 12px;">Progresso: ${obra.progresso}%</p>` : ''}
            ${obra.valor_estimado ? `<p style="margin: 0 0 4px 0; color: #6b7280; font-size: 12px;">Valor Estimado: R$ ${obra.valor_estimado.toLocaleString('pt-BR')}</p>` : ''}
            ${obra.data_inicio ? `<p style="margin: 0 0 4px 0; color: #6b7280; font-size: 12px;">Início: ${new Date(obra.data_inicio).toLocaleDateString('pt-BR')}</p>` : ''}
            ${obra.data_fim ? `<p style="margin: 0; color: #6b7280; font-size: 12px;">Fim Previsto: ${new Date(obra.data_fim).toLocaleDateString('pt-BR')}</p>` : ''}
          </div>
        `;

        marker.bindPopup(popupContent);
      }
    });
  }, [obras]);

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <div id="map-root" style={{ height: "100%", width: "100%" }} />
      <div style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "var(--card-bg)",
        padding: "8px 12px",
        borderRadius: "6px",
        border: "1px solid var(--border)",
        color: "var(--text)",
        fontSize: "12px",
        zIndex: 1000
      }}>
        <strong>Obras Públicas</strong><br/>
        {obras.length} obra{obras.length !== 1 ? 's' : ''} cadastrada{obras.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
