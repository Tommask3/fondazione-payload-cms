import React from 'react'
import { Gutter } from '@payloadcms/ui'
import { DashboardClient } from './DashboardClient'

interface DashboardProps {
  payload: any
  user: any
  [key: string]: any
}

export const Dashboard: React.FC<DashboardProps> = async (props) => {
  const { payload, user } = props

  // Fetch collection counts and recent articles in parallel
  const [articlesCount, documentsCount, mediaCount, usersCount, recentArticlesResult] =
    await Promise.all([
      payload.count({ collection: 'articles' }),
      payload.count({ collection: 'documents' }),
      payload.count({ collection: 'media' }),
      payload.count({ collection: 'users' }),
      payload.find({
        collection: 'articles',
        sort: '-updatedAt',
        limit: 5,
        depth: 0,
      }),
    ])

  const collections = [
    {
      name: 'Articoli',
      slug: 'articles',
      count: articlesCount.totalDocs,
      icon: '✦',
      desc: 'Notizie e comunicati',
      color: '#8B1A1A',
      glow: '#8B1A1A33',
      border: '#8B1A1A44',
    },
    {
      name: 'Documenti PDF',
      slug: 'documents',
      count: documentsCount.totalDocs,
      icon: '❑',
      desc: 'Bilanci e statuti',
      color: '#C8A84B',
      glow: '#C8A84B22',
      border: '#C8A84B44',
    },
    {
      name: 'Immagini',
      slug: 'media',
      count: mediaCount.totalDocs,
      icon: '◫',
      desc: 'Galleria media',
      color: '#5A8C6A',
      glow: '#4A8C5C22',
      border: '#4A8C5C44',
    },
    {
      name: 'Utenti',
      slug: 'users',
      count: usersCount.totalDocs,
      icon: '◎',
      desc: 'Amministratori',
      color: '#6A7AB8',
      glow: '#6A7AB822',
      border: '#6A7AB844',
    },
  ]

  const recentArticles = recentArticlesResult.docs.map((doc: any) => ({
    id: doc.id,
    title: doc.title || 'Senza titolo',
    categoria: doc.categoria,
    updatedAt: doc.updatedAt,
    _status: doc._status,
  }))

  const userName = user?.username || user?.email || undefined

  return (
    <Gutter className="dashboard">
      <DashboardClient
        collections={collections}
        recentArticles={recentArticles}
        userName={typeof userName === 'string' ? userName : undefined}
      />
    </Gutter>
  )
}
