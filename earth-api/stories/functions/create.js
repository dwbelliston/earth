"use strict";

const uuid = require("uuid");
const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

const dynamodb = require("../../lib/dynamodb");
var helpers = require("../../lib/helpers");

function dbCreate(params) {
  return new Promise((resolve, reject) => {
    // write the todo to the database
    dynamodb.put(params, error => {
      // handle potential errors
      if (error) {
        console.error(error);
        resolve(
          helpers.returnMessage(error.statusCode || 501, "Couldn't create the story.")
        );
        return;
      }

      // create a response
      console.log("Created!");
      resolve(helpers.returnMessage(200, JSON.stringify(params.Item)));
    });
  });
}

async function createStory(data) {
  // Validate the data
  // if (typeof data.title !== "string") {
  //   console.error("Validation Failed");
  //   return helpers.returnMessage(400, "Message body not good;");
  // }

  // Build params for create
  const timestamp = new Date().getTime();
  const params = {
    TableName: process.env.STORIES_TABLENAME,
    Item: {
      storyId: uuid.v1(),
      userId: data.userId,
      document: data.document,
      title: data.title,
      type: "blog",
      createdDate: timestamp,
      updatedAt: timestamp
    }
  };

  // Put in db
  try {
    return await dbCreate(params);
  } catch (err) {
    console.log(err);
    return helpers.returnMessage(500, "Couldnt create the story");
  }
}

module.exports.create = async (event, context) => {
  // Check json parse on body
  console.log("Earth API Create");
  try {
    const data = JSON.parse(event.body);
    // Create story
    let res = await createStory(data);
    return res;
  } catch (e) {
    console.log(e)
    return helpers.returnMessage(400, "Message body not good;");
  }
};
