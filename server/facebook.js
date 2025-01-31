const fetch = require("node-fetch");

const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID_KC;
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN_KC;

const postToFacebook = async (message) => {
  const url = `https://graph.facebook.com/${FACEBOOK_PAGE_ID}/feed`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: message,
      access_token: FACEBOOK_ACCESS_TOKEN,
    }),
  });

  return response.json();
};

// Example usage: Posting to KC Contractor Depot
postToFacebook("Hello from KC Contractor Depot!")
  .then((response) => console.log("Post Success:", response))
  .catch((error) => console.error("Error Posting:", error));
