require('dotenv').config();
const TagsService = require('../services/tags');

const createTag = async (req, res) => {;
  if (!req.body.name) {
    return res.status(400).send({message: "Service error: Tag name is required"});
  }

  try {
    const response = await TagsService.createTag(req.name);
    return res.status(200).send({
      success: true,
      message: `tag created`
    });
  } catch (err) {
    console.error(`Service error: ${err}`);
    return res.status(500).send({message: `Service error: ${err}`});
  }
};

module.exports = {
  createTag
};