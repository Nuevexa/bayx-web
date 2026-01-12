import { type SchemaTypeDefinition } from 'sanity'
import { blogPost } from './blogPost'
import { knowledgeBaseArticle } from './knowledgeBaseArticle'
import { faqItem } from './faqItem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPost, knowledgeBaseArticle, faqItem],
}
