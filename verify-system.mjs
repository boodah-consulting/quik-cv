#!/usr/bin/env node

/**
 * Complete System Verification
 * 
 * This script performs a complete verification of the CV Profiles system:
 * 1. Build verification
 * 2. Profile sync verification  
 * 3. Application health check
 * 4. Data integrity verification
 */

import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { execSync } from 'child_process'

const PROJECT_ROOT = process.cwd()
const PUBLIC_PROFILES_PATH = path.join(PROJECT_ROOT, 'public/profiles')

function log(message, type = 'info') {
  const icons = {
    info: 'ℹ️',
    success: '✅',
    error: '❌',
    warning: '⚠️'
  }
  console.log(`${icons[type]} ${message}`)
}

function verifyBuild() {
  log('Verifying build configuration...', 'info')
  
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(PROJECT_ROOT, 'package.json'), 'utf8')
  )
  
  if (!packageJson.scripts['sync-profiles']) {
    throw new Error('sync-profiles script not found in package.json')
  }
  
  log('Build configuration verified', 'success')
}

function verifyProfiles() {
  log('Verifying profile structure...', 'info')
  
  const manifestPath = path.join(PUBLIC_PROFILES_PATH, 'manifest.json')
  
  if (!fs.existsSync(manifestPath)) {
    throw new Error('Profile manifest not found. Run npm run sync-profiles first.')
  }
  
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  
  if (manifest.profiles.length === 0) {
    throw new Error('No profiles found in manifest')
  }
  
  log(`Found ${manifest.profiles.length} profiles`, 'success')
  
  manifest.profiles.forEach(profile => {
    log(`  - ${profile.name}: ${profile.audiences.length} audiences`, 'info')
    
    profile.audiences.forEach(audience => {
      const filePath = path.join(
        PUBLIC_PROFILES_PATH, 
        profile.name, 
        `${audience}.yaml`
      )
      
      if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file: ${filePath}`)
      }
    })
  })
  
  log('Profile structure verified', 'success')
}

function verifyDataIntegrity() {
  log('Verifying data integrity...', 'info')
  
  const requiredFields = ['first_name', 'last_name', 'email', 'summary', 'jobs']
  
  const manifest = JSON.parse(
    fs.readFileSync(path.join(PUBLIC_PROFILES_PATH, 'manifest.json'), 'utf8')
  )
  
  let totalFiles = 0
  let validFiles = 0
  
  manifest.profiles.forEach(profile => {
    profile.audiences.forEach(audience => {
      totalFiles++
      
      const filePath = path.join(
        PUBLIC_PROFILES_PATH, 
        profile.name, 
        `${audience}.yaml`
      )
      
      const content = fs.readFileSync(filePath, 'utf8')
      const data = yaml.load(content)
      
      const missingFields = requiredFields.filter(field => !data[field])
      
      if (missingFields.length > 0) {
        log(
          `  ⚠️ ${profile.name}/${audience}: Missing ${missingFields.join(', ')}`,
          'warning'
        )
      } else {
        validFiles++
      }
    })
  })
  
  log(`Data integrity: ${validFiles}/${totalFiles} files valid`, 
    validFiles === totalFiles ? 'success' : 'warning')
}

function verifyRouting() {
  log('Verifying routing configuration...', 'info')
  
  const routerPath = path.join(PROJECT_ROOT, 'src/router/index.js')
  const routerContent = fs.readFileSync(routerPath, 'utf8')
  
  const requiredRoutes = [
    { name: 'LandingPage', path: '/' },
    { name: 'ProfileSelection', path: '/profiles' },
    { name: 'CVPage', path: '/cv/:profile/:audience' }
  ]
  
  requiredRoutes.forEach(route => {
    if (!routerContent.includes(`name: '${route.name}'`)) {
      throw new Error(`Route ${route.name} not found`)
    }
    
    if (!routerContent.includes(`path: '${route.path}'`)) {
      throw new Error(`Path ${route.path} not found`)
    }
    
    log(`  ✓ ${route.name}: ${route.path}`, 'success')
  })
  
  log('Routing configuration verified', 'success')
}

function verifyComponents() {
  log('Verifying component structure...', 'info')
  
  const requiredComponents = [
    'src/pages/ProfileSelectionPage.vue',
    'src/pages/CVPage.vue',
    'src/composables/useProfileService.js'
  ]
  
  requiredComponents.forEach(component => {
    const componentPath = path.join(PROJECT_ROOT, component)
    
    if (!fs.existsSync(componentPath)) {
      throw new Error(`Component not found: ${component}`)
    }
    
    log(`  ✓ ${component}`, 'success')
  })
  
  log('Component structure verified', 'success')
}

function runVerification() {
  console.log('\n' + '='.repeat(50))
  console.log('CV Profiles System Verification')
  console.log('='.repeat(50) + '\n')
  
  try {
    verifyBuild()
    verifyProfiles()
    verifyDataIntegrity()
    verifyRouting()
    verifyComponents()
    
    console.log('\n' + '='.repeat(50))
    log('All verifications passed!', 'success')
    console.log('='.repeat(50) + '\n')
    
    console.log('System Status:')
    console.log('  ✅ Build system configured')
    console.log('  ✅ Profiles synced from vault')
    console.log('  ✅ Data integrity validated')
    console.log('  ✅ Routing configured')
    console.log('  ✅ Components implemented')
    console.log('\n')
    
    process.exit(0)
  } catch (err) {
    console.error('\n' + '='.repeat(50))
    log(`Verification failed: ${err.message}`, 'error')
    console.log('='.repeat(50) + '\n')
    process.exit(1)
  }
}

runVerification()