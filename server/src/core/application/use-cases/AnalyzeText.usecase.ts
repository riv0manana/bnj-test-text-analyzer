import { AnalyzeRepository } from "../ports/analyse.repo";
import { AnalyzeService } from "../ports/analyze.service";

export class AnalyseUseCase {
    constructor(
        private readonly analyzeRepository: AnalyzeRepository,
        private readonly analyzeService: AnalyzeService
    ) {}

    validate(text: string) {
        if (!text) {
            throw new Error('InvalidTextException')
        }
    }

    async run (text: string) {
        this.validate(text);
        const score = await this.analyzeService.run(text)
        const analyze = await this.analyzeRepository.save({ text, score })
        return analyze
    }

    async getHistory () {
        return await this.analyzeRepository.fetch()
    }
}