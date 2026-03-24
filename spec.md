# QR Menu - The Food Train

## Current State
A mobile-first QR menu for "Bella Cucina" (Italian restaurant) with Food/Drinks tabs, sample menu data, and category card grid UI. Search filters categories only.

## Requested Changes (Diff)

### Add
- All 10 new categories: Pizza, Sandwiches, Momos, Chinese Starters, Pasta, Burgers, Burgers Combo, Continental Sides, Soup, Roll
- All items with ₹ pricing extracted from uploaded menu image
- Search that works across all items (flat results when searching)
- Smooth transition into category item view

### Modify
- Restaurant branding: "The Food Train" — Pure Veg. Restaurant, M. 8744000612
- Price display: $ → ₹
- Remove Food/Drinks tabs (all food categories)
- menuData.ts: replace all old categories with new ones, Unsplash images
- Search: filter items across all categories, not just category names

### Remove
- Old Italian menu categories and items
- Food/Drinks tab toggle

## Implementation Plan
1. Update menuData.ts with all 10 categories and extracted items (₹ prices, Unsplash images)
2. Update App.tsx: rebrand to The Food Train, remove tabs, ₹ price display, cross-item search with flat results panel
