import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'
import { Slug } from './value-objects/slug'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { QuestionAttachment } from './question-attachment'

export interface QuestionProps {
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  attachments: QuestionAttachment[]
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends AggregateRoot<QuestionProps> {
  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }

  get authorId(): UniqueEntityID {
    return this.props.authorId
  }

  get bestAnswerId(): UniqueEntityID | undefined {
    return this.props.bestAnswerId
  }

  get title(): string {
    return this.props.title
  }

  get content(): string {
    return this.props.content
  }

  get slug(): Slug {
    return this.props.slug
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.props.createdAt, 'day') <= 3
  }

  get excerpt(): string {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  get attachments(): QuestionAttachment[] {
    return this.props.attachments
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  set attachments(attachments: QuestionAttachment[]) {
    this.props.attachments = attachments
  }
}
