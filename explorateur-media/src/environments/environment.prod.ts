export const environment = {
  production: true,
  // Backend API URL - configured automatically during GitHub Actions build
  // To use a backend, set BACKEND_API_URL in .github/workflows/deploy-pages.yml
  // Example: https://your-backend.railway.app or https://your-backend.fly.io
  // Leave empty to run without backend (server-info component will show as DOWN)
  apiUrl: ''
};
