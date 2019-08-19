module.exports = {
  returnMessage(code, body) {
    return {
      statusCode: code,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json"
      },
      body: body
    };
  }
};
