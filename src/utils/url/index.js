const shortid = require("shortid");
const urlModel = require("../../models/url");
require("dotenv").config();

const DOMAIN = process.env.DOMAIN || "http://localhost";
const PORT = process.env.PORT;

module.exports = {
  createURL: async (originalUrl) => {
    try {
      const shortURLId = shortid.generate();
      const shortUrl = `${DOMAIN}:${PORT}/${shortURLId}`;
      const checkExist = await urlModel.findOne({ shortUrl }).exec();
      if (checkExist) {
        const error = "Short URL already exists";
        console.error(error);
        return [error, null];
      }

      let doc = { originalUrl, shortUrl };
      let url = new urlModel(doc);
      url = await url.save();
      return [null, url];
    } catch (error) {
      console.error("Error creating URL", error);
      return [error, null];
    }
  },
};
