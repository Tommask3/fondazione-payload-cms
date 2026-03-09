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
    ],
    upload: {
        mimeTypes: ['application/pdf'],
    },
}
