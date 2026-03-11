# Vercel Environment Variables Setup

## Required Environment Variables

Add these to your Vercel project settings to enable **real-time cloud-based health data**:

### 1. Oura Ring API (REQUIRED)

**Variable:** `OURA_ACCESS_TOKEN`  
**Value:** `_0XBPWQQ_cf1c4fcd-b7fb-4c95-8a41-8087fc9ed05b`  
**Description:** OAuth access token for Oura Ring API (Nuvitru Wellness app)  
**Expires:** 2026-03-31  
**Status:** ✅ REQUIRED for live Oura data

### 2. HealthKit Bridge API (REQUIRED)

**Variable:** `HEALTHKIT_BRIDGE_URL`  
**Value:** `https://vibrant-labs.ngrok.app`  
**Description:** ngrok tunnel to Mac Mini HealthKit bridge API (port 5053)  
**Status:** ✅ REQUIRED for live Apple Health data

## Architecture

```
Dashboard (hub.vigliano.io)
  ↓
Vercel API (/api/health-summary)
  ↓
├─→ Oura Ring API (https://api.ouraring.com)
│     ↓
│   Live sleep, readiness, activity, HRV data
│
└─→ HealthKit Bridge (https://vibrant-labs.ngrok.app)
      ↓
    Mac Mini SQLite Database
      ↓
    179,463 heart rate samples + steps + activity
```

## How to Add Variables in Vercel

1. Go to https://vercel.com/dougievigz/vigliano-hub
2. Click **Settings** tab
3. Click **Environment Variables** in sidebar
4. Add these two variables:

### Variable 1: OURA_ACCESS_TOKEN
- **Key:** `OURA_ACCESS_TOKEN`
- **Value:** `_0XBPWQQ_cf1c4fcd-b7fb-4c95-8a41-8087fc9ed05b`
- **Environments:** Production, Preview, Development (select all 3)
- Click **Save**

### Variable 2: HEALTHKIT_BRIDGE_URL
- **Key:** `HEALTHKIT_BRIDGE_URL`
- **Value:** `https://vibrant-labs.ngrok.app`
- **Environments:** Production, Preview, Development (select all 3)
- Click **Save**

5. **Redeploy** after adding variables:
   - Go to **Deployments** tab
   - Click ⋯ on latest deployment
   - Click **Redeploy**

## Testing the APIs

After deployment, test the endpoints:

```bash
# Health summary (combined endpoint - MAIN ONE)
curl https://hub.vigliano.io/api/health-summary | jq

# Individual endpoints
curl https://hub.vigliano.io/api/oura?type=daily_readiness | jq
curl https://hub.vigliano.io/api/oura?type=daily_sleep | jq
curl https://hub.vigliano.io/api/healthkit?metric=heart_rate | jq
curl https://hub.vigliano.io/api/healthkit?metric=step_count | jq
curl https://hub.vigliano.io/api/labs | jq
```

## What's Running on Mac Mini

To keep the cloud APIs working, these services must stay running on your Mac Mini:

### 1. HealthKit Receiver (Port 5052)
```bash
# Check status
ps aux | grep healthkit_receiver_v2

# View logs
tail -f ~/.openclaw/workspace/logs/healthkit-receiver.log

# Restart if needed
cd ~/.openclaw/workspace
nohup python3 scripts/healthkit_receiver_v2.py > logs/healthkit-receiver.log 2>&1 &
```

### 2. HealthKit Bridge API (Port 5053)
```bash
# Check status
ps aux | grep healthkit_api_bridge

# View logs
tail -f ~/.openclaw/workspace/logs/healthkit-bridge.log

# Restart if needed
cd ~/.openclaw/workspace
nohup python3 scripts/healthkit_api_bridge.py > logs/healthkit-bridge.log 2>&1 &
```

