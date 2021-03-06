const router = require('express').Router();
module.exports = router;
const GphApiClient = require('giphy-js-sdk-core');
const client = GphApiClient(process.env.GIPHY_API_KEY);

Array.prototype.chunk = function(n) {
  if (!this.length) {
    return [];
  }
  return [this.slice(0, n)].concat(this.slice(n).chunk(n));
};

router.get('/:method', async (req, res, next) => {
  try {
    const search = req.query.search;
    const method = req.params.method;
    let searchReqToSend = {
      q: search,
      limit: 50
    };
    const rating = req.query.rating;
    const recent = req.query.recent;
    if (rating === 'true') {
      searchReqToSend.rating = 'pg-13';
    }
    if (recent === 'true') {
      searchReqToSend.sort = 'recent';
    }

    const gifsRes = await client.search(method, searchReqToSend);
    const gifList = [];
    gifsRes.data.forEach(gif => {
      const gifInfo = {gifLink: gif.images.original.url, title: gif.title};
      gifList.push(gifInfo);
    });
    const gifs = gifList.chunk(Math.ceil(gifList.length / 4));
    res.json(gifs);
  } catch (err) {
    next(err);
  }
});
