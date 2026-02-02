import { AnalyzeRepository } from "../../application/ports/analyse.repo";
import { AnalyzeInputModel, AnalyzeModel } from "../../domain/models/analyze.schema";
import { db } from './db/index'
import { analysis } from "./db/schema";
import { desc } from "drizzle-orm";

export class PgAnalyzeRepository implements AnalyzeRepository {
    mapToModel (dbModel: typeof analysis.$inferSelect): AnalyzeModel {
        return {
            id: dbModel.id,
            createdAt: dbModel.createdAt.toISOString(),
            score: dbModel.score,
            text: dbModel.text,
        }
    }

    async save(analyze: AnalyzeInputModel): Promise<AnalyzeModel> {
        const [res] = await db.insert(analysis).values(analyze).returning();
        return this.mapToModel(res);
    }

    async fetch(): Promise<AnalyzeModel[]> {
        const res = await db.select().from(analysis).orderBy(desc(analysis.createdAt));
        return res.map(this.mapToModel);
    }
}