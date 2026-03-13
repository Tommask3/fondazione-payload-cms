import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
    slug: 'documents',
    labels: {
        singular: 'Documento PDF',
        plural: 'Documenti PDF',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: false,
        },
        {
            name: 'categoria',
            label: 'Categoria',
            type: 'select',
            options: ['Bilanci', 'Statuto', 'Trasparenza'],
            required: true,
            admin: {
                position: 'sidebar',
            }
        },
    ],
    upload: {
        mimeTypes: ['application/pdf'],
    },
}
