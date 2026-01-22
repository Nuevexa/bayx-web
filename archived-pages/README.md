# Archived Template Pages

This directory contains pages from the NextSaaS template that have been archived and are not actively used in the BayX application.

## Archive Date
January 20, 2026

## Total Archived Pages
29 directories

## Archived Categories

### Marketing Pages (7)
- `affiliates/` - Affiliate program
- `affiliate-policy/` - Affiliate policy
- `referral-program/` - Referral program
- `our-manifesto/` - Company manifesto
- `why-choose-us/` - Why choose us
- `process/` - Process page
- `press/` - Press/media

### Content Pages (14)
- `case-study/` - Case studies (listing + dynamic)
- `success-stories/` - Success stories
- `customer/` - Customers (listing + dynamic)
- `testimonial/` - Testimonials
- `use-case/` - Use cases
- `knowledge-base/` - Knowledge base (listing + dynamic)
- `tutorial/` - Tutorials
- `documentation/` - Documentation
- `glossary/` - Glossary (listing + dynamic)
- `whitepaper/` - Whitepapers (listing + dynamic)
- `changelog/` - Product changelog

### Team & Career (4)
- `team/` - Team listing + individual pages
- `career/` - Careers listing + job postings

### Tools & Downloads (4)
- `download/` - Downloads
- `brandkit/` - Brand assets
- `integration/` - Integrations
- `analytics/` - Analytics

### Legal (3)
- `legal/` - Legal overview (redundant)
- `gdpr/` - GDPR page (redundant)
- `security/` - Security page (redundant)

### Auth (2)
- `login/` - Login page
- `signup/` - Signup page

## Active Pages (Remaining in src/app)

The following 13 pages remain active:
1. Home (`/`)
2. About (`/about`)
3. Contact Us (`/contact-us`)
4. Support (`/support`)
5. Pricing (`/pricing`)
6. Features (`/features` + dynamic routes)
7. Blog (`/blog` + dynamic routes)
8. Early Access (`/early-access`)
9. FAQ (`/faq`)
10. Privacy Policy (`/privacy-policy`)
11. Terms & Conditions (`/terms-conditions`)
12. Refund Policy (`/refund-policy`)
13. Data Processing Agreement (`/data-processing-agreement`)
14. Sanity Studio (`/bayx-admin-x9k2m`)

## Restoring a Page

To restore any archived page:

```bash
# Move the page back to src/app
mv archived-pages/app/[page-name] src/app/

# Example: Restore login page
mv archived-pages/app/login src/app/
```

## Purpose

These pages were archived (not deleted) to:
- Keep the codebase clean and focused
- Restrict public access to unused template pages
- Preserve code for future reference
- Allow easy restoration if needed

## Note

Accessing these archived pages will now return a 404 error. All internal links to these pages should be removed or updated.
