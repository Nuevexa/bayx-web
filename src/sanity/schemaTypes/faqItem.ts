import { defineField, defineType } from 'sanity'

export const faqItem = defineType({
    name: 'faqItem',
    title: 'FAQ Item',
    type: 'document',
    fields: [
        defineField({
            name: 'question',
            title: 'Question',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'answer',
            title: 'Answer',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'General', value: 'general' },
                    { title: 'Pricing & Billing', value: 'pricing' },
                    { title: 'Features', value: 'features' },
                    { title: 'Getting Started', value: 'getting-started' },
                    { title: 'Technical', value: 'technical' },
                ],
                layout: 'dropdown',
            },
            initialValue: 'general',
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
            title: 'question',
            category: 'category',
        },
        prepare(selection) {
            const { title, category } = selection
            return {
                title,
                subtitle: category || 'General',
            }
        },
    },
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
})
