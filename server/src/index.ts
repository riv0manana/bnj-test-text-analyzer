import express from "express";
import cors from "cors";
import path from "path";
import { requestLogger } from "./app/middlewares/logger";
import analysisRoutes from "./app/routes/analysis";
import { connectDb } from "./core/infra/repository/db";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/api", analysisRoutes);

if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(__dirname, "../../client/dist");
  app.use(express.static(clientDist));
  app.get("/*path", (_, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}


connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Database connection error:", err);
  process.exit(1);
});
