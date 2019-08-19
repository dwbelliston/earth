const local = {
  apiGateway: {
    REGION: "us-west-2",
    URL: "http://localhost:8080"
  },
  cognito: {}
};

const dev = {
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://01cztnllp2.execute-api.us-west-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_0cNgedchb",
    APP_CLIENT_ID: "6nvni4g8uv4mp4vnemhockv0hn",
    IDENTITY_POOL_ID: "us-west-2:7eecc967-fd2a-4c5d-9492-52d00edf5549"
  }
};

const prod = {
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://1by9mgfr2h.execute-api.us-west-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_L8A3cZVMq",
    APP_CLIENT_ID: "28b8emkir27qn8cl5ief3c85p7",
    IDENTITY_POOL_ID: "us-west-2:0750aa08-e56d-4b76-8139-cf0c50e53a88"
  }
};

// Default to dev if not set to prod or local
const config =
  process.env.REACT_APP_STAGE === "prod"
    ? prod
    : process.env.REACT_APP_STAGE === "local" ? local : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
