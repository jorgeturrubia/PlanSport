# Technical Specification: Dashboard Refactor UX/UI

**Date:** 2025-08-07
**Version:** 1.0
**Related Spec:** `../spec.md`

## 1. Technical Requirements
- **Icon Library:** The new icon set should be implemented using `lucide-angular`, which is an approved option in the project's tech stack. This ensures consistency and quality. If not already installed, it should be added as a dependency.
- **Sidebar State Management:** The sidebar's state (e.g., `isCollapsed: boolean`) will be managed within the `LayoutComponent` or a dedicated `LayoutService` to allow sibling components (Navbar, Sidebar) to interact with the state.
- **CSS Implementation:**
    - TailwindCSS will be used for styling all new components and states.
    - CSS transitions (`transition-all`, `duration-300`, `ease-in-out`) will be applied to the sidebar's width and the main content's margin for a smooth animation.
- **Component Interaction:** The sidebar toggle button, likely housed in the Navbar or the main Layout component, will emit an event or call a service method to update the sidebar's collapsed state.
- **Responsiveness:** The solution must be tested to ensure it works correctly on various screen sizes, especially how the sidebar behaves on mobile vs. desktop.

## 2. External Dependencies
- No new external libraries are required, assuming `lucide-angular` is considered part of the established tech stack.

## 3. Files to be Modified (Estimated)
- **`src/front/sport-agent-front/src/app/core/layout/layout.component.html`**: To orchestrate the sidebar and content area.
- **`src/front/sport-agent-front/src/app/core/layout/layout.component.ts`**: To manage the `isCollapsed` state.
- **`src/front/sport-agent-front/src/app/core/layout/components/sidebar/sidebar.component.html`**: To adjust its own presentation based on the `isCollapsed` input.
- **`src/front/sport-agent-front/src/app/core/layout/components/sidebar/sidebar.component.ts`**: To handle the `@Input()` for the collapsed state.
- **`src/front/sport-agent-front/src/app/core/layout/components/navbar/navbar.component.html`**: To replace icons and possibly house the toggle button.

## 4. Implementation Notes
- The `isCollapsed` state should have a default value.
- When the sidebar is collapsed, the main content area should expand to fill the available space (e.g., by changing `margin-left`).
- The toggle button should change its icon to reflect the action it will perform (e.g., show a "menu" icon when collapsed, and a "x" or "arrow-left" icon when expanded).
