# Vercel Environment Variables Setup

## Required Environment Variables

Add these to your Vercel project settings to enable live health data:

### 1. Oura Ring API

**Variable:** `OURA_ACCESS_TOKEN`  
**Value:** `_0XBPWQQ_cf1c4fcd-b7fb-4c95-8a41-8087fc9ed05b`  
**Description:** OAuth access token for Oura Ring API (Nuvitru Wellness app)  
**Expires:** 2026-03-31

**Variable:** `OURA_CLIENT_ID`  
**Value:** Get from keychain: `security find-generic-password -s "oura-client-id-nuvitru" -w`  
**Description:** OAuth client ID

**Variable:** `OURA_CLIENT_SECRET`  
**Value:** Get from keychain: `security find-generic-password -s "oura-client-secret-nuvitru" -w`  
**Description:** OAuth client secret

### 2. HealthKit Bridge (Optional - for live HealthKit data)

**Variable:** `HEALTHKIT_BRIDGE_URL`  
**Value:** TBD (will be ngrok URL to Mac Mini SQLite API)  
**Description:** Bridge endpoint to query HealthKit database

**Variable:** `HEALTHKIT_BRIDGE_TOKEN`  
**Value:** TBD (auth token for bridge)  
**Description:** Authentication token for bridge endpoint

## How to Add Variables in Vercel

1. Go to https://vercel.com/dougievigz/vigliano-hub
2. Click **Settings** tab
3. Click **Environment Variables** in sidebar
4. For each variable:
   - Click **Add New**
   - Enter **Key** (e.g., `OURA_ACCESS_TOKEN`)
   - Enter **Value** (the token from above)
   - Select **Production**, **Preview**, **Development** (all environments)
   - Click **Save**
5. **Redeploy** after adding variables:
   - Go to **Deployments** tab
   - Click ⋯ on latest deployment
   - Click **Redeploy**

## Testing the API

After deployment, test the endpoints:

```bash
# Health summary (combined endpoint)
curl https://hub.vigliano.io/api/health-summary

# Individual endpoints
curl https://hub.vigliano.io/api/oura?type=daily_readiness
curl https://hub.vigliano.io/api/oura?type=daily_sleep
curl https://hub.vigliano.io/api/oura?type=daily_activity
curl https://hub.vigliano.io/api/labs
curl https://hub.vigliano.io/api/healthkit?metric=heart_rate
```

## Troubleshooting

### API returns 500 error
- Check Vercel function logs: **Deployments** → Click deployment → **Functions** tab
- Verify environment variables are set correctly
- Check if Oura token is expired (renew if after 2026-03-31)

### Data looks outdated
- Oura API returns last 7 days by default
- HealthKit returns cached data if bridge not configured
- Lab results are static JSON (update manually when new labs available)

### Auto-refresh not working
- Dashboard refreshes every 5 minutes automatically
- Manual refresh button forces immediate update
- Check browser console for JavaScript errors

## Next Steps

1. ✅ **Add OURA_ACCESS_TOKEN** to Vercel
2. ✅ **Redeploy** the Vercel project
3. ⏳ **Build HealthKit bridge** (optional, for live Apple Health data)
4. ⏳ **Set up webhook** for real-time Oura updates (optional)

## Security Notes

- **Never commit tokens to git** - they're in Vercel environment only
- Tokens are encrypted at rest in Vercel
- Access restricted to project owners
- Rotate tokens if compromised

---

**Last Updated:** 2026-03-11  
**Token Expiry:** 2026-03-31 (renew before this date)
