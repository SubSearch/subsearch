const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { id } = req.query
  if (!id) return res.status(200);
  const response = await fetch(`https://www.youtube.com/get_video_info?video_id=${id}&eurl=https%3A%2F%2Fyoutube.googleapis.com%2Fv%2F${id}&html5=1&c=TVHTML5&cver=6.20180913`);
  res.status(200).send(await response.text());
}
