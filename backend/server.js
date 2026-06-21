import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';
dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
