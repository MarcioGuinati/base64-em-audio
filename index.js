const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();

// Middleware para JSON
app.use(bodyParser.json({ limit: "10mb" }));

// Endpoint para converter base64 para MP3
app.post("/convert", async (req, res) => {
  try {
    const { base64Data, fileName } = req.body;

    if (!base64Data || !fileName) {
      return res.status(400).json({ error: "base64Data and fileName are required" });
    }

    // Decodifica o base64 e salva como um arquivo MP3
    const audioBuffer = Buffer.from(base64Data, "base64");
    const outputFilePath = path.join(__dirname, `${fileName}.mp3`);

    fs.writeFileSync(outputFilePath, audioBuffer);

    // Retorna o áudio como URL para download
    return res.json({ message: "File converted successfully", fileName: `${fileName}.mp3` });
  } catch (error) {
    console.error("Error converting base64 to MP3:", error);
    res.status(500).json({ error: "Failed to convert base64 to MP3" });
  }
});

// Porta para desenvolvimento local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
