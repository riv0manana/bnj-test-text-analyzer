import { createContainer } from '@evyweb/ioctopus'

import { PgAnalyzeRepository } from './infra/repository/analyze.repo.pg';
import { SimpleAnalyzeService } from './infra/services/simple-analyze.service';
import { AnalyseUseCase } from './application/use-cases/AnalyzeText.usecase';
import { AnalyzeRepoMock } from './infra/repository/analyze.repo.mock';
import { GPTAnalyser } from './infra/services/gpt-analyzer.service';

const container = createContainer()

const env = process.env.NODE_ENV || 'development';
const isTest = env === 'test';

if (isTest) {
  container.bind('AnalyzeRepository').toValue(new AnalyzeRepoMock)
  container.bind('AnalyzeService').toValue(new SimpleAnalyzeService)
} else {
  container.bind('AnalyzeRepository').toValue(new PgAnalyzeRepository)
  container.bind('AnalyzeService').toValue(process.env.OPENAI_API_KEY ? new GPTAnalyser : new SimpleAnalyzeService)
}

container.bind('AnalyseUseCase').toClass(AnalyseUseCase, [
  'AnalyzeRepository',
  'AnalyzeService',
])

export const loadModule = <T>(name: string) => {
  return container.get(name) as T
}
