const axios = require("axios");

async function sendText(message) {
    try {
        const response = await axios.post(
            "https://api.linqapp.com/api/partner/v3/chats",
            {
                from: process.env.LINQ_FROM_NUMBER,

                to: [process.env.ALERT_PHONE],

                message: {
                    parts: [
                        {
                            type: "text",
                            value: message
                        }
                    ]
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.LINQ_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        ); console.log("Text Sent", response.data)
    } catch (err) {
        console.error(
            "Linq error",
            err.response?.data || err.message
        )
    }
}

module.exports = sendText;