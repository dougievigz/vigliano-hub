/**
 * Vercel Serverless Function: Fetch Oura Ring Data
 * 
 * Endpoints:
 * - /api/oura?type=daily_sleep
 * - /api/oura?type=daily_activity
 * - /api/oura?type=daily_readiness
 * - /api/oura?type=personal_info
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { type = 'daily_readiness' } = req.query;

  // Get Oura credentials from environment variables
  const clientId = process.env.OURA_CLIENT_ID;
  const clientSecret = process.env.OURA_CLIENT_SECRET;
  const accessToken = process.env.OURA_ACCESS_TOKEN;

  if (!accessToken) {
    return res.status(500).json({
      error: 'Oura API credentials not configured',
      message: 'Set OURA_ACCESS_TOKEN in Vercel environment variables'
    });
  }

  // Calculate date range (last 7 days)
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  try {
    // Fetch from Oura API
    const url = `https://api.ouraring.com/v2/usercollection/${type}?start_date=${startDate}&end_date=${endDate}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Oura API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Get latest data point
    const latest = data.data && data.data.length > 0 
      ? data.data[data.data.length - 1] 
      : null;

    return res.status(200).json({
      success: true,
      type,
      latest,
      history: data.data,
      count: data.data ? data.data.length : 0,
      date_range: { start: startDate, end: endDate }
    });

  } catch (error) {
    console.error('Oura API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      type
    });
  }
}
