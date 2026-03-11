/**
 * Vercel Serverless Function: Query HealthKit Data (Cloud-Based)
 * 
 * Queries the Mac Mini HealthKit bridge API via ngrok
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { metric = 'heart_rate', days = 7 } = req.query;

  // Bridge URL (ngrok tunnel to Mac Mini)
  const bridgeUrl = process.env.HEALTHKIT_BRIDGE_URL || 'https://vibrant-labs.ngrok.app';

  try {
    const response = await fetch(`${bridgeUrl}/healthkit?metric=${metric}&days=${days}`);

    if (!response.ok) {
      throw new Error(`Bridge error: ${response.status}`);
    }

    const data = await response.json();

    return res.status(200).json({
      success: true,
      cached: false,
      metric,
      bridge: 'live',
      data
    });

  } catch (error) {
    console.error('HealthKit bridge error:', error);
    
    // Return error but don't crash
    return res.status(200).json({
      success: false,
      cached: true,
      error: error.message,
      message: 'Bridge unavailable - check if Mac Mini is running',
      // Fallback sample data
      data: getSampleData(metric)
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
    step_count: {
      today: 8245,
      average: 8500,
      total_steps: 59500,
      last_updated: new Date().toISOString()
    }
  };

  return data[metric] || { message: 'Metric not found' };
}
