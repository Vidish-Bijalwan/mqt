# Admin Section Management - Implementation Guide

## Overview
This document outlines all the new section management features added to the MQT Admin Panel to allow full control over website content and sections.

## Database Schema

### New Tables Created
1. **travel_routes** - Manage popular itinerary routes
2. **festivals** - Manage Indian festivals and celebrations
3. **domestic_international_experiences** - Manage travel experiences
4. **travel_experiences** - Manage curated travel experiences
5. **why_choose_us_points** - Manage "Why Choose Us" section points
6. **how_it_works_steps** - Manage "How It Works" section steps
7. **newsletter_settings** - Manage newsletter configuration

All tables include:
- `featured` - Boolean to highlight content
- `active` - Boolean to enable/disable content
- `sort_order` - Number for ordering
- `created_at` / `updated_at` - Timestamps

## Admin Routes & Features

### Core Admin Sections
```
/admin/content/travel-routes          - List all travel routes
/admin/content/travel-routes/new       - Create new travel route
/admin/content/travel-routes/:id/edit  - Edit travel route

/admin/content/festivals               - List all festivals
/admin/content/festivals/new           - Create new festival
/admin/content/festivals/:id/edit      - Edit festival
```

### Existing Sections (Already Available)
- **States & UTs** - Manage Indian states and union territories
- **Destinations** - Manage travel destinations
- **Categories** - Manage package categories
- **Packages** - Manage tour packages
- **Blog** - Manage blog posts
- **Testimonials** - Manage customer testimonials
- **FAQs** - Manage frequently asked questions
- **Homepage** - Manage homepage content
- **Site Settings** - Global configuration

## Admin Sidebar Navigation

The updated sidebar now includes all manageable sections grouped under "Content":

```
CONTENT
├── States & UTs
├── Destinations
├── Categories
├── Packages
├── Blog
├── Testimonials
├── FAQs
├── Travel Routes
├── Festivals
├── Homepage
└── Site Settings
```

## Content Hub Dashboard

The Content Hub displays all managed sections with:
- **Item Counts** - Real-time count of items in each section
- **Quick Links** - "View All" button to access items
- **Create New** - Plus button to add new items
- **Visual Categories** - Color-coded sections for easy identification

## Travel Routes Management

### Fields
- **Name** - Route name
- **Slug** - URL-friendly identifier
- **Description** - Detailed description
- **Image** - Featured image (via media picker)
- **Duration** - e.g., "5 days"
- **Difficulty** - Easy / Moderate / Challenging
- **Starting Point** - Route start location
- **Ending Point** - Route end location
- **Best Season** - Optimal travel season
- **Highlights** - Array of route highlights (add/remove)
- **Featured** - Mark as featured on homepage
- **Active** - Publish or draft status

### Features
- Create, read, update, delete routes
- Toggle featured status
- Toggle active/inactive status
- Sort by order
- Add/remove highlights dynamically

## Festivals Management

### Fields
- **Name** - Festival name
- **Slug** - URL-friendly identifier
- **Description** - Festival details
- **Image** - Featured image (via media picker)
- **State** - Associated state/location
- **Month** - Festival month
- **Date Range** - e.g., "Dec 15-31"
- **Significance** - Cultural/religious significance
- **Traditions** - Array of traditions (add/remove)
- **Featured** - Mark as featured on homepage
- **Active** - Publish or draft status

### Features
- Create, read, update, delete festivals
- Toggle featured status
- Toggle active/inactive status
- Sort by order
- Add/remove traditions dynamically

## Future Enhancements

The following sections are prepared in the database schema and can be implemented:

### Ready to Implement
1. **Domestic/International Experiences** - /admin/content/experiences
2. **Travel Experiences** - /admin/content/travel-experiences
3. **Why Choose Us Points** - /admin/content/why-choose-us
4. **How It Works Steps** - /admin/content/how-it-works
5. **Newsletter Settings** - /admin/content/newsletter

## Files Modified/Created

### Created Files
- `src/pages/admin/content/AdminTravelRoutes.tsx` - Travel routes list
- `src/pages/admin/content/TravelRouteForm.tsx` - Travel route form
- `src/pages/admin/content/AdminFestivals.tsx` - Festivals list
- `src/pages/admin/content/FestivalForm.tsx` - Festival form
- `supabase/migrations/0003_sections_management.sql` - Database schema

### Modified Files
- `src/App.tsx` - Added new routes
- `src/components/admin/AdminLayout.tsx` - Updated sidebar navigation
- `src/pages/admin/ContentHub.tsx` - Updated dashboard cards

## How to Add More Sections

To add management for a new section:

1. **Create Database Table** in Supabase migration
2. **Create List Component** (`AdminSectionName.tsx`)
   - Fetch data with React Query
   - Display in table with CRUD buttons
   - Add toggle for featured/active status
3. **Create Form Component** (`SectionNameForm.tsx`)
   - Form fields matching database schema
   - Media picker for images
   - Submit handler to create/update
4. **Add Routes** in `App.tsx`
   - List route
   - New form route
   - Edit form route
5. **Update Sidebar** in `AdminLayout.tsx`
   - Add navigation link
6. **Update ContentHub** in `ContentHub.tsx`
   - Add query for count
   - Add module card

## Accessing the Admin Panel

1. Navigate to `/admin/login`
2. Enter admin credentials
3. Access `/admin/content` for the Content Hub dashboard
4. Click on any section to manage its content
5. Use "Add" button to create new items
6. Click edit/delete icons to modify existing items

## API Integration

All sections are stored in Supabase PostgreSQL database with:
- Real-time updates via Supabase subscriptions
- Row-level security (RLS) enabled
- Proper indexing for performance
- Automatic timestamp tracking

## Best Practices

1. **URL Slugs** - Keep slugs lowercase, use hyphens
2. **Images** - Optimize images before uploading
3. **Featured Items** - Limit featured items for best UX
4. **Sort Order** - Use numeric sort order for consistent ordering
5. **Active Status** - Draft items by setting active=false
6. **Content** - Write clear, SEO-friendly descriptions
