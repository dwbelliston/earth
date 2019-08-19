const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

let options = {};

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
  options = {
    region: "localhost",
    endpoint: "http://localhost:8008"
  };
}


module.exports = {
  call(action, params) {
    const dynamoDb = new AWS.DynamoDB.DocumentClient(options);

    return dynamoDb[action](params).promise();
  }
};
