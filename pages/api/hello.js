// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async (req, res) => {
  // console.log(req.body);
  res.statusCode = 200;
  const r = Math.floor(Math.random() * 16);
  const msg = [
    "hmm",
    "I need more training",
    "me so noob",
    "sad day for you",
    "why are you here",
    "I am a joke",
    "who are you btw",
    "stop plz",
    "i am too weak",
    "forgive me",
    "pardon plz",
    "i am not prepared",
    "i dont care what you ask",
    "lol do you think I am smart?",
    "too bad to answer",
    "sing a song",
  ];
  await sleep(500);
  res.json({ text: msg[r] });
};
