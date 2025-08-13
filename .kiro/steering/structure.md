# Project Structure & Organization

## Root Directory Structure
```
├── src/                    # Main application source code
├── netlify/functions/      # Netlify serverless functions
├── supabase/              # Supabase configuration and migrations
├── public/                # Static assets
├── .kiro/                 # Kiro AI assistant configuration
└── dist/                  # Build output (generated)
```

## Source Code Organization (`src/`)
```
src/
├── components/            # React components (UI layer)
├── lib/                   # Utility libraries and API clients
├── store/                 # Zustand state management
├── server/                # Server-side utilities
├── App.tsx               # Main application component
├── main.tsx              # Application entry point
└── index.css             # Global styles
```

## Component Architecture
- **Functional Components**: All components use React functional components with hooks
- **TypeScript**: Strict typing for all components and props
- **Single Responsibility**: Each component handles one specific UI concern
- **Composition**: Components are composed together in App.tsx

## Key Components
- `CartifyAssistant` - Main AI chat interface
- `FloatingCartifyButton` - Floating action button for AI access
- `ProductGrid` & `ProductCard` - Product display components
- `Header` & `HeroBanner` - Layout and branding components
- `AuthModal` & `CartModal` - Modal dialogs
- `CheckoutPage` - Checkout flow component

## State Management Pattern
- **Zustand Store**: Single global store in `src/store/useStore.ts`
- **Centralized State**: All application state managed through one store
- **Reactive Updates**: Components subscribe to relevant store slices

## API Integration Pattern
- **Lib Directory**: API clients in `src/lib/` (supabase.ts, serpapi.ts)
- **Netlify Functions**: Serverless endpoints in `netlify/functions/`
- **Environment Variables**: All API keys prefixed with `VITE_` for frontend access

## File Naming Conventions
- **Components**: PascalCase (e.g., `CartifyAssistant.tsx`)
- **Utilities**: camelCase (e.g., `supabase.ts`)
- **Types**: Defined inline or in component files
- **Constants**: UPPER_SNAKE_CASE when applicable

## Styling Approach
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Theme**: Walmart brand colors defined in `tailwind.config.js`
- **Component-Level**: Styles defined directly in JSX className attributes
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints