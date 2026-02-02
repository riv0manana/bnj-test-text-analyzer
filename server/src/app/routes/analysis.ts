import { Router } from "express";
import { AnalyseUseCase } from "../../core/application/use-cases/AnalyzeText.usecase";
import { loadModule } from "../../core/container";

const router = Router();
const analyzer = loadModule<AnalyseUseCase>('AnalyseUseCase');

router.get("/", async (_, res) => {
  try {
    
    const result = await analyzer.getHistory();

    return res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Failed to fetch history" });
    }
  }
});

router.post("/analyzer", async (req, res) => {
  try {
    const { text } = req.body;

    const result = await analyzer.run(text);

    return res.status(201).json({ status: 'ok', score: result.score });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Failed to create analysis" });
    }
  }
});

export default router;
