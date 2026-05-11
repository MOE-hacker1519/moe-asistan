const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors()); // HTML sayfamızın sunucuyla konuşmasına izin verir
app.use(express.json()); // Gelen mesajları anlamamızı sağlar

// --- BURAYI DEĞİŞTİR ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// -----------------------

app.post("/moe-sor", async (req, res) => {
    const kullaniciMesaji = req.body.message;

    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama3-70b-8192", // Groq'un hızlı ve akıllı modeli
                messages: [
                    { 
                        role: "system", 
                        content: "Senin adın MOE. 11 yaşındaki bir geliştirici tarafından yapıldın. Çok nazik, komik ve zeki bir asistansın." 
                    },
                    { role: "user", content: kullaniciMesaji }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        // AI'den gelen cevabı HTML'e geri gönderiyoruz
        res.json({ reply: response.data.choices[0].message.content });

    } catch (err) {
        console.error("Hata oluştu:", err.message);
        res.status(500).json({ error: "MOE şu an uykuda, bir hata oluştu." });
    }
});

app.listen(3000, () => {
    console.log("------------------------------------------");
    console.log("🚀 MOE ÇALIŞIYOR!");
    console.log("🔗 Adres: http://localhost:3000");
    console.log("------------------------------------------");
});