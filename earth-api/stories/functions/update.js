const responseHelpers = require("../../lib/response-lib");
const dynamodbLib = require("../../lib/dynamodb-lib");

module.exports.update = async (event, context) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.STORIES_TABLENAME,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      storyId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET title = :title, document = :document",
    ExpressionAttributeValues: {
      ":title": data.title || null,
      ":document": data.document || null
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamodbLib.call("update", params);
    return responseHelpers.success({ status: true });
  } catch (e) {
    console.log(e)
    return responseHelpers.failure({ status: false });
  }
}
