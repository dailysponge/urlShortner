const shortid = require("shortid");
const urlModel = require("../../models/url");
const https = require("https");
const axios = require("axios");

const isValidUrl = async (url) => {
  try {
    let header = "";
    if (!url.includes("https")) header += "https://";
    url = header + url;

    const response = await axios.head(url, {
      maxRedirects: 5,
      validateStatus: (status) => status >= 200 && status < 400, // allows both success and redirect status codes
      timeout: 3000,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  createURL: async (originalUrl) => {
    try {
      let shortUrlId = shortid.generate();
      let checkShortUrlExist = await urlModel.findOne({ shortUrlId }).exec();

      while (checkShortUrlExist) {
        shortUrlId = shortid.generate();
        checkShortUrlExist = await urlModel.findOne({ shortUrlId }).exec();
      }

      const checkOriginalUrlExist = await urlModel
        .findOne({ originalUrl })
        .exec();
      if (checkOriginalUrlExist) {
        const error = "Original URL already exists";
        console.error(error);
        return [error, null];
      }

      const isValid = await isValidUrl(originalUrl);
      if (!isValid) {
        const error = "Invalid URL Entered";
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
  findUrl: async (conditions, sortType) => {
    try {
      const query = urlModel.find(conditions);
      query.sort({ [sortType]: -1 });
      const url = await query.exec();
      return [null, url];
    } catch (error) {
      console.error("Error finding URL", error);
      return [error, null];
    }
  },
  findAndDeleteUrl: async (conditions) => {
    try {
      const url = await urlModel.findOneAndDelete(conditions).exec();
      return [null, url];
    } catch (error) {
      console.error("Error finding and deleting URL", error);
      return [error, null];
    }
  },
  findAndUpdateUrl: async (conditions, update) => {
    try {
      let url = await urlModel
        .findOneAndUpdate(conditions, update, {
          new: true,
        })
        .exec();
      return [null, url];
    } catch (error) {
      console.error("Error finding and updating URL", error);
      return [error, null];
    }
  },
};
