# Heroku Deployment Guide

## Prerequisites

1. **Heroku CLI**: https://devcenter.heroku.com/articles/heroku-cli
2. **Heroku account**
3. **Git** configured & remote set
4. **Node 18** (project uses "engines": {"node": "18.x"})

## Step 1: Create Heroku App

```powershell
heroku login
heroku create your-app-name
```

Replace `your-app-name` with a unique app name.

## Step 2: Configure Environment Variables

```powershell
heroku config:set NODE_ENV=production -a your-app-name
# Optional: change SQLite path (file is ephemeral on dyno)
heroku config:set DATABASE_URL=./appointments.db -a your-app-name
```

## Step 3: Deploy to Heroku

```powershell
git push heroku main
```

If your branch is different, use `git push heroku your-branch:main`.

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

**Important**: SQLite (`appointments.db`) lives on the dyno’s ephemeral filesystem — data is lost on restart/redeploy.

For production, use a managed DB:
1. **Heroku Postgres** (recommended)
  ```powershell
  heroku addons:create heroku-postgresql:hobby-dev -a your-app-name
  ```
2. or external (RDS, Atlas, etc.)

## Building with Docker

Alternatively, you can build and push a Docker image:

```powershell
heroku container:login
heroku container:push web -a your-app-name
heroku container:release web -a your-app-name
```

## Useful Links

- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Procfile Reference](https://devcenter.heroku.com/articles/procfile)
- [Heroku Environment Variables](https://devcenter.heroku.com/articles/config-vars)
