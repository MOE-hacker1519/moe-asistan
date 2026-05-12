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
    const kullaniciMesaji = req.body.message;

    try {
        // Gemini 1.5 Flash modelini başlatıyoruz (Hızlı ve etkili)
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: "Senin adın MOE. 11 yaşındaki bir geliştirici tarafından yapıldın. Çok nazik, komik ve zeki bir asistansın."
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

// Yerel testler için port ayarı
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("------------------------------------------");
    console.log("🚀 MOE GEMINI SİSTEMİ ÇALIŞIYOR!");
    console.log(`🔗 Adres: http://localhost:${PORT}`);
    console.log("------------------------------------------");
});

module.exports = app;
