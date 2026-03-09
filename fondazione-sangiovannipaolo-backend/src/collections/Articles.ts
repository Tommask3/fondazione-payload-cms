import type { CollectionConfig } from 'payload'

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
        // Chiunque può leggere i post pubblicati (Astro li leggerà così)
        read: () => true,
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
        {
            name: 'immagineCopertina',
            type: 'upload',
            relationTo: 'media', // Importante: deve corrispondere allo slug della tua collection media
            required: true,      // Mettilo a true se vuoi obbligare l'utente a inserire sempre una copertina
        },
        {
            name: 'content',
            label: 'Contenuto',
            type: 'richText',
            required: true,
        },
    ],
}