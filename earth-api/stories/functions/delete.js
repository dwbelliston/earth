const responseHelpers = require("../../lib/response-lib");
const dynamodbLib = require("../../lib/dynamodb-lib");

module.exports.delete = async (event, context) => {
  const params = {
    TableName: process.env.STORIES_TABLENAME,
    Key: {
      storyId: event.pathParameters.id
    }
  };

  try {
    const result = await dynamodbLib.call("delete", params);
    return responseHelpers.success({ status: true });
  } catch (e) {
    return responseHelpers.failure({ status: false });
  }
};
