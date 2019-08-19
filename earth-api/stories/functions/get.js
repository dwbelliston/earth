"use strict";

const dynamodb = require("../../lib/dynamodb");
var helpers = require("../../lib/helpers");

function dbGet(params) {
  return new Promise((resolve, reject) => {
    dynamodb.get(params, (error, result) => {
      if (error) {
        console.error(error);
        resolve(
          helpers.returnMessage(
            error.statusCode || 501,
            "Couldn't get the story."
          )
        );
        return;
      }

      resolve(helpers.returnMessage(200, JSON.stringify(result.Item)));
    });
  });
}

module.exports.get = async (event, context) => {
  // Check json parse on body
  console.log("Earth API Get");
  const params = {
    TableName: process.env.STORIES_TABLENAME,
    Key: {
      storyId: event.pathParameters.id
    }    
  };

  let res = await dbGet(params);
  return res;
};
