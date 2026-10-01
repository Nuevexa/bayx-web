/**
 * Sanity Studio configuration. The Studio is hosted by Sanity (not inside the website),
 * so the website's Cloudflare Worker stays within the free plan's size limit.
 *
 *   npm run studio:dev      run the Studio locally on http://localhost:3333
 *   npm run studio:deploy   publish it to https://<hostname>.sanity.studio
 *
 * The Studio bundle only sees SANITY_STUDIO_* variables, so set
 * SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET (same values as the
 * NEXT_PUBLIC_SANITY_* ones) in .env or your shell before running these.
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_STUDIO_API_VERSION || process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-01'

export default defineConfig({
  name: 'bayx',
  title: 'BayX',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
