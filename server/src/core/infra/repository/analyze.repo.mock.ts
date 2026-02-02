import { AnalyzeRepository } from "../../application/ports/analyse.repo";
import { AnalyzeInputModel, AnalyzeModel } from "../../domain/models/analyze.schema";

export class AnalyzeRepoMock implements AnalyzeRepository {
    private analyzes: AnalyzeModel[] = [];

    async save(analyze: AnalyzeInputModel): Promise<AnalyzeModel> {
        const newAnalyze: AnalyzeModel = {
            ...analyze,
            id: new Date().getMilliseconds(),
            createdAt: new Date().toISOString(),
        }
        this.analyzes.push(newAnalyze);
        return newAnalyze;
    }

    async fetch(): Promise<AnalyzeModel[]> {
        return this.analyzes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
}