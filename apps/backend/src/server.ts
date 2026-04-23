import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

// This will catch if the port is blocked or in use
server.on("error", (error: any) => {
  if (error.syscall !== "listen") throw error;
  if (error.code === "EADDRINUSE") {
    console.error(
      `❌ CRITICAL: Port ${PORT} is already in use. Try changing PORT in .env to 3001.`,
    );
    process.exit(1);
  } else {
    throw error;
  }
});

process.on("uncaughtException", (err) => {
  console.error("❌ CRITICAL: Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ CRITICAL: Unhandled Promise Rejection:", err);
});
