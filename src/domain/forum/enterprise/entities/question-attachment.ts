import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface QuestionAttachmentProps {
  questionId: string
  attachmentId: string
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  static create(props: QuestionAttachmentProps, id?: UniqueEntityID) {
    const questionAttachment = new QuestionAttachment(props, id)

    return questionAttachment
  }

  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }
}
