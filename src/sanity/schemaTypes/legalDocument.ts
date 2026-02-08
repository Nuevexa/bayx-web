import { defineField, defineType } from 'sanity'
import { Scale } from 'lucide-react'

export const legalDocument = defineType({
  name: 'legalDocument',
  title: 'Legal Document',
  type: 'document',
  icon: Scale,
  fields: [
    defineField({
      name: 'documentType',
      title: 'Document Type',
      type: 'string',
      options: {
        list: [
          { title: 'Terms of Service', value: 'terms-of-service' },
          { title: 'Privacy Policy', value: 'privacy-policy' },
          { title: 'Refund Policy', value: 'refund-policy' },
          { title: 'Data Processing Agreement', value: 'data-processing-agreement' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      description: 'Select the type of legal document',
    }),
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'E.g., "Terms of Service", "Privacy Policy"',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'Click "Generate" to create URL from title',
    }),
    defineField({
      name: 'version',
      title: 'Version Number',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((version) => {
          if (!version) {return true}
          // Validate semantic versioning format (e.g., 1.0.0, 2.1.3)
          const semverRegex = /^\d+\.\d+\.\d+$/
          return semverRegex.test(version) || 'Version must follow semantic versioning (e.g., 1.0.0)'
        }),
      placeholder: '1.0.0',
      description: 'Semantic version number (e.g., 1.0.0, 1.1.0, 2.0.0)',
    }),
    defineField({
      name: 'effectiveDate',
      title: 'Effective Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      description: 'When this version takes effect',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      readOnly: true,
      description: 'Auto-populated on save',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
      description: 'Brief description for SEO and meta tags (max 200 characters)',
    }),
    defineField({
      name: 'publishStatus',
      title: 'Publication Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'notifyUsers',
      title: 'Notify Users of Changes',
      type: 'boolean',
      initialValue: false,
      description: 'Flag to indicate if users should be notified about this update',
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
      description: 'Introductory text before the main sections',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          title: 'Section',
          fields: [
            {
              name: 'sectionTitle',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Main section title (e.g., "Definitions and Interpretation")',
            },
            {
              name: 'sectionId',
              title: 'Section ID (for anchor links)',
              type: 'slug',
              options: {
                source: 'sectionTitle',
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'sectionContent',
              title: 'Section Content (Optional)',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H4', value: 'h4' },
                    { title: 'H5', value: 'h5' },
                    { title: 'Quote', value: 'blockquote' },
                  ],
                  lists: [
                    { title: 'Bullet', value: 'bullet' },
                    { title: 'Numbered', value: 'number' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Bold', value: 'strong' },
                      { title: 'Italic', value: 'em' },
                      { title: 'Underline', value: 'underline' },
                      { title: 'Code', value: 'code' },
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                          {
                            name: 'href',
                            type: 'url',
                            title: 'URL',
                            validation: (Rule) =>
                              Rule.uri({
                                allowRelative: true,
                                scheme: ['http', 'https', 'mailto', 'tel'],
                              }),
                          },
                          {
                            name: 'openInNewTab',
                            type: 'boolean',
                            title: 'Open in new tab',
                            initialValue: false,
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
              description: 'Content that appears before subsections (optional if you have subsections)',
            },
            {
              name: 'subsections',
              title: 'Subsections',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'subsection',
                  title: 'Subsection',
                  fields: [
                    {
                      name: 'subsectionTitle',
                      title: 'Subsection Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                      description: 'Subsection title (e.g., "Definitions", "Interpretation")',
                    },
                    {
                      name: 'subsectionId',
                      title: 'Subsection ID (for anchor links)',
                      type: 'slug',
                      options: {
                        source: 'subsectionTitle',
                        maxLength: 96,
                      },
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'subsectionContent',
                      title: 'Subsection Content',
                      type: 'array',
                      of: [
                        {
                          type: 'block',
                          styles: [
                            { title: 'Normal', value: 'normal' },
                            { title: 'H5', value: 'h5' },
                            { title: 'Quote', value: 'blockquote' },
                          ],
                          lists: [
                            { title: 'Bullet', value: 'bullet' },
                            { title: 'Numbered', value: 'number' },
                          ],
                          marks: {
                            decorators: [
                              { title: 'Bold', value: 'strong' },
                              { title: 'Italic', value: 'em' },
                              { title: 'Underline', value: 'underline' },
                              { title: 'Code', value: 'code' },
                            ],
                            annotations: [
                              {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                  {
                                    name: 'href',
                                    type: 'url',
                                    title: 'URL',
                                    validation: (Rule) =>
                                      Rule.uri({
                                        allowRelative: true,
                                        scheme: ['http', 'https', 'mailto', 'tel'],
                                      }),
                                  },
                                  {
                                    name: 'openInNewTab',
                                    type: 'boolean',
                                    title: 'Open in new tab',
                                    initialValue: false,
                                  },
                                ],
                              },
                            ],
                          },
                        },
                      ],
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'order',
                      title: 'Display Order',
                      type: 'number',
                      validation: (Rule) => Rule.required().min(1),
                      initialValue: 1,
                      description: 'Order within parent section (e.g., 1 for 1.1, 2 for 1.2)',
                    },
                  ],
                  preview: {
                    select: {
                      title: 'subsectionTitle',
                      order: 'order',
                      parentOrder: 'order',
                    },
                    prepare({ title, order }) {
                      return {
                        title: `${order}. ${title}`,
                        subtitle: 'Subsection',
                      }
                    },
                  },
                },
              ],
              description: 'Subsections under this main section (e.g., 1.1, 1.2, 1.3)',
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
              initialValue: 1,
              description: 'Main section number (e.g., 1, 2, 3)',
            },
          ],
          preview: {
            select: {
              title: 'sectionTitle',
              order: 'order',
              subsections: 'subsections',
            },
            prepare({ title, order, subsections }) {
              const subsectionCount = subsections?.length || 0
              return {
                title: `${order}. ${title}`,
                subtitle: subsectionCount > 0 ? `${subsectionCount} subsection${subsectionCount !== 1 ? 's' : ''}` : 'No subsections',
              }
            },
          },
        },
      ],
      description: 'Main content sections with optional subsections (will generate hierarchical Table of Contents)',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email for Legal Matters',
      type: 'string',
      validation: (Rule) => Rule.email(),
      placeholder: 'legal@bayx.com',
      description: 'Email address for legal inquiries related to this document',
    }),
    defineField({
      name: 'governingLaw',
      title: 'Governing Law / Jurisdiction',
      type: 'string',
      placeholder: 'Delaware, United States',
      description: 'Legal jurisdiction governing this document',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      version: 'version',
      status: 'publishStatus',
      type: 'documentType',
    },
    prepare({ title, version, status, type }) {
      const typeLabels: Record<string, string> = {
        'terms-of-service': 'Terms',
        'privacy-policy': 'Privacy',
        'refund-policy': 'Refund',
        'data-processing-agreement': 'DPA',
      }
      return {
        title: title || typeLabels[type] || 'Legal Document',
        subtitle: `v${version} • ${status === 'published' ? '✓ Published' : '✎ Draft'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Document Type',
      name: 'typeAsc',
      by: [{ field: 'documentType', direction: 'asc' }],
    },
    {
      title: 'Effective Date (Newest First)',
      name: 'effectiveDateDesc',
      by: [{ field: 'effectiveDate', direction: 'desc' }],
    },
    {
      title: 'Version (Newest First)',
      name: 'versionDesc',
      by: [{ field: 'version', direction: 'desc' }],
    },
  ],
})
