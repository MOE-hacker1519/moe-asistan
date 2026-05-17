const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// Vercel, Environment Variables kısmına eklediğin GEMINI_API_KEY'i buradan okuyacak
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/chat", async (req, res) => {
    try {
        const kullaniciMesaji = req.body.message;

        if (!kullaniciMesaji) {
            return res.status(400).json({ reply: "Mesaj boş olamaz kanka!" });
        }

        // Gemini 1.5 Flash modelini çağırıyoruz (Hızlı ve stabil)
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(kullaniciMesaji);
        const botCevabi = result.response.text();

        // Ön yüze (index.html) cevabı kusursuzca gönderiyoruz
        res.json({ reply: botCevabi });

    } catch (error) {
        console.error("Gemini Hatası:", error);
        res.status(500).json({ reply: "Kanka arka planda Gemini API bir hata verdi, Vercel Environment Variables kısmını kontrol et!" });
    }
});

// Vercel için port ayarları ve export işlemi
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});

module.exports = app;
