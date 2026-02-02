# CV Profiles - Clean Implementation

## Overview
A clean, minimal CV profile system that reads YAML files directly from your vault and generates CVs on demand.

## Architecture

### Components
- **Profile API Server** (`server/profile-api.js`) - Reads YAML files from vault and serves JSON
- **Profile Service** (`src/composables/useProfileService.js`) - Vue composable for profile management
- **Profile Selection Page** (`src/pages/ProfileSelectionPage.vue`) - Clean, minimal profile browser
- **CV Page** (`src/pages/CVPage.vue`) - Dynamic CV renderer using existing components

## Setup

### Start Development Server
```bash
npm run serve
```

This starts:
- Profile API server on port 3001
- Vue dev server on port 8080

### Production Build
```bash
npm run build
```

## Usage

### Access Application
1. Open http://localhost:8080
2. Click "Select Profile" or navigate to /profiles
3. Choose a profile (e.g., "Ai Startup Fullstack")
4. Select an audience type (e.g., "Recruiter")
5. View the formatted CV

### Vault Structure
Place CV profiles in: `~/vaults/baphled/assets/quik-cv/`

Each profile should be a directory containing audience YAML files:
```
quik-cv/
├── ai-startup-fullstack/
│   ├── recruiter.yaml
│   ├── hiring-manager.yaml
│   ├── engineering-manager.yaml
│   └── technical-peer.yaml
└── comprehensive-detailed/
    ├── recruiter.yaml
    ├── hiring-manager.yaml
    ├── engineering-manager.yaml
    └── technical-peer.yaml
```

## API Endpoints

### GET /api/profiles
Returns list of available profiles and audiences.

### GET /api/profiles/:profile/:audience
Returns CV data as JSON for the specified profile and audience.

## Features

### Clean UI
- Minimal, focused profile selection
- No unnecessary visual clutter
- Consistent with existing application branding
- Smooth transitions and interactions

### On-Demand Generation
- YAML files read dynamically from vault
- No sync step required
- Always uses latest data
- No intermediate file storage

### Performance
- Lightweight API server
- Minimal bundle size increase
- Efficient JSON response
- Vue proxy for development

## Environment Variables

- `VUE_APP_API_URL` - Profile API URL (default: `/api`)
- `API_PORT` - API server port (default: `3001`)

## Files

### Server
- `server/profile-api.js` - Express server for YAML→JSON conversion

### Vue Components
- `src/composables/useProfileService.js` - Profile management logic
- `src/pages/ProfileSelectionPage.vue` - Profile browser
- `src/pages/CVPage.vue` - CV renderer

### Configuration
- `vue.config.js` - Dev server proxy configuration
- `package.json` - Scripts and dependencies