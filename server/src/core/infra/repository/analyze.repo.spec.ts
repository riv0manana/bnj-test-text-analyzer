import { describe, it } from "node:test";
import { expect } from "expect";
import { AnalyzeRepository } from "../../application/ports/analyse.repo";
import { loadModule } from "../../container";

const repo = loadModule<AnalyzeRepository>('AnalyzeRepository');

describe('AnalyzeRepository', () => {
    it('Should save inputs', async () => {
        const res = await repo.save({
            text: 'Test',
            score: 50,
        });
        expect(res.id).toBeDefined();
        expect(res.text).toBe('Test');
        expect(res.score).toBe(50);
    })

    it('Should be able to fetch saved inputs', async () => {
        const res = await repo.fetch();
        expect(Array.isArray(res)).toBe(true);
        expect(res[0].score).toBe(50);
    })
});
