import connectDB from "config/db.config";
import dotenv from "dotenv";
import server from "services/server";

dotenv.config();

const startServer = async () => {
  await connectDB();
  server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT || 8000}`);
  });
};

startServer();
