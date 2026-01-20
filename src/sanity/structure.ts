import type { StructureResolver } from 'sanity/structure'
import { Scale, BookOpen, HelpCircle, FileText } from 'lucide-react'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Legal & Compliance Section
      S.listItem()
        .title('Legal & Compliance')
        .icon(Scale)
        .child(
          S.list()
            .title('Legal Documents')
            .items([
              S.listItem()
                .title('Terms of Service')
                .icon(FileText)
                .child(
                  S.documentList()
                    .title('Terms of Service Versions')
                    .filter('_type == "legalDocument" && documentType == "terms-of-service"')
                    .defaultOrdering([{ field: 'effectiveDate', direction: 'desc' }])
                ),
              S.listItem()
                .title('Privacy Policy')
                .icon(FileText)
                .child(
                  S.documentList()
                    .title('Privacy Policy Versions')
                    .filter('_type == "legalDocument" && documentType == "privacy-policy"')
                    .defaultOrdering([{ field: 'effectiveDate', direction: 'desc' }])
                ),
              S.listItem()
                .title('Refund Policy')
                .icon(FileText)
                .child(
                  S.documentList()
                    .title('Refund Policy Versions')
                    .filter('_type == "legalDocument" && documentType == "refund-policy"')
                    .defaultOrdering([{ field: 'effectiveDate', direction: 'desc' }])
                ),
              S.listItem()
                .title('Data Processing Agreement')
                .icon(FileText)
                .child(
                  S.documentList()
                    .title('DPA Versions')
                    .filter('_type == "legalDocument" && documentType == "data-processing-agreement"')
                    .defaultOrdering([{ field: 'effectiveDate', direction: 'desc' }])
                ),
            ])
        ),

      // Divider
      S.divider(),

      // Blog Posts
      S.listItem()
        .title('Blog Posts')
        .icon(BookOpen)
        .child(S.documentTypeList('blogPost').title('Blog Posts')),

      // Knowledge Base
      S.listItem()
        .title('Knowledge Base')
        .icon(BookOpen)
        .child(S.documentTypeList('knowledgeBaseArticle').title('Knowledge Base Articles')),

      // FAQ
      S.listItem()
        .title('FAQ')
        .icon(HelpCircle)
        .child(S.documentTypeList('faqItem').title('FAQ Items')),

      // Divider
      S.divider(),

      // All other document types (fallback)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['blogPost', 'knowledgeBaseArticle', 'faqItem', 'legalDocument'].includes(listItem.getId() || '')
      ),
    ])
