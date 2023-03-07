const shortid = require("shortid");
const urlModel = require("../../models/url");
require("dotenv").config();

const DOMAIN = process.env.DOMAIN || "http://localhost";
const PORT = process.env.PORT;

module.exports = {
  createURL: async (originalUrl) => {
    try {
      const shortUrlId = shortid.generate();
      const checkExist = await urlModel.findOne({ shortUrlId }).exec();
      if (checkExist) {
        const error = "Short URL already exists";
        console.error(error);
        return [error, null];
      }

      let doc = { originalUrl, shortUrlId };
      let url = new urlModel(doc);
      url = await url.save();
      return [null, url];
    } catch (error) {
      console.error("Error creating URL in utils", error);
      return [error, null];
    }
  },
  findUrl: async (conditions) => {
    try {
      const query = urlModel.find(conditions);
      query.sort({ lastAccessed: -1 });
      const url = await query.exec();
      return [null, url];
    } catch (error) {
      console.error("Error finding URL", error);
      return [error, null];
    }
  },
};
