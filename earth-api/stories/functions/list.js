"use strict";

const dynamodb = require("../../lib/dynamodb");
var helpers = require("../../lib/helpers");

function dbList(params) {
  return new Promise((resolve, reject) => {

    dynamodb.scan(params, (error, result) => {
      if (error) {
        resolve(
          helpers.returnMessage(error.statusCode || 501, JSON.stringify([]))
        );
        return;
      }

      // return items
      resolve(helpers.returnMessage(200, JSON.stringify(result.Items)));
    });
  });
}

module.exports.list = async (event, context) => {  
  let params = {
    TableName: process.env.STORIES_TABLENAME
  };

  if (event && event.queryStringParameters && event.queryStringParameters.recent) {
    params = {
      ...params,
      ProjectionExpression: "#yr, #y2k",
      FilterExpression: "#yr between :start_yr and :end_yr",
      ExpressionAttributeNames: {
        "#yr": "createdDate",
        "#y2k": "title"
      },
      ExpressionAttributeValues: {
        ":start_yr": 1557430081029,
        ":end_yr": 1557430081031
      }
    };
  }

  let res = await dbList(params);
  return res;
};
