const crypto = require('crypto');

function generate_short(long_url, depth = 8) {
  // Generate a unique hash for the original URL using SHA-256
  const hash = crypto.createHash('sha256').update(originalUrl).digest('hex');

  // Take the first 8 characters of the hash as the shortened URL
  const url_key = hash.substring(0, depth);

  const base_url_arr = long_url.split('/').slice(0,3);
  base_url_arr[1] = "//";

  base_url = base_url_arr.join("");

  const short_url = `${base_url}/${url_key}`;

  return {url_key, short_url};
}

module.exports = { generate_short };