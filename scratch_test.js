const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function test() {
  try {
    const res = await axios.post(
      'https://places.googleapis.com/v1/places:searchText',
      { textQuery: 'Eiffel Tower, Paris' },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': process.env.GOOGLE_PLACE_KEY,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.photos,places.formattedAddress',
        },
      }
    );
    console.log('Result:', JSON.stringify(res.data, null, 2));

    const photoName = res.data?.places?.[0]?.photos?.[0]?.name;
    console.log('Photo name:', photoName);

    if (photoName) {
      const mediaUrl = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=1000&maxWidthPx=1000&key=${process.env.GOOGLE_PLACE_KEY}`;
      console.log('Testing media URL:', mediaUrl);
      const photoRes = await axios.get(mediaUrl, { maxRedirects: 0, validateStatus: () => true });
      console.log('Media response status:', photoRes.status, 'headers:', photoRes.headers);
    }
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

test();
