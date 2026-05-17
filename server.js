const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// Vercel'deki Environment Variables kısmına eklediğin anahtarı kullanır
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ÖNEMLİ: Hem vercel.json hem index.html ile uyumlu olması için yolu "/api/chat" yaptık
app.post("/api/chat", async (req, res) => {
    try {
        const kullaniciMesaji = req.body.message;

        // --- BURADA SENİN GEMINI API KODLARIN OLMALI ---
        // Örnek olarak mantık şudur:
        // const response = await ... (Gemini'ye istek atma kodu)
        // const botCevabi = ...
        
        // Şimdilik test etmek için bot direkt bunu dönsün, kodun çalıştığını görelim:
        res.json({ reply: "Selam kanka, MOE şu an sunucudan cevap veriyor!" });

    } catch (error) {
        console.error("Gemini hatası:", error);
        res.status(500).json({ reply: "Yapay zeka tarafında bir hata oluştu." });
    }
});
        const result = await model.generateContent(kullaniciMesaji);
        const response = await result.response;
        const text = response.text();

        // index.html'in beklediği formatta cevabı gönderiyoruz
        res.json({ reply: text });

    } catch (err) {
        console.error("Hata oluştu:", err.message);
        res.status(500).json({ error: "MOE şu an uykuda, bir hata oluştu." });
    }
});

// server.js dosyanın en alt kısımlarında bu olmalı:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});

module.exports = app; // Vercel için bu satır çok önemli!