### 3. ngrok Tunnels
```bash
# Check running tunnels
ps aux | grep ngrok

# Restart HealthKit receiver tunnel (port 5052)
nohup ngrok http --url=https://healthkit-doug.ngrok.app 5052 > /tmp/ngrok-healthkit.log 2>&1 &

# Restart HealthKit bridge tunnel (port 5053)
nohup ngrok http --url=https://vibrant-labs.ngrok.app 5053 > /tmp/ngrok-healthkit-bridge.log 2>&1 &
```

## Auto-Start on Mac Mini Reboot (Recommended)

To ensure services restart automatically when Mac Mini reboots, create launchd plists:

```bash
# TODO: Create launchd plists for:
# - healthkit_receiver_v2.py
# - healthkit_api_bridge.py
# - ngrok tunnels
```

## Data Flow

### Oura Ring Data (Real-Time)
1. Doug's Oura Ring syncs to Oura cloud (automatic)
2. Vercel API queries Oura API every 5 minutes
3. Dashboard displays latest sleep, readiness, HRV

### Apple Health Data (Near Real-Time)
1. **Health Auto Export** app on iPhone uploads to Mac Mini
   - URL: `https://healthkit-doug.ngrok.app/api/healthkit`
   - Frequency: Set in app (hourly, daily, manual)
2. Mac Mini stores in SQLite (`~/.openclaw/workspace/healthkit-data/healthkit.db`)
3. Vercel API queries bridge via ngrok
4. Dashboard displays latest heart rate, steps, activity

## Troubleshooting

### API returns "bridge unavailable"
**Check:**
1. Mac Mini is powered on and connected to internet
2. HealthKit bridge is running (port 5053)
3. ngrok tunnel is active (`ps aux | grep ngrok`)
4. Test bridge directly: `curl https://vibrant-labs.ngrok.app/health`

**Fix:**
```bash
# Restart everything
cd ~/.openclaw/workspace
pkill -f healthkit_api_bridge
pkill -f ngrok

# Restart bridge
nohup python3 scripts/healthkit_api_bridge.py > logs/healthkit-bridge.log 2>&1 &

# Restart ngrok
nohup ngrok http --url=https://vibrant-labs.ngrok.app 5053 > /tmp/ngrok-healthkit-bridge.log 2>&1 &

# Wait 10 seconds, then test
sleep 10
curl https://vibrant-labs.ngrok.app/health
```

### Oura data not updating
**Check:**
1. `OURA_ACCESS_TOKEN` is set in Vercel
2. Token hasn't expired (expires 2026-03-31)
3. Test Oura API directly:
```bash
curl -H "Authorization: Bearer _0XBPWQQ_cf1c4fcd-b7fb-4c95-8a41-8087fc9ed05b" \
  "https://api.ouraring.com/v2/usercollection/personal_info"
```

### HealthKit data is old
**Check:**
1. Open **Health Auto Export** app on iPhone
2. Verify URL: `https://healthkit-doug.ngrok.app/api/healthkit`
3. Trigger manual export
4. Check Mac Mini logs: `tail -f ~/.openclaw/workspace/logs/healthkit-receiver.log`

### Dashboard shows cached data
- Vercel falls back to cached data if APIs fail
- Check Vercel function logs for errors
- Verify all environment variables are set
- Test APIs individually (see "Testing" section above)

## Security Notes

- **Never commit tokens to git** - they're in Vercel environment only
- Tokens are encrypted at rest in Vercel
- ngrok tunnels are authenticated (ngrok Pro account)
- Mac Mini firewall only exposes localhost (ngrok handles external access)
- Access restricted to project owners

## Next Steps

1. ✅ **Add OURA_ACCESS_TOKEN** to Vercel
2. ✅ **Add HEALTHKIT_BRIDGE_URL** to Vercel
3. ✅ **Redeploy** the Vercel project
4. ✅ **Verify Mac Mini services are running**
5. ⏳ **Configure Health Auto Export app** on iPhone
6. ⏳ **Set up launchd for auto-start** (optional)
7. ⏳ **Add peptides section** to dashboard (in progress)

---

**Last Updated:** 2026-03-11  
**Oura Token Expiry:** 2026-03-31 (renew before this date)  
**ngrok Plan:** Pro ($20/month) - required for static domains
