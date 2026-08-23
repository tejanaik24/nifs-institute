#!/usr/bin/env node
/**
 * NIFS India — IndexNow Pinger
 * Pings Bing, Yandex with new/updated URLs for instant indexing
 * Run: node scripts/indexnow-ping.js
 */
const https = require('https');
const http = require('http');

const KEY = 'nifsindia2026indexnow';
const HOST = 'www.nifsindia.net';
const KEY_LOCATION = `https://${HOST}/indexnow-key.txt`;

// All site URLs to ping
const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/courses/`,
  `https://${HOST}/courses/safety-officer-course/`,
  `https://${HOST}/fire-and-safety-course/`,
  `https://${HOST}/courses/diploma-in-fire-safety/`,
  `https://${HOST}/courses/advanced-diploma-in-fire-safety-adfs/`,
  `https://${HOST}/courses/diploma-in-industrial-safety-dis/`,
  `https://${HOST}/courses/advanced-diploma-in-industrial-safety-adis/`,
  `https://${HOST}/courses/b-sc-in-fire-industrial-safety/`,
  `https://${HOST}/courses/pg-diploma-in-fire-safety-pg-dfs/`,
  `https://${HOST}/courses/diploma-in-health-safety-environment/`,
  `https://${HOST}/centers/`,
  `https://${HOST}/blog/`,
  `https://${HOST}/admissions/`,
  `https://${HOST}/blog/safety-officer-salary-in-india-2026-complete-guide/`,
  `https://${HOST}/blog/mba-in-safety-management-a-career-path-to-leadership-in-workplace-safety/`,
  `https://${HOST}/blog/top-fire-and-safety-courses-after-10th-12th-graduation-2026/`,
  `https://${HOST}/blog/complete-fee-structure-of-pdis-course-from-top-safety-institutes-in-india/`,
  `https://${HOST}/blog/pdis-course-fees-in-india-and-what-they-include-at-top-institutes/`,
  `https://${HOST}/blog/industrial-safety-course-in-bhubaneswar-best-institute-certifications-and-career-opportunities/`,
];

function postJson(hostname, path, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const options = {
      hostname,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(options, (res) => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function pingIndexNow() {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URLS,
  };

  const engines = [
    { name: 'Bing', hostname: 'www.bing.com', path: '/indexnow' },
    { name: 'Yandex', hostname: 'yandex.com', path: '/indexnow' },
  ];

  console.log(`IndexNow Ping — ${new Date().toISOString()}`);
  console.log(`Pinging ${URLS.length} URLs to ${engines.length} search engines...\n`);

  for (const engine of engines) {
    try {
      const result = await postJson(engine.hostname, engine.path, payload);
      if (result.status === 200 || result.status === 202) {
        console.log(`✅ ${engine.name}: ${result.status} — Success`);
      } else {
        console.log(`⚠️  ${engine.name}: ${result.status} — ${result.body}`);
      }
    } catch (e) {
      console.log(`❌ ${engine.name}: Error — ${e.message}`);
    }
  }
  console.log('\nDone.');
}

pingIndexNow();
