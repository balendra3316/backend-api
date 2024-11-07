import express from "express";
import fetch from "node-fetch";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from "express-mongo-sanitize";
import path, { dirname } from 'path';
import { fileURLToPath } from "url";
import Post from "./model/dataSchema.js";

dotenv.config();
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware setup
app.use(express.static(path.join(__dirname, './client/build')));
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// Route to get tasks
app.get('/api/v1/tasks', async (req, res) => {
    try {
        const tasks = await Post.find({}).limit(10);
        res.status(200).json({ tasks });
    } catch (err) {
        res.status(500).json({ msg: err });
    }
});

// Welcome route
app.get('/api/v1', (req, res) => {
    res.json({ msg: "Welcome!" });
});

// Fetch and save posts
const fetchAndSavePosts = async () => {
    try {
        const response = await fetch("https://api.wazirx.com/api/v2/tickers");
        const data = await response.json();

        for (let i = 0; i < 10; i++) {
            const post = new Post({
                name: Object.values(data)[i]["name"],
                last: Object.values(data)[i]["last"],
                buy: Object.values(data)[i]["buy"],
                sell: Object.values(data)[i]["sell"],
                volume: Object.values(data)[i]["volume"],
                base_unit: Object.values(data)[i]["base_unit"],
            });
            post.save();
        }
    } catch (err) {
        console.error(err);
    }
};

fetchAndSavePosts();

// Catch-all route for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
    } catch (err) {
        console.error(err);
    }
};

startServer();
