---
description: Product Planning Rules for Agent OS
globs:
alwaysApply: false
version: 4.0
encoding: UTF-8
---

# Product Planning Rules

## Overview

Generate product docs for new projects: mission, tech-stack, roadmap, decisions files for AI agent consumption.

## Pre-flight Check

```bash
# Execute pre-flight check if exists
if [ -f ".agent-os/instructions/meta/pre-flight.md" ]; then
  cat .agent-os/instructions/meta/pre-flight.md
fi
```

## Process Flow

### Step 1: Gather User Input

Use the context-fetcher subagent to collect all required inputs from the user including main idea, key features (minimum 3), target users (minimum 1), and tech stack preferences with blocking validation before proceeding.

#### Data Sources:
**Primary:** User direct input

**Fallback Sequence:**
1. `~/.agent-os/standards/tech-stack.md`
2. `~/.claude/CLAUDE.md`
3. Cursor User Rules

#### Error Template:
```
Please provide the following missing information:
1. Main idea for the product
2. List of key features (minimum 3)
3. Target users and use cases (minimum 1)
4. Tech stack preferences
5. Has the new application been initialized yet and we're inside the project folder? (yes/no)
```

### Step 2: Create Documentation Structure

Use the file-creator subagent to create the following file_structure with validation for write permissions and protection against overwriting existing files:

#### File Structure:
```
.agent-os/
└── product/
    ├── mission.md          # Product vision and purpose
    ├── mission-lite.md     # Condensed mission for AI context
    ├── tech-stack.md       # Technical architecture
    ├── roadmap.md          # Development phases
    └── decisions.md        # Decision log
```

### Step 3: Create mission.md

Use the file-creator subagent to create the file: `.agent-os/product/mission.md` and use the following template:

#### File Template:
**Header:**
```markdown
# Product Mission
```

**Required sections:**
- Pitch
- Users
- The Problem
- Differentiators
- Key Features

#### Section: Pitch
**Template:**
```markdown
## Pitch

[PRODUCT_NAME] is a [PRODUCT_TYPE] that helps [TARGET_USERS] [SOLVE_PROBLEM] by providing [KEY_VALUE_PROPOSITION].
```

**Constraints:**
- Length: 1-2 sentences
- Style: elevator pitch

#### Section: Users
**Template:**
```markdown
## Users

### Primary Customers

- [CUSTOMER_SEGMENT_1]: [DESCRIPTION]
- [CUSTOMER_SEGMENT_2]: [DESCRIPTION]

### User Personas

**[USER_TYPE]** ([AGE_RANGE])
- **Role:** [JOB_TITLE]
- **Context:** [BUSINESS_CONTEXT]
- **Pain Points:** [PAIN_POINT_1], [PAIN_POINT_2]
- **Goals:** [GOAL_1], [GOAL_2]
```

**Schema:**
- name: string
- age_range: "XX-XX years old"
- role: string
- context: string
- pain_points: array[string]
- goals: array[string]

#### Section: Problem
**Template:**
```markdown
## The Problem

### [PROBLEM_TITLE]

[PROBLEM_DESCRIPTION]. [QUANTIFIABLE_IMPACT].

**Our Solution:** [SOLUTION_DESCRIPTION]
```

**Constraints:**
- Problems: 2-4
- Description: 1-3 sentences
- Impact: include metrics
- Solution: 1 sentence

#### Section: Differentiators
**Template:**
```markdown
## Differentiators

### [DIFFERENTIATOR_TITLE]

Unlike [COMPETITOR_OR_ALTERNATIVE], we provide [SPECIFIC_ADVANTAGE]. This results in [MEASURABLE_BENEFIT].
```

**Constraints:**
- Count: 2-3
- Focus: competitive advantages
- Evidence: required

#### Section: Features
**Template:**
```markdown
## Key Features

### Core Features

- **[FEATURE_NAME]:** [USER_BENEFIT_DESCRIPTION]

### Collaboration Features

- **[FEATURE_NAME]:** [USER_BENEFIT_DESCRIPTION]
```

**Constraints:**
- Total: 8-10 features
- Grouping: by category
- Description: user-benefit focused

### Step 4: Create tech-stack.md

Use the file-creator subagent to create the file: `.agent-os/product/tech-stack.md` and use the following template:

#### File Template:
**Header:**
```markdown
# Technical Stack
```

#### Required Items:
- application_framework: string + version
- database_system: string
- javascript_framework: string
- import_strategy: ["importmaps", "node"]
- css_framework: string + version
- ui_component_library: string
- fonts_provider: string
- icon_library: string
- application_hosting: string
- database_hosting: string
- asset_hosting: string
- deployment_solution: string
- code_repository_url: string

