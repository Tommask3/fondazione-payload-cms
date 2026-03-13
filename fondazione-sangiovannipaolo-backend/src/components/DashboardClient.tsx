'use client'

import React, { useState } from 'react'
import Link from 'next/link'

/* ── PALETTE ──────────────────────────────────────────────────────────────── */
const C = {
  pageBg: '#1E1A12',
  cardBg: '#2D2820',
  cardHov: '#3A342A',

  accent: '#8B1A1A',
  accentGlow: '#8B1A1A33',
  gold: '#D4B65C',
  goldDim: '#B08A30',
  goldGlow: '#C8A84B22',

  textPrimary: '#F5F0E0',
  textSecondary: '#B8A890',
  textDim: '#7A6E58',

  border: '#3E3628',
  borderGold: '#C8A84B44',
  borderAccent: '#8B1A1A55',

  success: '#5CA870',
  successBg: '#1E3526',
  warning: '#D09030',
  warningBg: '#342818',
}

/* ── TYPES ────────────────────────────────────────────────────────────────── */
interface CollectionInfo {
  name: string
  slug: string
  count: number
  icon: string
  desc: string
  color: string
  glow: string
  border: string
}

interface RecentArticle {
  id: string
  title: string
  categoria?: string
  updatedAt: string
  _status?: string
}

interface DashboardClientProps {
  collections: CollectionInfo[]
  recentArticles: RecentArticle[]
  userName?: string
}

/* ── TIMESTAMP RELATIVO ───────────────────────────────────────────────────── */
function timeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffH = Math.floor(diffMin / 60)
  const diffD = Math.floor(diffH / 24)

  if (diffMin < 1) return 'adesso'
  if (diffMin < 60) return `${diffMin}min fa`
  if (diffH < 24) return `${diffH}h fa`
  if (diffD === 1) return 'ieri'
  if (diffD < 7) return `${diffD} gg fa`
  if (diffD < 30) return `${Math.floor(diffD / 7)} sett fa`
  return `${Math.floor(diffD / 30)} mesi fa`
}

/* ── COLLECTION CARD ─────────────────────────────────────────────────────── */
function CollectionCard({ name, slug, count, icon, desc, color, glow, border }: CollectionInfo) {
  const [hov, setHov] = useState(false)

  return (
    <a
      href={`/admin/collections/${slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        background: hov ? C.cardHov : C.cardBg,
        border: `1px solid ${hov ? border : C.border}`,
        borderRadius: 8,
        padding: '24px 22px 20px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transform: hov ? 'translateY(-3px)' : 'none',
        transition: 'all 0.25s ease',
        boxShadow: hov
          ? `0 8px 28px rgba(0,0,0,0.5), 0 0 0 1px ${border}`
          : '0 2px 8px rgba(0,0,0,0.2)',
      }}
    >
      {/* Glow in alto a destra */}
      <div
        style={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
          opacity: hov ? 1 : 0,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
        }}
      />

      {/* Barra colorata in cima */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${color}, transparent)`,
          opacity: hov ? 1 : 0.3,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Header con icona e + */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 8,
            background: `${color}18`,
            border: `1px solid ${color}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            color,
          }}
        >
          {icon}
        </div>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            border: `1px solid ${hov ? border : C.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            color: hov ? color : C.textDim,
            transition: 'color 0.2s, border-color 0.2s',
          }}
        >
          +
        </div>
      </div>

      {/* Numero grande */}
      <div
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: '3rem',
          fontWeight: 700,
          color: C.textPrimary,
          lineHeight: 1,
          marginBottom: 10,
        }}
      >
        {count}
      </div>

      <div style={{ fontSize: '1.2rem', fontWeight: 700, color: C.textPrimary, marginBottom: 6 }}>{name}</div>
      <div style={{ fontSize: '1rem', color: C.textSecondary }}>{desc}</div>
    </a>
  )
}

