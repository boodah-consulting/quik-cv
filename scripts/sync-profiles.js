const fs = require('fs')
const path = require('path')

const VAULT_PATH = process.env.VAULT_PATH || '/home/baphled/vaults/baphled/assets/quik-cv'
const PUBLIC_PROFILES_PATH = path.join(__dirname, '../public/profiles')

const audienceTypes = ['master', 'recruiter', 'hiring-manager', 'engineering-manager', 'technical-peer']

async function syncProfiles() {
  console.log('Syncing profiles from vault...')
  
  try {
    if (!fs.existsSync(VAULT_PATH)) {
      console.error(`Vault path not found: ${VAULT_PATH}`)
      process.exit(1)
    }

    if (fs.existsSync(PUBLIC_PROFILES_PATH)) {
      fs.rmSync(PUBLIC_PROFILES_PATH, { recursive: true, force: true })
    }
    
    fs.mkdirSync(PUBLIC_PROFILES_PATH, { recursive: true })

    const directories = fs.readdirSync(VAULT_PATH, { withFileTypes: true })
    const profileDirs = directories.filter(dirent => 
      dirent.isDirectory() && 
      audienceTypes.some(type => 
        fs.existsSync(path.join(VAULT_PATH, dirent.name, `${type}.yaml`))
      )
    )

    if (profileDirs.length === 0) {
      console.log('No profiles found in vault')
      return
    }

    const profileData = profileDirs.map(dirent => {
      const profilePath = path.join(VAULT_PATH, dirent.name)
      const profilePublicPath = path.join(PUBLIC_PROFILES_PATH, dirent.name)
      
      fs.mkdirSync(profilePublicPath, { recursive: true })

      const audiences = {}
      
      audienceTypes.forEach(type => {
        const filePath = path.join(profilePath, `${type}.yaml`)
        if (fs.existsSync(filePath)) {
          const fileContent = fs.readFileSync(filePath, 'utf8')
          audiences[type] = fileContent
          fs.writeFileSync(
            path.join(profilePublicPath, `${type}.yaml`), 
            fileContent
          )
        }
      })

      return {
        name: dirent.name,
        audiences: Object.keys(audiences)
      }
    })

    const manifest = {
      profiles: profileData,
      lastUpdated: new Date().toISOString()
    }

    fs.writeFileSync(
      path.join(PUBLIC_PROFILES_PATH, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    )

    console.log(`Successfully synced ${profileData.length} profiles:`)
    profileData.forEach(profile => {
      console.log(`  - ${profile.name}: ${profile.audiences.length} audience types`)
    })
    
  } catch (err) {
    console.error('Error syncing profiles:', err)
    process.exit(1)
  }
}

syncProfiles()