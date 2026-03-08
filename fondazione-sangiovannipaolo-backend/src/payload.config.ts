import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Articles } from './collections/Articles'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- Fondazione Giovanni Paolo II', // Quello che appare sulla linguetta del browser
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/logoFondazioneSB.png',
        },
      ],
    },
    components: {
      graphics: {
        // Diciamo a Payload dove pescare il nostro nuovo componente Logo
        Logo: '@/components/Logo#Logo',
        Icon: '@/components/Logo#Logo', // Puoi usare un'icona più piccola qui se vuoi, per ora usiamo lo stesso
      },
    },
  },
  collections: [Users, Media, Articles],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true, // Deve corrispondere allo slug della tua collezione immagini
      },
      bucket: process.env.S3_BUCKET as string,
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
        },
        forcePathStyle: true, // Obbligatorio per far funzionare Supabase S3!
      },
    }),
  ],
})
