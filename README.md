# Priyanshi Birthday Website

A personalized birthday website with five questions and Telegram submissions.

## Telegram setup

1. Create a bot through Telegram's `@BotFather` and copy its bot token.
2. Start a chat with the bot.
3. Get your chat ID from `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates` after sending the bot a message.
4. Copy `.env.example` to `.env`.
5. Replace `YOUR_TELEGRAM_BOT_TOKEN` and `YOUR_TELEGRAM_CHAT_ID` in `.env`.

## Run locally

```powershell
npm install
npm start
```

Open `http://localhost:3000`.

## Deploy

Deploy this folder to a Node hosting service and add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as server environment variables. Set `PORT` only if required by the hosting service.

<a href="./index.html?name=Priyanshi%20Kumari" target="blank">Open Priyanshi's Birthday Page</a>
