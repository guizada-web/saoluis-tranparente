import React, { useEffect, useRef } from "react";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

export default function MapView() {
  const mapRef = useRef(null);

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

    // exemplo de marcador (obra pública)
    const marker = L.marker([-2.5307, -44.3068]).addTo(map);
    marker.bindPopup("<strong>Obra Exemplo</strong><br/>Prazo: 2025-06-30<br/>Valor: R$ 1.200.000");

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div id="map-root" style={{ height: "100%", width: "100%" }} />;
}
