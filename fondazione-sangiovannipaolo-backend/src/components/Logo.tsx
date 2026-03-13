'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

export const Logo = () => {
    const pathname = usePathname()

    // Pagine auth dove mostrare il logo completo con titolo e decorazioni
    const isAuthPage =
        pathname === '/admin/login' ||
        pathname === '/admin/forgot' ||
        pathname?.startsWith('/admin/reset')

    // Nella dashboard: solo l'immagine piccola senza decorazioni
    if (!isAuthPage) {
        return (
            <div className="custom-login-logo" style={{ textAlign: 'left' }}>
                <img
                    src="/logoFondazioneSB.png"
                    alt="Logo Fondazione Giovanni Paolo II"
                    width={40}
                    height={40}
                    style={{ objectFit: 'contain' }}
                />
            </div>
        )
    }

    // Nelle pagine auth: logo completo con cerchi, titolo e "Area Amministrativa"
    return (
        <div className="custom-login-logo" style={{ marginBottom: 32, textAlign: 'center' }}>
            <div style={{
                width: 150, height: 150, margin: "0 auto",
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
                    <img
                        src="/logoFondazioneSB.png"
                        alt="Logo Fondazione Giovanni Paolo II"
                        width={100}
                        height={100}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            </div>

            <h2 style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "2rem",
                fontWeight: 400, marginTop: 28, marginBottom: 0,
                background: "linear-gradient(135deg, #F5EDD8 30%, #C8A84B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.01em",
            }}>
                Fondazione<br />Giovanni Paolo II
            </h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 16 }}>
                <div style={{ width: 32, height: 1, background: "#C8A84B66" }} />
                <p style={{
                    fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase",
                    color: "#C8A84B", fontWeight: 700, margin: 0,
                }}>
                    Area Amministrativa
                </p>
                <div style={{ width: 32, height: 1, background: "#C8A84B66" }} />
            </div>
        </div>
    )
}