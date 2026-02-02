export interface AnalyzeService {
    run(text: string): Promise<number>
}