module.exports = {
  settings: {
    "vetur.useWorkspaceDependencies": true,
    "vetur.experimental.templateInterpolationService": true,
    "vetur.validation.interpolation": false,
    "vetur.validation.templateProps": true
  },
  projects: [
    {
      root: './', // Root of your project
      package: './package.json', // Path to package.json
      globalComponents: [
        './src/components/**/*.vue', // Glob pattern for global components
        "./src/views/**/*.vue"
      ]
    }
  ]
}
