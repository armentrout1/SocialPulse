import fetch from "node-fetch";

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

const queryPerplexity = async (query) => {
  const url = "https://api.perplexity.ai/chat/completions"; // Corrected API endpoint

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: "sonar-pro", // You can change this if needed
        messages: [
          { role: "system", content: "You are an AI assistant." },
          { role: "user", content: query }
        ],
        max_tokens: 200, // Optional parameter
        temperature: 0.7 // Optional parameter
      })
    });

    const data = await response.json(); // Parse JSON safely
    console.log("Perplexity Response:", data);
    return data;

  } catch (error) {
    console.error("Error querying Perplexity:", error);
  }
};

// Example usage
queryPerplexity("What is the latest in AI technology?")
  .then(response => console.log("Response:", response))
  .catch(error => console.error("Error:", error));
