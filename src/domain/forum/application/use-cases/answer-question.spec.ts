import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer Question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      instructorId: 'any_id',
      questionId: 'any_id',
      content: 'any_content',
    })

    expect(answer.id).toBeTruthy()
    expect(answer.content).toEqual('any_content')
    expect(inMemoryAnswersRepository.items[0]).toEqual(answer)
  })
})
