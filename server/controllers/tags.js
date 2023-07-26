require('dotenv').config();
const TagsService = require('../services/tags');

const createTag = async (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .send({ message: 'Service error: Tag name is required' });
  }

  try {
    const response = await TagsService.createTag(req.body);
    return res.status(200).send({
      success: true,
      message: `tag created`,
      tag: response.tag,
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({ message: `Service error: ${err}` });
  }
};

const updateTag = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .send({ message: 'Service error: tag details are required' });
  }
  const id = req.params.id,
    data = req.body;
  try {
    const response = await TagsService.updateTag(id, data);
    return res.status(200).send({
      success: response.success,
      message: response.message,
      tag: response.tag,
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({ message: `Service error: ${err}` });
  }
};

module.exports = {
  createTag,
  updateTag,
};
