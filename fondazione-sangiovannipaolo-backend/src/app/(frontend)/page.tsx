"use client";

import { useState } from "react";
import Image from "next/image";

export default function PayloadFrontendPage() {
  const [hovAdmin, setHovAdmin] = useState(false);

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      fontFamily: "'Palatino Linotype', Georgia, serif",
      background: `
        radial-gradient(ellipse at 70% 110%, #F0E2BC22 0%, transparent 55%),
        radial-gradient(ellipse at 20% 80%,  #8B1A1A33 0%, transparent 50%),
        linear-gradient(150deg, #1A1208 0%, #2A1810 35%, #3A1A0A 65%, #2E2010 100%)
      `,
    }}>

      {/* Striscia oro in cima */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: "linear-gradient(90deg, transparent 0%, #C8A84B 40%, #8B1A1A99 70%, transparent 100%)",
      }} />

      {/* Bagliore oro centrale */}
      <div style={{
        position: "absolute", top: "55%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700, height: 260, borderRadius: "50%",
        background: "radial-gradient(ellipse, #C8A84B14 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Bagliore rosso alto-sx */}
      <div style={{
        position: "absolute", top: -100, left: -80,
        width: 420, height: 420, borderRadius: "50%",
        background: "radial-gradient(circle, #8B1A1A1A 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Cerchi decorativi */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600, height: 600, borderRadius: "50%",
        border: "1px solid #C8A84B0E", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 380, height: 380, borderRadius: "50%",
        border: "1px solid #C8A84B16", pointerEvents: "none",
      }} />

      {/* ── Card centrale ── */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center", padding: "0 24px", maxWidth: 480,
      }}>

        {/* Logo / Monogramma */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            width: 120, height: 120, margin: "0 auto",
            position: "relative", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            {/* Cerchio esterno */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: "1.5px solid #C8A84B55",
              background: "radial-gradient(circle, #C8A84B0A, transparent)",
            }} />
            {/* Cerchio interno tratteggiato */}
            <div style={{
              position: "absolute", inset: 8, borderRadius: "50%",
              border: "1px dashed #C8A84B22",
            }} />
            {/* Contenuto logo */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, zIndex: 1, padding: 16 }}>
              <Image 
                src="/logoFondazioneSB.png" 
                alt="Logo Fondazione" 
                width={80} 
                height={80}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 24, height: 1, background: "#C8A84B66" }} />
          <p style={{
            fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#C8A84B", fontWeight: 700, margin: 0,
          }}>
            Area Amministrativa
          </p>
          <div style={{ width: 24, height: 1, background: "#C8A84B66" }} />
        </div>

        {/* Titolo */}
        <h1 style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: "clamp(1.7rem, 4vw, 2.5rem)",
          fontWeight: 400, lineHeight: 1.2,
          background: "linear-gradient(135deg, #F5EDD8 30%, #C8A84B 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: 14,
          letterSpacing: "-0.01em",
        }}>
          Fondazione<br />Giovanni Paolo II
        </h1>

        {/* Sottotitolo */}
        <p style={{
          fontSize: "0.85rem", color: "#9A8E78",
          lineHeight: 1.75, marginBottom: 36, maxWidth: 320,
        }}>
          Gestisci contenuti, documenti e pubblicazioni
          dal pannello di amministrazione.
        </p>

        {/* Divider */}
        <div style={{
          width: 48, height: 1, marginBottom: 32,
          background: "linear-gradient(90deg, transparent, #C8A84B88, transparent)",
        }} />

        {/* Bottoni */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <a href="/admin"
            onMouseEnter={() => setHovAdmin(true)}
            onMouseLeave={() => setHovAdmin(false)}
            style={{
              background: hovAdmin ? "#6E1414" : "#8B1A1A",
              color: "#fff",
              padding: "12px 28px",
              textDecoration: "none",
              fontSize: "0.78rem", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              border: "2px solid #8B1A1A",
              transition: "background 0.2s",
              display: "inline-block",
            }}
          >
            Pannello Admin
          </a>
        </div>

        {/* Info path per dev removed */}
      </div>

      {/* Footer */}
      <div style={{
        position: "absolute", bottom: 22, left: 0, right: 0,
        textAlign: "center", zIndex: 2,
      }}>
        <p style={{ fontSize: "0.6rem", color: "#5A4E38", letterSpacing: "0.06em", margin: 0 }}>
          © 2026 Fondazione Giovanni Paolo II — Ente del Terzo Settore
        </p>
      </div>

      {/* Striscia ambra in fondo */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, #C8A84B44, transparent)",
      }} />

    </main>
  );
}
