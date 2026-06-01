"use server";

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export const addSubscriber = async (formData: FormData) => {
  const email = formData.get("email");
  const firstName = formData.get("first_name");
  const leadMagnet = formData.get("lead-magnet") as string;

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
      merge_fields: { FNAME: firstName },
      tags: [leadMagnet],
    });
    return {
      successMessage: `Success! ${email} was successfully subscribed to the newsletter!`,
    };
  } catch (error) {
    if (
      error instanceof Error &&
      (error as any).response?.body?.title === "Member Exists"
    ) {
      return {
        errorMessage: `Ooops! It looks like the email ${email} is already subscribed to the newsletter!`,
      };
    } else {
      return {
        errorMessage: `Ooops! There was a problem subscribing ${email} to the newsletter!`,
      };
    }
  }
};
