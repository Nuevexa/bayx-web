import { defineField, defineType } from 'sanity'

export const knowledgeBaseArticle = defineType({
    name: 'knowledgeBaseArticle',
    title: 'Knowledge Base Article',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Getting Started', value: 'getting-started' },
                    { title: 'Jobs & Workflow', value: 'jobs-workflow' },
                    { title: 'Billing & Payments', value: 'billing' },
                    { title: 'Technicians', value: 'technicians' },
                    { title: 'Customers', value: 'customers' },
                    { title: 'Troubleshooting', value: 'troubleshooting' },
                ],
                layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'summary',
            title: 'Summary',
            type: 'text',
            rows: 2,
            description: 'Short description shown in search results and article previews',
            validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
            name: 'body',
            title: 'Body Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                            { title: 'Code', value: 'code' },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
            ],
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first',
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            category: 'category',
        },
        prepare(selection) {
            const { title, category } = selection
            const categoryLabels: Record<string, string> = {
                'getting-started': 'Getting Started',
                'jobs-workflow': 'Jobs & Workflow',
                'billing': 'Billing & Payments',
                'technicians': 'Technicians',
                'customers': 'Customers',
                'troubleshooting': 'Troubleshooting',
            }
            return {
                title,
                subtitle: categoryLabels[category] || category,
            }
        },
    },
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
        {
            title: 'Title',
            name: 'titleAsc',
            by: [{ field: 'title', direction: 'asc' }],
        },
    ],
})
