# CV Profiles Implementation Documentation

## Overview
The CV Profiles feature allows users to maintain multiple CV profiles in their Obsidian vault and automatically sync them to the QuikCV application. Each profile contains audience-specific YAML files that can be viewed based on the selected audience type.

## Architecture

### Directory Structure
```
quik-cv/
├── public/
│   └── profiles/              # Synced profiles from vault
│       ├── manifest.json      # Profile metadata
│       ├── ai-startup-fullstack/
│       │   ├── recruiter.yaml
│       │   ├── hiring-manager.yaml
│       │   ├── engineering-manager.yaml
│       │   └── technical-peer.yaml
│       └── comprehensive-detailed/
│           ├── recruiter.yaml
│           ├── hiring-manager.yaml
│           ├── engineering-manager.yaml
│           └── technical-peer.yaml
├── scripts/
│   └── sync-profiles.js       # Profile sync script
├── src/
│   ├── composables/
│   │   └── useProfileService.js  # Profile service composable
│   ├── pages/
│   │   ├── ProfileSelectionPage.vue  # Profile selection UI
│   │   └── CVPage.vue              # Dynamic CV display
│   └── router/
│       └── index.js           # Dynamic routing configuration
└── tests/
    ├── testProfileService.mjs  # Profile service test
    └── e2e-profile-test.mjs   # End-to-end tests
```

## Profile Structure

### Vault Directory
Each CV profile is stored as a directory in the vault:
```
~/vaults/baphled/assets/quik-cv/
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

### YAML File Structure
Each audience file must contain:
```yaml
---
first_name: Yomi
last_name: Colledge
email: yomi@boodah.net
location: Remote (UK)
phone: +44 7894 987 855
links:
  - label: LinkedIn
    url: https://linkedin.com/in/yomicolledge

summary: |
  **Full Stack Developer**

  Professional summary here...

highlights: |
  - Key highlight 1
  - Key highlight 2

jobs:
  - company: "Company Name"
    position: "Job Title"
    start_date: "Jan 2020"
    end_date: "Present"
    description: |
      Job description with achievements...

projects:
  - name: "Project Name"
    description: |
      Project description...
    url: "https://project-url.com"
    key_achievements:
      - Achievement 1

skills:
  Frontend:
    - JavaScript
    - Vue.js
  Backend:
    - Node.js
    - PostgreSQL
```

## Workflow

### 1. Profile Sync
```bash
# Sync profiles from vault to public directory
npm run sync-profiles

# Or as part of build process
npm run build
```

The sync script:
- Reads directories from vault path
- Validates profile structure
- Copies YAML files to public/profiles/
- Generates manifest.json

### 2. Profile Loading (Browser)
```javascript
// Profile service usage in Vue components
import { useProfileService } from '@/composables/useProfileService'

export default {
  setup() {
    const {
      profiles,
      selectedProfile,
      loading,
      error,
      selectProfile,
      selectAudience
    } = useProfileService()

    // Load profiles on mount (automatic)
    
    // Select a profile
    selectProfile('ai-startup-fullstack')
    
    // Select an audience
    selectAudience('recruiter')
    
    return { profiles, selectedProfile, loading, error }
  }
}
```

### 3. Navigation
Users navigate through:
1. **Home Page** → Click "Select Profile" or use toolbar
2. **Profile Selection** → Choose from available profiles
3. **Audience Selection** → Choose audience type for selected profile
4. **CV Display** → View formatted CV for selected profile/audience

## Routes

### Dynamic Routes
- `/` - Landing page
- `/profiles` - Profile selection page
- `/cv/:profile/:audience` - Dynamic CV page

### Route Examples
- `/cv/ai-startup-fullstack/recruiter`
- `/cv/comprehensive-detailed/hiring-manager`
- `/cv/ai-startup-fullstack/engineering-manager`

## Features

### Profile Management
- ✅ Automatic profile detection from vault
- ✅ Profile validation (required fields)
- ✅ Audience type detection
- ✅ Error handling for missing files
- ✅ Loading states

### User Interface
- ✅ Profile cards with audience chips
- ✅ Audience selector dialog
- ✅ Breadcrumb navigation
- ✅ Dynamic toolbar menu
- ✅ Markdown rendering for content

### Data Validation
- ✅ Required field validation
- ✅ Profile structure validation
- ✅ Audience file validation
- ✅ Error boundaries

## API Endpoints

### GET /profiles/manifest.json
Returns profile metadata:
```json
{
  "profiles": [
    {
      "name": "ai-startup-fullstack",
      "audiences": ["recruiter", "hiring-manager", "engineering-manager", "technical-peer"]
    }
  ],
  "lastUpdated": "2026-02-02T17:06:16.762Z"
}
```

### GET /profiles/{profile}/{audience}.yaml
Returns raw YAML file for specified profile and audience.

## Testing

### Unit Tests
```bash
# Test profile service
node tests/testProfileService.mjs

# Test profile loading
node tests/testProfileLoading.mjs
```

### End-to-End Tests
```bash
# Run E2E tests
TEST_URL=http://localhost:8080 node tests/e2e-profile-test.mjs
```

### Test Coverage
- Profile manifest loading
- Audience file loading
- Data validation
- Route generation
- Profile service structure

## Usage Instructions

### Adding a New Profile
1. Create directory in vault: `~/vaults/baphled/assets/quik-cv/{profile-name}/`
2. Add audience YAML files
3. Run sync: `npm run sync-profiles`
4. Profile automatically appears in selection menu

### Updating Existing Profile
1. Edit YAML files in vault directory
2. Run sync: `npm run sync-profiles`
3. Changes reflected on next page load

### Removing a Profile
1. Remove directory from vault
2. Run sync: `npm run sync-profiles`
3. Profile removed from selection menu

## Configuration

### Environment Variables
None required - all paths configured in scripts/sync-profiles.js

### Sync Script Configuration
```javascript
const VAULT_PATH = '/home/baphled/vaults/baphled/assets/quik-cv'
const audienceTypes = ['recruiter', 'hiring-manager', 'engineering-manager', 'technical-peer']
```

## Error Handling

### Sync Errors
- Missing vault path → Exit with error
- Invalid YAML → Log warning, continue
- Missing required fields → Log warning

### Runtime Errors
- Failed fetch → Show error message
- Invalid profile → Show validation error
- Missing audience → Redirect to profile selection

## Performance Considerations

### Optimizations
- Profiles synced at build time (not runtime)
- Lazy loading of audience files
- Manifest cached after first load
- YAML parsing only when needed

### Bundle Size
- No additional runtime dependencies
- Minimal impact on initial load
- Code splitting for pages

## Security Considerations

### Input Validation
- YAML parsing errors caught
- Required fields validated
- File paths sanitized

### Access Control
- Profiles served from public directory
- No sensitive data exposure
- Read-only file access

## Future Improvements

### Potential Enhancements
- Real-time vault sync (watch for changes)
- Profile versioning
- Profile comparison view
- Export to PDF
- Multiple vault support
- Profile templates
- A/B testing for profiles

### Technical Debt
- Move to TypeScript for better type safety
- Add unit tests with Jest
- Implement proper error boundaries
- Add loading skeletons