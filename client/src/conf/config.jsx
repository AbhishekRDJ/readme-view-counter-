// src/config.js
export const API_BASE =
    import.meta.env.NODE_ENV === 'production'
        ? 'https://your-backend-domain.com/api'
        : 'http://localhost:4000/api';
