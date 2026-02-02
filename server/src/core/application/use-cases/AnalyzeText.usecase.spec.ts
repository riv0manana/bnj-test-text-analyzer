import { describe, it } from "node:test";
import { expect } from "expect";
import { loadModule } from "../../container";
import { AnalyseUseCase } from "./AnalyzeText.usecase";

const usecase = loadModule<AnalyseUseCase>('AnalyseUseCase');

describe('AnalyseUseCase', () => {
    const text = 'Test'
    it('Analyze should run and return instance', async () => {
        const res = await usecase.run(text);
        expect(res).toBeDefined();
        expect(res.text).toBe(text);
        expect(res.id).toBeDefined();
    })

    it('Should get analyze history', async () => {
        const res = await usecase.getHistory();
        expect(Array.isArray(res)).toBe(true);
        expect(res[0].text).toBe(text);
        expect(res[0].id).toBeDefined();
    })
});
