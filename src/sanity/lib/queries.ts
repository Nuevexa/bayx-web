import { defineQuery } from 'next-sanity'

// =====================
// BLOG POST QUERIES
// =====================

// Query to get all blog posts for listing
export const allBlogPostsQuery = defineQuery(`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    author,
    authorImage,
    thumbnail,
    tag,
    readTime,
    publishedAt
  }
`)

// Query to get a single blog post by slug
export const blogPostBySlugQuery = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    author,
    authorImage,
    thumbnail,
    tag,
    readTime,
    publishedAt,
    body
  }
`)

// Query to get featured blog posts (latest 4)
export const featuredBlogPostsQuery = defineQuery(`
  *[_type == "blogPost"] | order(publishedAt desc)[0...4] {
    _id,
    title,
    slug,
    description,
    author,
    authorImage,
    thumbnail,
    tag,
    readTime,
    publishedAt
  }
`)

// Query to get all slugs for static generation
export const allBlogSlugsQuery = defineQuery(`
  *[_type == "blogPost"] {
    "slug": slug.current
  }
`)

// =====================
// KNOWLEDGE BASE QUERIES
// =====================

// Query to get all knowledge base articles
export const allKnowledgeBaseArticlesQuery = defineQuery(`
  *[_type == "knowledgeBaseArticle"] | order(order asc, publishedAt desc) {
    _id,
    title,
    slug,
    category,
    summary,
    publishedAt,
    order
  }
`)

// Query to get a single knowledge base article by slug
export const knowledgeBaseArticleBySlugQuery = defineQuery(`
  *[_type == "knowledgeBaseArticle" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    summary,
    body,
    publishedAt
  }
`)

// Query to get all knowledge base slugs for static generation
export const allKnowledgeBaseSlugsQuery = defineQuery(`
  *[_type == "knowledgeBaseArticle"] {
    "slug": slug.current
  }
`)

// Query to get articles by category
export const knowledgeBaseArticlesByCategoryQuery = defineQuery(`
  *[_type == "knowledgeBaseArticle" && category == $category] | order(order asc) {
    _id,
    title,
    slug,
    category,
    summary,
    publishedAt
  }
`)

// =====================
// FAQ QUERIES
// =====================

// Query to get all FAQ items
export const allFaqItemsQuery = defineQuery(`
  *[_type == "faqItem"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`)

// Query to get FAQ items by category
export const faqItemsByCategoryQuery = defineQuery(`
  *[_type == "faqItem" && category == $category] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`)

// =====================
// LEGAL DOCUMENT QUERIES
// =====================

// Query to get a published legal document by type
export const legalDocumentByTypeQuery = defineQuery(`
  *[_type == "legalDocument" && documentType == $documentType && publishStatus == "published"] | order(effectiveDate desc)[0] {
    _id,
    documentType,
    title,
    slug,
    version,
    effectiveDate,
    lastUpdated,
    summary,
    introduction,
    sections[] {
      sectionTitle,
      sectionId,
      sectionContent,
      subsections[] {
        subsectionTitle,
        subsectionId,
        subsectionContent,
        order
      },
      order
    },
    contactEmail,
    governingLaw
  }
`)

// Query to get all published legal documents
export const allLegalDocumentsQuery = defineQuery(`
  *[_type == "legalDocument" && publishStatus == "published"] | order(documentType asc, effectiveDate desc) {
    _id,
    documentType,
    title,
    slug,
    version,
    effectiveDate,
    summary
  }
`)

// Query to get version history for a specific document type
export const legalDocumentVersionHistoryQuery = defineQuery(`
  *[_type == "legalDocument" && documentType == $documentType] | order(effectiveDate desc) {
    _id,
    version,
    effectiveDate,
    publishStatus,
    summary
  }
`)
