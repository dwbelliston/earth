const stripePackage = require("stripe");
const responseHelpers = require("../../lib/response-lib");
const billingHelpers = require("../lib/helpers");


module.exports.main = async (event, context) => {
  const { storage, source } = JSON.parse(event.body);
  const amount = billingHelpers.calculateCost(storage);
  const description = "Scratch charge";

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: "usd"
    });
    return responseHelpers.success({ status: true });
  } catch (e) {
    return responseHelpers.failure({ message: e.message });
  }
};
