const axios = require('axios');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const match = envFile.match(/GOOGLE_PLACE_KEY=(.*)/);
const key = match ? match[1].trim() : '';

fs.writeFileSync('test_out.txt', 'Key found: ' + key.slice(0, 5) + '\n');

async function main() {
  try {
    const res = await axios.post(
      'https://places.googleapis.com/v1/places:searchText',
      {
        textQuery: 'Hotel Eiffel Seine, Paris',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': key,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.photos',
        },
        timeout: 5000,
      }
    );
    fs.appendFileSync('test_out.txt', 'PLACES STATUS: ' + res.status + '\n');
    fs.appendFileSync('test_out.txt', 'PLACES DATA: ' + JSON.stringify(res.data, null, 2) + '\n');
    
    const photo = res.data?.places?.[0]?.photos?.[0];
    if (photo?.name) {
      const mediaUrl = `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=400&maxWidthPx=400&key=${key}`;
      fs.appendFileSync('test_out.txt', 'Media URL: ' + mediaUrl + '\n');
      const imgRes = await axios.get(mediaUrl, {
        maxRedirects: 0,
        validateStatus: () => true,
        timeout: 5000,
      });
      fs.appendFileSync('test_out.txt', 'Img status: ' + imgRes.status + '\n');
      fs.appendFileSync('test_out.txt', 'Img location: ' + imgRes.headers['location'] + '\n');
    }
  } catch (e) {
    fs.appendFileSync('test_out.txt', 'ERROR: ' + (e.response ? JSON.stringify(e.response.data) : e.message) + '\n');
  }
}

main().finally(() => {
  fs.appendFileSync('test_out.txt', 'DONE\n');
  process.exit(0);
});
