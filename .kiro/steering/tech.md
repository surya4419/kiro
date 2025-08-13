# Technology Stack & Build System

## Frontend Stack
- **React 18** with TypeScript for UI components
- **Vite** as the build tool and dev server
- **Tailwind CSS** for styling with custom Walmart brand colors
- **React Router DOM** for client-side routing
- **Zustand** for state management
- **Lucide React** for icons

## Backend & Services
- **Supabase** for database, authentication, and edge functions
- **Netlify Functions** for serverless API endpoints
- **SerpAPI** for real-time Walmart product data
- **Groq API** with Llama model for AI conversations
- **ElevenLabs API** for voice synthesis
- **xAI** for additional AI capabilities

## Development Tools
- **TypeScript** with strict mode enabled
- **ESLint** with React hooks and TypeScript rules
- **PostCSS** with Autoprefixer
- **ES2020** target for modern JavaScript features

## Common Commands

### Development
```bash
npm run dev          # Start Vite dev server
netlify dev          # Start Netlify dev environment (recommended)
```

### Building & Deployment
```bash
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint checks
```

### Environment Setup
```bash
npm install          # Install dependencies
```

## Environment Variables Required
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SERPAPI_KEY` - SerpAPI key for product data
- `GROQ_API_KEY` - Groq API key for AI
- `ELEVENLABS_API_KEY` - ElevenLabs API key for voice

## Deployment
- **Primary**: Netlify with automatic builds from git
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Functions Directory**: `netlify/functions`