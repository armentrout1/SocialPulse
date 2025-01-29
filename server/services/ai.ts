const STOCK_IMAGES = {
  social: [
    "https://images.unsplash.com/photo-1611926653458-09294b3142bf",
    "https://images.unsplash.com/photo-1562577309-4932fdd64cd1",
    "https://images.unsplash.com/photo-1504270997636-07ddfbd48945",
    "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
    "https://images.unsplash.com/photo-1607703703520-bb638e84caf2"
  ],
  business: [
    "https://images.unsplash.com/photo-1533750349088-cd871a92f312",
    "https://images.unsplash.com/photo-1542744173-05336fcc7ad4",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
    "https://images.unsplash.com/photo-1552664730-d307ca884978"
  ]
};

export async function generateContent(prompt: string): Promise<string> {
  const response = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.1-sonar-small-128k-online",
      messages: [
        {
          role: "system",
          content: "You are a social media content creator. Create engaging, professional content that's optimized for Facebook. Keep posts between 50-200 characters. Include relevant emojis where appropriate."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

export function getRandomImage(category: 'social' | 'business' = 'social'): string {
  const images = STOCK_IMAGES[category];
  return images[Math.floor(Math.random() * images.length)];
}
