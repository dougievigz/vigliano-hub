/**
 * Vercel Serverless Function: Serve Lab Results
 * 
 * Returns lab results from JSON files.
 * For Vercel deployment, JSON files should be in /public or fetched from storage.
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // For now, return hardcoded lab results
  // In production, these would be loaded from JSON files or database
  const labResults = [
    {
      date: '2026-02-06',
      source: 'Quest Diagnostics',
      biomarkers: [
        { name: 'HbA1c', value: 4.9, unit: '%', status: 'optimal', optimal: '< 5.7%', trend: 'down' },
        { name: 'LDL Cholesterol', value: 90, unit: 'mg/dL', status: 'optimal', optimal: '< 100 mg/dL', trend: 'down' },
        { name: 'eGFR', value: 104, unit: 'mL/min', status: 'excellent', optimal: '> 90 mL/min', trend: 'up' },
        { name: 'hs-CRP', value: 15.8, unit: 'mg/L', status: 'high', optimal: '< 3 mg/L', trend: 'up', note: 'Doug was sick' }
      ]
    },
    {
      date: '2025-05-07',
      source: 'Vibrant America',
      biomarkers: [
        { name: 'Nickel (Heavy Metal)', value: 23.69, unit: 'μg/g', status: 'high', optimal: '< 3 μg/g', trend: 'flat', note: '>95th percentile - chelation needed' }
      ]
    },
    {
      date: '2025-04-29',
      source: 'LabCorp',
      biomarkers: [
        { name: 'eGFR', value: 78, unit: 'mL/min', status: 'good', optimal: '> 90 mL/min', trend: 'flat' },
        { name: 'LDL Cholesterol', value: 101, unit: 'mg/dL', status: 'good', optimal: '< 100 mg/dL', trend: 'flat' }
      ]
    }
  ];

  // Get all biomarkers with latest value
  const allBiomarkers = {};
  
  labResults.forEach(report => {
    report.biomarkers.forEach(b => {
      if (!allBiomarkers[b.name] || new Date(report.date) > new Date(allBiomarkers[b.name].date)) {
        allBiomarkers[b.name] = {
          ...b,
          date: report.date,
          source: report.source
        };
      }
    });
  });

  return res.status(200).json({
    success: true,
    latest_report: labResults[0],
    all_reports: labResults,
    biomarkers: Object.values(allBiomarkers),
    last_updated: new Date().toISOString()
  });
}
