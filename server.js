const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// API anahtarını Vercel'den çekiyoruz
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/chat", async (req, res) => {
    try {
        const kullaniciMesaji = req.body.message;

        if (!kullaniciMesaji) {
            return res.status(400).json({ reply: "Mesaj boş olamaz kanka!" });
        }

        // Gemini 1.5 Flash modeli
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(kullaniciMesaji);
        const botCevabi = result.response.text();

        // Senin index.html'e cevabı gönderiyoruz
        res.json({ reply: botCevabi });

    } catch (error) {
        console.error("Gemini Hatası:", error);
        res.status(500).json({ reply: "Hata nerede bilmiyorum ama var!" });
    }
});

// Vercel için port ayarları
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda aktif.`);
});

module.exports = app;
