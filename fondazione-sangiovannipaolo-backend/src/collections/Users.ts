import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Utente',
    plural: 'Utenti',
  },
  admin: {
    useAsTitle: 'username',
  },
  auth: {
    loginWithUsername: {
      allowEmailLogin: false,
      requireEmail: false,
      requireUsername: true,
    },
  },
  // 1. CONTROLLO A LIVELLO DI COLLEZIONE
  access: {
    read: () => true,
    // Solo Dev e Admin possono creare nuovi utenti
    create: ({ req: { user } }) => user?.role === 'dev' || user?.role === 'admin',

    // Tutti possono modificare il proprio profilo, ma nessuno può modificare un dev (tranne i dev stessi)
    update: ({ req: { user } }) => {
      // Un utente non autenticato non può modificare nulla
      if (!user) return false;

      // Il Dev può modificare tutto
      if (user.role === 'dev') return true;

      // L'Admin può modificare chiunque, MA non i Dev
      if (user.role === 'admin') {
        const query: any = { role: { not_equals: 'dev' } };
        return query;
      }

      // Gli altri ruoli (es. autori) possono modificare solo se stessi
      const query: any = { id: { equals: user.id } };
      return query;
    },

    // Il Dev può eliminare tutti tranne se stesso.
    // L'Admin può eliminare gli altri, ma NON i Dev, e nemmeno se stesso.
    delete: ({ req: { user } }) => {
      if (!user) return false;

      if (user.role === 'dev') {
        const query: any = { id: { not_equals: user.id } };
        return query;
      }

      if (user.role === 'admin') {
        const query: any = {
          and: [
            { role: { not_equals: 'dev' } },
            { id: { not_equals: user.id } },
          ],
        };
        return query;
      }

      return false;
    },
  },

  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Sviluppatore (Dev)', value: 'dev' },
        { label: 'Amministratore', value: 'admin' },
        { label: 'Autore', value: 'author' },
      ],
      required: true,
      defaultValue: 'author', // Chi viene creato è autore di default
      saveToJWT: true,

      // 2. CONTROLLO A LIVELLO DI SINGOLO CAMPO (La magia avviene qui)
      access: {
        update: ({ req: { user }, id, doc }) => {
          // Il Dev è un dio, può fare quello che vuole
          if (user?.role === 'dev' && user?.id !== id) return true

          // Nessuno (tranne il Dev) può modificare o declassare un utente che è 'dev'
          // doc rappresenta l'utente che stiamo cercando di modificare, 
          // quindi se il suo ruolo attuale è 'dev', blocchiamo.
          if (doc?.role === 'dev') return false

          // L'Admin può cambiare il ruolo degli ALTRI (es. promuovere un autore),
          // ma NON può toccare il proprio ruolo (evitiamo che si declassi per sbaglio)
          if (user?.role === 'admin' && user?.id !== id) return true

          // Per tutti gli altri (autori, o admin che guardano il proprio profilo), il campo è bloccato
          return false
        },
      },
    },
  ],
}
