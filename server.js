require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "20kb" }));
app.use(express.static(__dirname));

app.post("/api/answers", async (request, response) => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId || botToken.includes("YOUR_") || chatId.includes("YOUR_")) {
        return response.status(500).json({
            ok: false,
            message: "Telegram settings have not been configured yet."
        });
    }

    const { crop, ncc, topper, personality, dream } = request.body;
    const answers = { crop, ncc, topper, personality, dream };

    if (Object.values(answers).some((answer) => typeof answer !== "string" || !answer.trim())) {
        return response.status(400).json({ ok: false, message: "Please answer every question." });
    }

    const escapedAnswers = {
        crop: escapeHtml(crop.trim()),
        ncc: escapeHtml(ncc.trim()),
        topper: escapeHtml(topper.trim()),
        personality: escapeHtml(personality.trim()),
        dream: escapeHtml(dream.trim())
    };

    const text = [
        "🎂 <b>Priyanshi's Birthday Answers</b>",
        "",
        "<b>1. Crop for life 🌱</b>",
        escapedAnswers.crop,
        "",
        "<b>2. Memorable NCC moment 🇮🇳</b>",
        escapedAnswers.ncc,
        "",
        "<b>3. Topper secret 🏆</b>",
        escapedAnswers.topper,
        "",
        "<b>4. Three-word personality</b>",
        escapedAnswers.personality,
        "",
        "<b>5. Five-year dream ✨</b>",
        escapedAnswers.dream
    ].join("\n");

    try {
        const telegramResponse = await fetch(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: chatId,
                    text,
                    parse_mode: "HTML"
                })
            }
        );

        const telegramResult = await telegramResponse.json();
        if (!telegramResponse.ok || !telegramResult.ok) {
            console.error("Telegram API error:", telegramResult);
            return response.status(502).json({
                ok: false,
                message: "The answers could not be sent to Telegram."
            });
        }

        return response.json({ ok: true, message: "Answers sent successfully!" });
    } catch (error) {
        console.error("Submission error:", error);
        return response.status(500).json({ ok: false, message: "Something went wrong." });
    }
});

app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
    console.log(`Birthday website running at http://localhost:${port}`);
});

function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
