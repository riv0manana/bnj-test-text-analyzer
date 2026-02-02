import { z } from "zod";

export const AnalyzeSchema = z.object({
    id: z.number(),
    createdAt: z.string(),
    score: z.number(),
    text: z.string()
})

export const AnalyzeInput = AnalyzeSchema.pick({ text: true, score: true })

export type AnalyzeModel = z.infer<typeof AnalyzeSchema>
export type AnalyzeInputModel = z.infer<typeof AnalyzeInput>
