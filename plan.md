# Implementation Plan

## Project Setup & Configuration

- [x] Step 1: Initialize Next.js App with App Router
  - **Task**: Create a new Next.js project with TypeScript, App Router, and static export setup.
  - **Files**:
    - `next.config.js`: Enable static export
    - `app/layout.tsx`: Basic layout shell with `Roboto` font
    - `styles/globals.css`: Global CSS with spacing, typography
  - **Step Dependencies**: None
  - **User Instructions**: Run `npx create-next-app@latest simple-shopping-list-pwa --typescript` and choose App Router.

- [x] Step 2: Add PWA Manifest and Service Worker
  - **Task**: Add manifest, icons, and service worker for offline and installable PWA support.
  - **Files**:
    - `public/manifest.json`: Add metadata, icons, start_url
    - `public/icons/`: Add app icons
    - `service-worker.js`: Basic offline cache
    - `next.config.js`: Copy service worker on build
  - **Step Dependencies**: Step 1

- [x] Step 3: Add Install Prompt Handler
  - **Task**: Handle `beforeinstallprompt`, provide UI to trigger install.
  - **Files**:
    - `hooks/useInstallPrompt.ts`: Capture event
    - `components/InstallPrompt.tsx`: Custom install UI
  - **Step Dependencies**: Step 2

## IndexedDB and Data Layer

- [x] Step 4: Create IndexedDB Wrapper
  - **Task**: Use `idb` or a small custom wrapper for `shopping_items` and `memory_items` schemas.
  - **Files**:
    - `lib/db.ts`: IndexedDB logic with open/store/get/set/remove
  - **Step Dependencies**: Step 1

- [x] Step 5: Implement useShoppingList Hook
  - **Task**: Create a custom hook to load, persist, and update shopping list items from IndexedDB.
  - **Files**:
    - `hooks/useShoppingList.ts`: Load and sync `shopping_items`
  - **Step Dependencies**: Step 4

- [x] Step 6: Implement useMemoryItems Hook
  - **Task**: Hook for loading, adding, deleting and updating `memory_items`.
  - **Files**:
    - `hooks/useMemoryItems.ts`: Handles autocomplete memory
  - **Step Dependencies**: Step 4

## Shopping List Core UI

- [x] Step 7: Create Item and List Components
  - **Task**: Visual UI for list items and toggle/delete actions.
  - **Files**:
    - `components/Item.tsx`: Checkbox, text, delete button
    - `components/List.tsx`: Maps list of items
  - **Step Dependencies**: Step 5

- [ ] Step 8: Implement InputBar with Autocomplete Trigger
  - **Task**: Input bar for adding items, triggers memory lookup.
  - **Files**:
    - `components/InputBar.tsx`: Input field, submit logic
    - `components/Autocomplete.tsx`: Suggestion dropdown
  - **Step Dependencies**: Step 6

- [ ] Step 9: Main Page Integration
  - **Task**: Wire up list display, item logic, input, and autocomplete.
  - **Files**:
    - `app/page.tsx`: Load hooks, render components, wire actions
  - **Step Dependencies**: Step 5, Step 6, Step 7, Step 8

## Autocomplete & Memory Management

- [ ] Step 10: Implement Autocomplete Logic
  - **Task**: Filter `memory_items` by prefix, return sorted matches.
  - **Files**:
    - `hooks/useMemoryItems.ts`: Add prefix filtering method
    - `components/Autocomplete.tsx`: Add select action
  - **Step Dependencies**: Step 6

- [ ] Step 11: Update InputBar for Autocomplete Select
  - **Task**: Handle select from suggestions to autofill input.
  - **Files**:
    - `components/InputBar.tsx`: Add `onSelect` handler
  - **Step Dependencies**: Step 10

- [ ] Step 12: Responsive Layout & Styling
  - **Task**: Mobile-first layout, sticky input bar, spacing styles.
  - **Files**:
    - `styles/globals.css`: Add classes and base layout
  - **Step Dependencies**: Step 9

## Weekly Notification Feature

- [x] Step 13: Setup Notification Logic
  - **Task**: Check permission, schedule with timeout, handle reschedule.
  - **Files**:
    - `lib/notify.ts`: Notification setup logic
    - `hooks/useNotification.ts`: Hook to manage settings and schedule
  - **Step Dependencies**: Step 1

- [x] Step 14: Implement SettingsForm
  - **Task**: Time picker, day selector, list of memory items with delete buttons.
  - **Files**:
    - `components/SettingsForm.tsx`: Full settings form
  - **Step Dependencies**: Step 6, Step 13

- [x] Step 15: Settings Page Integration
  - **Task**: Render `SettingsForm`, wire up hooks for memory and notification.
  - **Files**:
    - `app/settings/page.tsx`: Hook + UI wiring
  - **Step Dependencies**: Step 14

- [x] Step 16: Add Time Utilities
  - **Task**: Helpers for next schedule date/time calculation.
  - **Files**:
    - `lib/time.ts`: `getNextTriggerTime(day, hour, minute)`
  - **Step Dependencies**: Step 13

