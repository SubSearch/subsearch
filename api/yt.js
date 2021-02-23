const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { id } = req.query
  if (!id) return;
  const response = await fetch(`https://youtube.com/get_video_info?video_id=${id}`);
  res.status(200).send(await response.text());
}
