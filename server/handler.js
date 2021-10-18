const axios = require('axios');
const cheerio = require('cheerio');
const BASE_URL = 'https://www.gsmarena.com/';

module.exports.search = async (event) => {
  const query = event.queryStringParameters?.query;

  if (!query) {
    return {
      statusCode: 500,
      body: 'Invalid parameters',
    };
  }

  const url = `${BASE_URL}res.php3?sSearch=${query}`;
  const htmlResult = await axios.get(url).then((res) => res.data);
  const $ = cheerio.load(htmlResult);
  const phones = [];
  $('.makers')
    .children('ul')
    .children('li')
    .each((index, el) => {
      const slug = $(el).children('a').attr('href').replace('.php', '');
      const name = $(el).children('a').find('br').get(0).nextSibling.nodeValue;
      const brand = $(el).children('a').text().replace(name, '');
      phones.push({
        name: `${brand} ${name}`,
        slug,
      });
    });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "https://qrwallpaper.linards.id.lv",
      "Access-Control-Allow-Methods": "GET"
    },
    body: JSON.stringify(phones),
  };
};

module.exports.getResolution = async (event) => {
  const slug = event.queryStringParameters?.slug;

  if (!slug) {
    return {
      statusCode: 500,
      body: 'Invalid parameters',
    };
  }

  const url = `${BASE_URL}/${slug}.php`;
  const htmlResult = await axios.get(url).then((res) => res.data);


  let $ = cheerio.load(htmlResult);
  const text = $('td[data-spec=displayresolution]').text();

  const width = parseInt(text.substr(0, text.indexOf('x')));
  const height = parseInt(text.substr(text.indexOf('x') + 1, text.indexOf('p') - text.indexOf('x') - 1));

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "https://qrwallpaper.linards.id.lv",
      "Access-Control-Allow-Methods": "GET"
    },
    body: JSON.stringify({ width, height }),
  };
};