/* ── ATTIVITÀ RECENTE ─────────────────────────────────────────────────────── */
function ActivityPanel({ articles }: { articles: RecentArticle[] }) {
  return (
    <div
      style={{
        background: C.cardBg,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: `1px solid ${C.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '0.82rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: C.gold,
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            Storico
          </div>
          <h3
            style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              color: C.textPrimary,
              fontFamily: "Georgia, 'Times New Roman', serif",
              margin: 0,
            }}
          >
            Attività Recente
          </h3>
        </div>

        <Link href="/admin/collections/articles/"
          style={{
            fontSize: '0.95rem',
            color: C.textSecondary,
            textDecoration: 'none',
            borderBottom: `1px solid ${C.textDim}`,
            paddingBottom: 1,
          }}
        >
          Vedi tutti
        </Link>
      </div>

      {/* Lista */}
      {articles.length === 0 ? (
        <div style={{ padding: '24px 20px', textAlign: 'center', color: C.textDim, fontSize: '1.05rem' }}>
          Nessuna attività recente
        </div>
      ) : (
        articles.map((a, i) => {
          const statusColor = a._status === 'published' ? C.success : C.warning
          const statusLabel = a._status === 'published' ? 'Pubblicato' : 'Bozza'

          return (
            <a
              key={a.id}
              href={`/admin/collections/articles/${a.id}`}
              style={{
                display: 'flex',
                gap: 14,
                padding: '14px 20px',
                borderBottom: i < articles.length - 1 ? `1px solid ${C.border}` : 'none',
                alignItems: 'flex-start',
                textDecoration: 'none',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.cardHov)}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {/* Icona */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: `${C.accent}18`,
                  border: `1px solid ${C.accent}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  color: C.accent,
                }}
              >
                ✦
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: C.textPrimary,
                    marginBottom: 4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {a.title}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {a.categoria && (
                    <span style={{ fontSize: '0.88rem', color: C.textSecondary }}>{a.categoria}</span>
                  )}
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: 3,
                      background: a._status === 'published' ? C.successBg : C.warningBg,
                      color: statusColor,
                      border: `1px solid ${statusColor}44`,
                    }}
                  >
                    {statusLabel}
                  </span>
                </div>
              </div>

              {/* Time */}
              <div style={{ fontSize: '0.88rem', color: C.textDim, flexShrink: 0, marginTop: 3 }}>
                {timeAgo(a.updatedAt)}
              </div>
            </a>
          )
        })
      )}
    </div>
  )
}

/* ── STATO DEL SITO ──────────────────────────────────────────────────────── */
function SiteStatus() {
  const items = [
    { label: 'Sito pubblico', ok: true },
    { label: 'SSL attivo', ok: true },
    { label: 'CMS operativo', ok: true },
  ]

  return (
    <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <div
          style={{
            fontSize: '0.82rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: C.gold,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          Sistema
        </div>
        <h3
          style={{
            fontSize: '1.3rem',
            fontWeight: 700,
            color: C.textPrimary,
            fontFamily: "Georgia, 'Times New Roman', serif",
            margin: 0,
          }}
        >
          Stato del Sito
        </h3>
      </div>
      <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((it, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 12px',
              background: '#252018',
              borderRadius: 4,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: it.ok ? C.success : C.warning,
                  boxShadow: `0 0 8px ${it.ok ? C.success : C.warning}`,
                }}
              />
              <span style={{ fontSize: '1rem', color: C.textSecondary }}>{it.label}</span>
            </div>
            <span
              style={{
                fontSize: '0.82rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                padding: '2px 8px',
                borderRadius: 3,
                background: it.ok ? C.successBg : C.warningBg,
                color: it.ok ? C.success : C.warning,
                border: `1px solid ${it.ok ? C.success + '44' : C.warning + '44'}`,
              }}
            >
              {it.ok ? 'OK' : 'ATTESA'}
            </span>
          </div>
        ))}
      </div>

      {/* Link sito pubblico */}
      <div style={{ padding: '0 20px 16px' }}>
        <a
          href="https://fondazionesangiovannipaolo.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            padding: '10px',
            borderRadius: 4,
            border: `1px solid ${C.borderGold}`,
            fontSize: '0.95rem',
            fontWeight: 700,
            color: C.gold,
            textDecoration: 'none',
            letterSpacing: '0.06em',
            transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = C.goldGlow)}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <span>↗</span> Visualizza sito pubblico
        </a>
      </div>
    </div>
  )
}

/* ── ROOT COMPONENT ───────────────────────────────────────────────────────── */
export function DashboardClient({ collections, recentArticles, userName }: DashboardClientProps) {
  return (
    <div style={{ padding: '8px 0', fontFamily: "'Palatino Linotype', Georgia, serif" }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 20, height: 1.5, background: C.gold }} />
            <span
              style={{
                fontSize: '0.85rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: C.gold,
                fontWeight: 700,
              }}
            >
              Panoramica
            </span>
          </div>
          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: '2rem',
              fontWeight: 400,
              color: C.textPrimary,
              margin: 0,
            }}
          >
            Benvenuto{userName ? `, ${userName}` : ''}
          </h1>
        </div>
        <div style={{ fontSize: '1rem', color: C.textDim }}>
          {new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* Collection Cards Grid */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2
            style={{
              fontSize: '0.95rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: C.textDim,
              fontWeight: 700,
              margin: 0,
            }}
          >
            Collections
          </h2>
          <span style={{ fontSize: '0.95rem', color: C.textDim }}>
            {collections.length} collezioni
          </span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
          }}
        >
          {collections.map((col) => (
            <CollectionCard key={col.slug} {...col} />
          ))}
        </div>
      </div>

      {/* Bottom row: Attività + Status */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: 18,
        }}
      >
        <ActivityPanel articles={recentArticles} />
        <SiteStatus />
      </div>
    </div>
  )
}
