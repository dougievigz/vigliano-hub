# 🏠 Vigliano Hub Dashboard - Deployment Info

**Status:** ✅ LIVE AND PASSWORD PROTECTED

## Access URLs

### Primary Access (via ngrok):
**URL:** https://vigliano-io.ngrok.app
**Password:** `Vigliano2026!`
**Username:** (not required, password only)

### Subdomain (DNS configured):
**URL:** http://hub.vigliano.io
**Status:** DNS configured, points to Mac Mini (70.113.32.73)
**Note:** Currently routing through ngrok (vigliano-io.ngrok.app)

### Local Development:
**URL:** http://localhost:5173
**Note:** No password required for localhost

## Architecture

```
Internet
  ↓
hub.vigliano.io (GoDaddy DNS A record)
  ↓
70.113.32.73 (Mac Mini public IP)
  ↓
vigliano-io.ngrok.app (ngrok static domain)
  ↓
localhost:5173 (Vite dev server)
  ↓
React + Refine + Ant Design Dashboard
```

## Security

### Password Protection:
- **Password:** Vigliano2026!
- **Storage:** macOS Keychain (service: vigliano-dashboard-password)
- **Method:** Session-based (stays logged in during browser session)
- **Location:** Component at `src/components/PasswordProtect.tsx`

### Session Storage:
- Uses `sessionStorage` for auth state
- Clears on browser close
- No cookies, no server-side session

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Admin Framework:** Refine
- **UI Library:** Ant Design
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Dev Server:** Vite (port 5173)
- **Tunnel:** ngrok (vigliano-io.ngrok.app)
- **DNS:** GoDaddy API

## Current Workspaces (11 total)

1. 🏠 **Dashboard** - Overview with quick stats (LIVE)
2. 🧬 **Longevity** - Health tracking, lab results, Oura Ring (FULLY BUILT)
3. 💰 **Finance** - Net worth, accounts, budget (stub)
4. 🏠 **Personal Life** - Calendar, tasks, family (stub)
5. 🌱 **Nuvitru** - Business analytics (stub)
6. 💼 **FraXtional CMO** - Client projects (stub)
7. 🔬 **Vibrant** - Work links (stub)
8. 🦾 **Agentic AI** - AI monitoring (stub)
9. 🔧 **Cron Jobs** - Task scheduler (stub)
10. 🦞 **OpenClaw** - System status (stub)
11. 🔍 **System Health** - Mac Mini health (stub)
12. 📂 **Workspace** - Files & notes (stub)

## Development

### Start Dev Server:
```bash
cd ~/.openclaw/workspace/vigliano-dashboard
npm run dev
```

### Start ngrok Tunnel:
```bash
ngrok http --url=vigliano-io.ngrok.app 5173
```

### Build for Production:
```bash
npm run build
npm run preview  # Test production build
```

## Next Steps

- [ ] Build out Finance dashboard (Monarch integration)
- [ ] Build out Personal Life dashboard (Calendar integration)
- [ ] Connect real Oura Ring API data
- [ ] Add remaining 8 workspaces
- [ ] Optimize for mobile
- [ ] Production deployment (optional: move from ngrok to direct hosting)

## Credentials

All passwords stored in macOS Keychain:
- **vigliano-dashboard-password:** Dashboard access password
- **godaddy-api-key:** DNS management
- **godaddy-api-secret:** DNS management

## DNS Record

```
Type: A
Name: hub
Domain: vigliano.io
Value: 70.113.32.73
TTL: 600 seconds
Status: ✅ Active
```

---

**Created:** 2026-03-05
**Developer:** Rizzbot
**Owner:** Doug Vigliano
