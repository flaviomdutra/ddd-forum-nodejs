import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'

describe('Delete Question', () => {
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository
  let sut: DeleteQuestionUseCase

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityID('any-id'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: 'any-id',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })
})
