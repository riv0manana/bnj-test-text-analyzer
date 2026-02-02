import { AnalyzeInputModel, AnalyzeModel } from "../../domain/models/analyze.schema";

export interface AnalyzeRepository {
    save(analyze: AnalyzeInputModel): Promise<AnalyzeModel>
    fetch(): Promise<AnalyzeModel[]>
}