# Spec Tasks: Dashboard Refactor UX/UI

**Date:** 2025-08-07
**Version:** 1.0
**Related Spec:** `spec.md`

## Task Breakdown

This plan follows a Test-Driven Development (TDD) inspired approach where applicable, prioritizing functionality and then aesthetics.

### Major Task 1: Implement a Functional and Stable Sidebar

- [ ] **1. Implement Sidebar State Management**
    - [ ] 1.1. In `layout.component.ts`, create a public property `isSidebarCollapsed = false;`.
    - [ ] 1.2. Create a public method `toggleSidebar()` that inverts the `isSidebarCollapsed` value.
    - [ ] 1.3. Pass the `isSidebarCollapsed` state to the sidebar and navbar components via `@Input()`.

- [ ] **2. Fix the Sidebar Toggle Button**
    - [ ] 2.1. In `navbar.component.html`, add a new button that calls the `toggleSidebar()` method on the layout component.
    - [ ] 2.2. Style the button with TailwindCSS and use an icon from `lucide-angular` (e.g., `menu` or `x`).
    - [ ] 2.3. Ensure this button is always visible and accessible.

- [ ] **3. Make Sidebar and Content Area Responsive**
    - [ ] 3.1. In `sidebar.component.html`, use `ngClass` to conditionally apply classes that hide/show content based on the `isSidebarCollapsed` input.
    - [ ] 3.2. In `layout.component.html`, use `ngClass` to change the `margin-left` or `grid-template-columns` of the main content area when the sidebar is collapsed.
    - [ ] 3.3. Apply CSS transition classes in `styles.css` or the components' stylesheets to animate the width and margin changes smoothly.

- [ ] **4. Verify Sidebar Functionality**
    - [ ] 4.1. Write or update unit tests for the `LayoutComponent` to verify the state toggling logic.
    - [ ] 4.2. Manually test in the browser to confirm the sidebar expands and collapses correctly, the animation is smooth, and the content resizes without issues.

### Major Task 2: Redesign Navbar with Professional Icons

- [ ] **5. Integrate Icon Library**
    - [ ] 5.1. Verify `lucide-angular` is installed. If not, run `npm install lucide-angular`.
    - [ ] 5.2. Import the necessary `LucideIconsModule` and the specific icons needed into the relevant component module (e.g., `NavbarComponent` or a `SharedModule`).

- [ ] **6. Replace Navbar Icons**
    - [ ] 6.1. Systematically replace each existing `<img>` or `<mat-icon>` in `navbar.component.html` with the new `<lucide-icon>` component.
    - [ ] 6.2. Choose professional and intuitive icons from the Lucide library for each navigation link.
    - [ ] 6.3. Style the icons using TailwindCSS for consistent size, stroke width, and color.

- [ ] **7. Verify Icon Redesign**
    - [ ] 7.1. Manually review the navbar in the browser to ensure all icons are replaced, look professional, and are visually consistent.
    - [ ] 7.2. Check for any alignment or styling issues.
