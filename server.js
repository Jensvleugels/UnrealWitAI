const fs = require("fs").promises; // Use fs.promises for async file operations
const express = require("express");
const axios = require("axios");
const { json } = require("body-parser");
const { test } = require("media-typer");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/api/file", async (req, res) => {
  let filePath = req.query.filePath;

  try {
    if (!filePath) {
      return res.status(400).send("File path is required.");
    }

    const fileContent = await fs.readFile(filePath);

    const contentType = getContentType(filePath);
    if (!contentType) {
      return res.status(400).send("Unsupported file type.");
    }

    const otherApiResponse = await axios.post(
      "https://api.wit.ai/speech?",
      fileContent,
      {
        headers: {
          Authorization: "Bearer 7J4QMLPQLOJOKOGD5TONAVIHQ2QOQR3J",
          "Content-Type": contentType,
        },
      }
    );

    console.log("Response from other API:", otherApiResponse.data);

    var audiotext = JSON.stringify(otherApiResponse.data);
    // audiotext = audiotext.replace(/[\\/'":,]/g, ' ')
    // audiotext = audiotext.split('is_final')
    // audiotext = audiotext[1].split('traits');
    // audiotext = audiotext[0].split('text');
    // audiotext = audiotext[1];
    res.send(audiotext); // Api Response Text
  } catch (error) {
    console.error(`Error serving file and calling other API: ${error}`);
    res.status(500).send(`An error occurred: ${error.message}`);
  }
});

function getContentType(filePath) {
  const ext = filePath.split(".").pop().toLowerCase();
  switch (ext) {
    case "wav":
      return "audio/wav";
    default:
      return null;
  }
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
