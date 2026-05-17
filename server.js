const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// API Anahtarını Vercel Environment Variables üzerinden çekiyoruz
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/chat", async (req, res) => {
    try {
        const kullaniciMesaji = req.body.message;

        if (!kullaniciMesaji) {
            return res.status(400).json({ reply: "Mesaj boş olamaz kanka!" });
        }

        // En güncel ve hızlı model: gemini-1.5-flash
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(kullaniciMesaji);
        const response = await result.response;
        const botCevabi = response.text();

        // index.html'e cevabı yolluyoruz
        res.json({ reply: botCevabi });

    } catch (error) {
        console.error("Gemini Hatası:", error);
        res.status(500).json({ reply: "Kanka arka planda bir sorun oluştu, Vercel Logs panelini kontrol et!" });
    }
});

// Vercel için port ayarı
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda aktif.`);
});

module.exports = app;
