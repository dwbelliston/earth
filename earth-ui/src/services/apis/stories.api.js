import { API } from "aws-amplify";

function getStories() {
  return API.get("earth", "/stories");
}

function getRecentStories() {
  return API.get("earth", "/stories");
}

function getStory(id) {
  return API.get("earth", `/stories/${id}`);
}

function postStory(payload) {
  return API.post("earth", "/stories", {
    body: payload
  });
}

function saveStory(id, payload) {
  return API.put("earth", `/stories/${id}`, {
    body: payload
  });
}

function deleteStory(id) {
  return API.del("earth", `/stories/${id}`);
}

// function postStory(payload, cb) {
//   // let domain = getDomain();

//   return fetch(`${domain}/stories`, {
//     accept: 'application/json',
//     method: 'post',
//     body: JSON.stringify(payload)
//   })
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(cb);
// }

// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }
//   const error = new Error(`HTTP Error ${response.statusText}`);
//   error.status = response.statusText;
//   error.response = response;
//   throw error;
// }

// function parseJSON(response) {
//   return response.json();
// }

const StoriesApi = {
  getStories,
  getRecentStories,
  postStory,
  getStory,
  saveStory,
  deleteStory
};
export default StoriesApi;
