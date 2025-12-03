# Heroku Deployment Guide

## Prerequisites

1. **Heroku CLI** installed: https://devcenter.heroku.com/articles/heroku-cli
2. **Heroku account**: https://www.heroku.com
3. **Git** installed and configured
4. Your repository set up with remote origin

## Step 1: Create Heroku App

```powershell
heroku login
heroku create your-app-name
```

Replace `your-app-name` with your desired app name (must be unique across Heroku).

## Step 2: Configure Environment Variables

```powershell
heroku config:set NODE_ENV=production -a your-app-name
heroku config:set API_URL=https://your-app-name.herokuapp.com -a your-app-name
```

Optional: Set custom database path
```powershell
heroku config:set DATABASE_URL=./appointments.db -a your-app-name
```

## Step 3: Deploy to Heroku

```powershell
git push heroku main
```

If your branch is named differently, use:
```powershell
git push heroku your-branch-name:main
```

## Step 4: View Logs

```powershell
heroku logs --tail -a your-app-name
```

## Step 5: Access Your App

Your app will be available at: `https://your-app-name.herokuapp.com`

## Troubleshooting

### Check deployment status
```powershell
heroku logs -a your-app-name
```

### Restart dyno
```powershell
heroku restart -a your-app-name
```

### View environment variables
```powershell
heroku config -a your-app-name
```

### Scale dynos (if needed)
```powershell
heroku ps:scale web=1 -a your-app-name
```

## Database Persistence

**Important**: SQLite database (`appointments.db`) is stored on the dyno's ephemeral filesystem. Data will be lost when the dyno restarts.

**For production use**, consider:
1. **Heroku Postgres Add-on**: Add PostgreSQL database
   ```powershell
   heroku addons:create heroku-postgresql:hobby-dev -a your-app-name
   ```

2. **AWS RDS**: Use Amazon RDS for better persistence

3. **MongoDB Atlas**: Use cloud MongoDB

## Building with Docker

Alternatively, you can build and push a Docker image:

```powershell
heroku container:login
heroku container:push web -a your-app-name
heroku container:release web -a your-app-name
```

## Setting Up CI/CD (GitHub Actions)

Create `.github/workflows/heroku-deploy.yml`:

```yaml
name: Deploy to Heroku

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: akhileshns/heroku-deploy@v3.14.0
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "your-app-name"
          heroku_email: "your-email@example.com"
```

Add secrets to GitHub:
1. Go to Settings → Secrets and variables → Actions
2. Add `HEROKU_API_KEY` from: `heroku auth:token`

## Useful Links

- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Procfile Reference](https://devcenter.heroku.com/articles/procfile)
- [Heroku Environment Variables](https://devcenter.heroku.com/articles/config-vars)
