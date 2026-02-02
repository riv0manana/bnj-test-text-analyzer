import { AnalyzeService } from "../../application/ports/analyze.service";
import OpenAI from "openai";

export class GPTAnalyser implements AnalyzeService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async run(text: string): Promise<number> {
        if (!process.env.OPENAI_API_KEY) {
            console.warn("OPENAI_API_KEY is not set. Returning default score 0.");
            return 0;
        }

        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a text analyzer. Analyze the following text and assign a 'trustworthiness' score from 0 to 100, where 100 is highly trustworthy/safe and 0 is fraudulent/unsafe. Consider factors like spamminess, aggressive language, potential scams, or misleading content. Return ONLY the number."
                    },
                    {
                        role: "user",
                        content: text
                    }
                ],
                temperature: 0.3,
                max_tokens: 10,
            });

            const content = response.choices[0]?.message?.content?.trim();
            if (!content) return 0;

            const score = parseInt(content, 10);
            return isNaN(score) ? 0 : Math.min(100, Math.max(0, score));
        } catch (error) {
            console.error("Error calling OpenAI:", error);
            return 0;
        }
    }
}
