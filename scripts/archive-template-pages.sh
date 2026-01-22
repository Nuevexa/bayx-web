#!/bin/bash

# BayX Template Pages Archive Script
# This script moves unused template pages to the archived-pages folder

echo "🗂️  Starting BayX Pages Archive Process..."
echo ""

# Create archive directory if it doesn't exist
mkdir -p archived-pages/app

# Counter for archived pages
count=0

# Function to archive a page
archive_page() {
    local page_path="$1"
    if [ -d "src/app/$page_path" ]; then
        echo "📦 Archiving: $page_path"
        mv "src/app/$page_path" "archived-pages/app/"
        ((count++))
    else
        echo "⚠️  Not found: $page_path (skipping)"
    fi
}

echo "Moving Marketing Pages..."
archive_page "affiliates"
archive_page "affiliate-policy"
archive_page "referral-program"
archive_page "our-manifesto"
archive_page "why-choose-us"
archive_page "process"
archive_page "press"

echo ""
echo "Moving Content Pages..."
archive_page "case-study"
archive_page "success-stories"
archive_page "customer"
archive_page "testimonial"
archive_page "use-case"
archive_page "knowledge-base"
archive_page "tutorial"
archive_page "documentation"
archive_page "glossary"
archive_page "whitepaper"
archive_page "changelog"

echo ""
echo "Moving Team & Career Pages..."
archive_page "team"
archive_page "career"

echo ""
echo "Moving Tools & Downloads..."
archive_page "download"
archive_page "brandkit"
archive_page "integration"
archive_page "analytics"

echo ""
echo "Moving Legal Pages (redundant)..."
archive_page "legal"
archive_page "gdpr"
archive_page "security"

echo ""
echo "Moving Auth Pages..."
archive_page "login"
archive_page "signup"

echo ""
echo "✅ Archive Complete!"
echo "📊 Total pages archived: $count"
echo ""
echo "📁 Archived pages location: archived-pages/app/"
echo ""
echo "Active pages remaining:"
echo "  ✓ Home (/)"
echo "  ✓ About"
echo "  ✓ Contact Us"
echo "  ✓ Support"
echo "  ✓ Pricing"
echo "  ✓ Features (+ dynamic)"
echo "  ✓ Blog (+ dynamic)"
echo "  ✓ Early Access"
echo "  ✓ FAQ"
echo "  ✓ Legal Pages (Privacy, Terms, Refund, DPA)"
echo "  ✓ Sanity Studio"
echo ""
echo "🔍 To restore a page, move it back from archived-pages/app/ to src/app/"
