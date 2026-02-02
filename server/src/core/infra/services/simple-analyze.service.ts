import { AnalyzeService } from "../../application/ports/analyze.service";

export class SimpleAnalyzeService implements AnalyzeService {

    private blackList: string[] = [];
    private maxScore = 100;
    private minScore = 0;

    constructor() {
        this.blackList = ['fraude', 'illégal', 'faux'];
    }

    private generateScore(text: string) {
        let score = 50;
        if (text.length > 100) {
            score += 20;
        }
        
        this.blackList.forEach(word => {
            if (text.toLocaleLowerCase().includes(word.toLowerCase())) {
                score -= 20;
            }
        })

        if (score <= this.minScore) return this.minScore;
        if (score >= this.maxScore) return this.maxScore;

        return score;
    }

    async run(text: string): Promise<number> {
        return this.generateScore(text);
    }
}