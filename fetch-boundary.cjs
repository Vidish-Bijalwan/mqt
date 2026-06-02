const fs = require('fs');
const https = require('https');

// Overpass QL to get the boundary of Uttarakhand
const query = `
  [out:json];
  relation["name"="Uttarakhand"]["boundary"="administrative"]["admin_level"="4"];
  out geom;
`;

const postData = 'data=' + encodeURIComponent(query);

const options = {
  hostname: 'overpass-api.de',
  port: 443,
  path: '/api/interpreter',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    fs.writeFileSync('uttarakhand.json', data);
    console.log('Downloaded boundary from Overpass.');
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.write(postData);
req.end();
