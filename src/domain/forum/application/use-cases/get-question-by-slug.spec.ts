import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

describe('Get Question By Slug', () => {
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository
  let sut: GetQuestionBySlugUseCase

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('any_slug'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'any_slug',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
    expect(question.content).toEqual(newQuestion.content)
    expect(question.slug.value).toEqual(newQuestion.slug.value)
  })
})
