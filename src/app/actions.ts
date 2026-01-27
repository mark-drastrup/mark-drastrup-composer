"use server";

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export const addSubscriber = async (formData: FormData) => {
  const email = formData.get("email");
  const firstName = formData.get("first_name");

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
      merge_fields: { FNAME: firstName },
    });
    return {
      successMessage: `Success! ${email} was successfully subscribed to our newsletter!`,
    };
  } catch (error) {
    return {
      errorMessage: `Ooops! There was a problem subscribing ${email} to our newsletter!`,
    };
  }
};
