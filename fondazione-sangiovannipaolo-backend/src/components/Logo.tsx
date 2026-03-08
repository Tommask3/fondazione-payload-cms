import React from 'react'

export const Logo = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
                src="/logoFondazioneSB.png"
                alt="Logo Fondazione Giovanni Paolo II"
                style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    height: 'auto',
                    objectFit: 'contain'
                }}
            />
        </div>
    )
}