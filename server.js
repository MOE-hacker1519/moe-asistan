const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Doğru kütüphane ismi burası!

const app = express();
app.use(cors());
app.use(express.json());

// Vercel Environment Variables kısmından API anahtarını alıyoruz
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/chat", async (req, res) => {
    try {
        const kullaniciMesaji = req.body.message;

        if (!kullaniciMesaji) {
            return res.status(400).json({ error: "Mesaj boş olamaz kanka!" });
        }

        // Gemini 1.5 Flash modelini başlatıyoruz
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(kullaniciMesaji);
        const botCevabi = result.response.text();

        // index.html'e temiz cevabı gönderiyoruz
        res.json({ reply: botCevabi });

    } catch (error) {
        console.error("Gemini API Hatası:", error);
        res.status(500).json({ reply: "Kanka arka planda Gemini API bir hata verdi. Vercel'de GEMINI_API_KEY ekli mi kontrol et!" });
    }
});

// Vercel için port ayarları
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda aktif.`);
});

module.exports = app;
