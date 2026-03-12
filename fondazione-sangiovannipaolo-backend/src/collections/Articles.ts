import type { CollectionConfig } from 'payload'
import {
    lexicalEditor,
    HTMLConverterFeature,
    lexicalHTML
} from '@payloadcms/richtext-lexical'

export const Articles: CollectionConfig = {
    slug: 'articles',
    labels: {
        singular: 'Articolo',
        plural: 'Articoli',
    },
    admin: {
        useAsTitle: 'title',
    },
    versions: {
        drafts: true, // Attiva le bozze
    },
    access: {
        read: ({ req: { user } }) => {
            if (user) return true;
            return {
                _status: {
                    equals: 'published',
                },
            };
        },
        // Admin e Autori possono creare e modificare bozze
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        // Solo l'admin può eliminare un articolo
        delete: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'dev',
    },
    hooks: {
        beforeChange: [
            ({ data, req }) => {
                // Se l'utente è un autore e prova a pubblicare, lo rimettiamo a "draft" (bozza)
                if (req.user?.role === 'author' && data._status === 'published') {
                    data._status = 'draft'
                }
                if (data.title && !data.slug) {
                    data.slug = data.title
                        .toLowerCase()
                        .replace(/[^\w\s-]/g, '') // Rimuove caratteri speciali
                        .replace(/[\s_-]+/g, '-') // Sostituisce spazi con trattini
                        .replace(/^-+|-+$/g, ''); // Rimuove trattini all'inizio e alla fine
                }
                return data
            },
        ],
    },
    fields: [
        {
            name: 'title',
            label: 'Titolo Articolo',
            type: 'text',
            required: true,
        },
        // CAMPO SLUG (Nascosto nel form se vuoto, autogenerato dall'hook)
        {
            name: 'slug',
            label: 'Slug (URL)',
            type: 'text',
            unique: true,
            admin: {
                position: 'sidebar',
                description: 'Lascia vuoto per autogenerare dal titolo.',
            },
        },
        // CAMPO CATEGORIA
        {
            name: 'categoria',
            label: 'Categoria',
            type: 'select',
            options: ['Progetti', 'Eventi', 'Trasparenza', 'Notizie'],
            required: true,
            admin: {
                position: 'sidebar',
            }
        },
        // CAMPO RIASSUNTO
        {
            name: 'riassunto',
            label: 'Riassunto (per le card)',
            type: 'textarea',
            required: true,
            maxLength: 200, // Limita la lunghezza per evitare che le card esplodano
        },
        {
            name: 'immagineCopertina',
            type: 'upload',
            relationTo: 'media', // Importante: deve corrispondere allo slug della tua collection media
            required: false,
        },
        {
            name: 'content',
            label: 'Contenuto',
            type: 'richText',
            required: true,
            // Configuriamo l'editor per supportare la conversione HTML
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    HTMLConverterFeature({}), // Abilita le regole di conversione in HTML
                ],
            }),
        },
        {
            name: 'galleria',
            label: 'Galleria Fotografica',
            type: 'upload',
            relationTo: 'media',
            hasMany: true,
            admin: {
                description: 'Seleziona più foto contemporaneamente dalla tua libreria media.',
            }
        },
        lexicalHTML('content', { name: 'content_html' }),
    ],
}