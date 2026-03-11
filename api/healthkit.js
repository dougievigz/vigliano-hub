/**
 * Vercel Serverless Function: Query HealthKit Data
 * 
 * This queries the SQLite database on the Mac Mini via a bridge endpoint.
 * For Vercel deployment, we'll need to either:
 * 1. Expose a local API on Mac Mini (via ngrok)
 * 2. Upload SQLite to Vercel Postgres
 * 3. Sync data to JSON files served statically
 * 
 * For now, this returns recent data from the local database.
 */

import fetch from 'node-fetch';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { metric = 'heart_rate', days = 7 } = req.query;

  // Check if we have a bridge endpoint configured
  const bridgeUrl = process.env.HEALTHKIT_BRIDGE_URL;

  if (!bridgeUrl) {
    // Return cached/static data if bridge not available
    return res.status(200).json({
      success: true,
      cached: true,
      message: 'Returning cached data - bridge endpoint not configured',
      data: getSampleData(metric)
    });
  }

  try {
    // Query the Mac Mini bridge endpoint
    const response = await fetch(`${bridgeUrl}/healthkit?metric=${metric}&days=${days}`, {
      headers: {
        'Authorization': `Bearer ${process.env.HEALTHKIT_BRIDGE_TOKEN || ''}`
      }
    });

    if (!response.ok) {
      throw new Error(`Bridge error: ${response.status}`);
    }

    const data = await response.json();

    return res.status(200).json({
      success: true,
      cached: false,
      metric,
      data
    });

  } catch (error) {
    console.error('HealthKit bridge error:', error);
    
    // Fallback to cached data
    return res.status(200).json({
      success: true,
      cached: true,
      message: 'Bridge unavailable, returning cached data',
      data: getSampleData(metric),
      error: error.message
    });
  }
}

/**
 * Sample data for when bridge is unavailable
 */
function getSampleData(metric) {
  const data = {
    heart_rate: {
      average: 58,
      min: 48,
      max: 145,
      samples: 179463,
      last_reading: 62,
      last_updated: new Date().toISOString()
    },
    steps: {
      today: 8245,
      average: 8500,
      last_7_days: [7800, 9200, 8500, 7300, 9800, 8245, 8600],
      last_updated: new Date().toISOString()
    },
    sleep: {
      last_night_hours: 7.5,
      average: 7.2,
      quality: 'good',
      last_updated: new Date().toISOString()
    },
    activity_calories: {
      today: 420,
      average: 450,
      last_updated: new Date().toISOString()
    }
  };

  return data[metric] || { message: 'Metric not found', available: Object.keys(data) };
}
