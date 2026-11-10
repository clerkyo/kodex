const { sql } = require('@vercel/postgres');

module.exports = async function handler(req, res) {
    try {
        // Create the table if it doesn't exist yet
        await sql`
            CREATE TABLE IF NOT EXISTS chat_messages (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        // Handle fetching messages (GET)
        if (req.method === 'GET') {
            const { rows } = await sql`SELECT * FROM chat_messages ORDER BY created_at ASC LIMIT 50;`;
            return res.status(200).json(rows);
        }

        // Handle sending a new message (POST)
        if (req.method === 'POST') {
            const { username, message } = req.body;
            
            if (!username || !message) {
                return res.status(400).json({ error: "Missing username or message" });
            }

            await sql`INSERT INTO chat_messages (username, message) VALUES (${username}, ${message});`;
            return res.status(200).json({ success: true });
        }

        // Reject any other methods
        res.status(405).json({ error: "Method not allowed" });
        
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: error.message });
    }
};