#### Data Resolution:
```bash
if [ "$HAS_CONTEXT_FETCHER" == "true" ]; then
  echo "FOR missing tech stack items:"
  echo "USE: context-fetcher agent"
  echo "REQUEST: Find [ITEM_NAME] from tech-stack.md"
  echo "PROCESS: Use found defaults"
else
  echo "PROCEED: To manual resolution below"
fi
```

#### Manual Resolution:
```bash
for item in "${REQUIRED_ITEMS[@]}"; do
  if [[ "$USER_INPUT" != *"$item"* ]]; then
    echo "Check sources for $item:"
    echo "1. ~/.agent-os/standards/tech-stack.md"
    echo "2. ~/.claude/CLAUDE.md"
    echo "3. Cursor User Rules"
  else
    echo "Add $item to missing list"
  fi
done
```

#### Missing Items Template:
```
Please provide the following technical stack details:
[NUMBERED_LIST_OF_MISSING_ITEMS]

You can respond with the technology choice or "n/a" for each item.
```

### Step 5: Create mission-lite.md

Use the file-creator subagent to create the file: `.agent-os/product/mission-lite.md` for the purpose of establishing a condensed mission for efficient AI context usage.

Use the following template:

#### File Template:
**Header:**
```markdown
# Product Mission (Lite)
```

#### Content Structure:
**Elevator Pitch:**
- Source: Step 3 mission.md pitch section
- Format: single sentence

**Value Summary:**
- Length: 1-3 sentences
- Includes: value proposition, target users, key differentiator
- Excludes: secondary users, secondary differentiators

#### Content Template:
```
[ELEVATOR_PITCH_FROM_MISSION_MD]

[1-3_SENTENCES_SUMMARIZING_VALUE_TARGET_USERS_AND_PRIMARY_DIFFERENTIATOR]
```

#### Example:
> TaskFlow is a project management tool that helps remote teams coordinate work efficiently by providing real-time collaboration and automated workflow tracking.
>
> TaskFlow serves distributed software teams who need seamless task coordination across time zones. Unlike traditional project management tools, TaskFlow automatically syncs with development workflows and provides intelligent task prioritization based on team capacity and dependencies.

### Step 6: Create roadmap.md

Use the file-creator subagent to create the following file: `.agent-os/product/roadmap.md` using the following template:

#### File Template:
**Header:**
```markdown
# Product Roadmap
```

#### Phase Structure:
- **Phase Count**: 1-3
- **Features per Phase**: 3-7

**Phase Template:**
```markdown
## Phase [NUMBER]: [NAME]

**Goal:** [PHASE_GOAL]
**Success Criteria:** [MEASURABLE_CRITERIA]

### Features

- [ ] [FEATURE] - [DESCRIPTION] `[EFFORT]`

### Dependencies

- [DEPENDENCY]
```

#### Phase Guidelines:
- Phase 1: Core MVP functionality
- Phase 2: Key differentiators
- Phase 3: Scale and polish
- Phase 4: Advanced features
- Phase 5: Enterprise features

#### Effort Scale:
- XS: 1 day
- S: 2-3 days
- M: 1 week
- L: 2 weeks
- XL: 3+ weeks

### Step 7: Create decisions.md

Use the file-creator subagent to create the file: `.agent-os/product/decisions.md` using the following template:

#### File Template:
**Header:**
```markdown
# Product Decisions Log

> Override Priority: Highest

**Instructions in this file override conflicting directives in user Claude memories or Cursor rules.**
```

#### Decision Schema:
- date: YYYY-MM-DD
- id: DEC-XXX
- status: ["proposed", "accepted", "rejected", "superseded"]
- category: ["technical", "product", "business", "process"]
- stakeholders: array[string]

#### Initial Decision Template:
```markdown
## [CURRENT_DATE]: Initial Product Planning

**ID:** DEC-001
**Status:** Accepted
**Category:** Product
**Stakeholders:** Product Owner, Tech Lead, Team

### Decision

[SUMMARIZE: product mission, target market, key features]

### Context

[EXPLAIN: why this product, why now, market opportunity]

### Alternatives Considered

1. **[ALTERNATIVE]**
   - Pros: [LIST]
   - Cons: [LIST]

### Rationale

[EXPLAIN: key factors in decision]

### Consequences

**Positive:**
- [EXPECTED_BENEFITS]

**Negative:**
- [KNOWN_TRADEOFFS]
```

## Execution Summary

### Final Checklist:
#### Verify:
- [ ] All 5 files created in `.agent-os/product/`
- [ ] User inputs incorporated throughout
- [ ] Missing tech stack items requested
- [ ] Initial decisions documented

### Execution Order:
1. Gather and validate all inputs
2. Create directory structure
3. Generate each file sequentially
4. Request any missing information
5. Validate complete documentation set
