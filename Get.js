const fs = require("fs");
const { default: OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: "sk-proj-LXLDq8DP1pLx06vKXIWXT3BlbkFJGM4NVZ8OsLfgovg8aswb" });

async function main() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("C:/Users/Jensv/OneDrive/Desktop/UnrealVr/Recordings/AudioTest.wav"),
    model: "whisper-1",
  });

  console.log(transcription                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                .text);
}
main();