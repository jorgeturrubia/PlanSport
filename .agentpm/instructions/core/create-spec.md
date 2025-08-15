---
description: Spec Creation Rules for Agent OS
globs:
alwaysApply: false
version: 1.1
encoding: UTF-8
---

# Spec Creation Rules

## Overview

Generate detailed feature specifications aligned with product roadmap and mission.

## Pre-flight Check

```bash
# Execute pre-flight check if exists
if [ -f ".agent-os/instructions/meta/pre-flight.md" ]; then
  cat .agent-os/instructions/meta/pre-flight.md
fi
```

## Process Flow

### Step 1: Spec Initiation

Use the context-fetcher subagent to identify spec initiation method by either finding the next uncompleted roadmap item when user asks "what's next?" or accepting a specific spec idea from the user.

#### Option A Flow:
**Trigger phrases:**
- "what's next?"

**Actions:**
1. CHECK `.agent-os/product/roadmap.md`
2. FIND next uncompleted item
3. SUGGEST item to user
4. WAIT for approval

#### Option B Flow:
- **Trigger**: User describes specific spec idea
- **Accept**: Any format, length, or detail level
- **Proceed**: To context gathering

### Step 2: Context Gathering (Conditional)

Use the context-fetcher subagent to read `.agent-os/product/mission-lite.md` and `.agent-os/product/tech-stack.md` only if not already in context to ensure minimal context for spec alignment.

#### Conditional Logic:
```bash
if [[ "$MISSION_IN_CONTEXT" == "true" && "$TECH_STACK_IN_CONTEXT" == "true" ]]; then
  echo "Skipping context gathering - files already in context"
  # PROCEED to step 3
else
  echo "Reading missing context files"
  # READ only files not already in context:
  # - mission-lite.md (if not in context)
  # - tech-stack.md (if not in context)
  # CONTINUE with context analysis
fi
```

#### Context Analysis:
- **Mission Lite**: Core product purpose and value
- **Tech Stack**: Technical requirements

### Step 3: Requirements Clarification

Use the context-fetcher subagent to clarify scope boundaries and technical considerations by asking numbered questions as needed to ensure clear requirements before proceeding.

#### Clarification Areas:
**Scope:**
- in_scope: what is included
- out_of_scope: what is excluded (optional)

**Technical:**
- functionality specifics
- UI/UX requirements
- integration points

#### Decision Tree:
```bash
if [ "$CLARIFICATION_NEEDED" == "true" ]; then
  echo "Asking numbered questions"
  # ASK numbered_questions
  # WAIT for_user_response
else
  echo "Proceeding to date determination"
fi
```

### Step 4: Date Determination

Use the date-checker subagent to determine the current date in YYYY-MM-DD format for folder naming. The subagent will output today's date which will be used in subsequent steps.

#### Subagent Output:
The date-checker subagent will provide the current date in YYYY-MM-DD format at the end of its response. Store this date for use in folder naming in step 5.

### Step 5: Spec Folder Creation

Use the file-creator subagent to create directory: `.agent-os/specs/YYYY-MM-DD-spec-name/` using the date from step 4.

Use kebab-case for spec name. Maximum 5 words in name.

#### Folder Naming:
- **Format**: `YYYY-MM-DD-spec-name`
- **Date**: Use stored date from step 4
- **Name Constraints**:
  - Max words: 5
  - Style: kebab-case
  - Descriptive: true

#### Example Names:
- `2025-03-15-password-reset-flow`
- `2025-03-16-user-profile-dashboard`
- `2025-03-17-api-rate-limiting`

### Step 6: Create spec.md

Use the file-creator subagent to create the file: `.agent-os/specs/YYYY-MM-DD-spec-name/spec.md` using this template:

#### File Template:
**Header:**
```markdown
# Spec Requirements Document

> Spec: [SPEC_NAME]
> Created: [CURRENT_DATE]
```

**Required sections:**
- Overview
- User Stories
- Spec Scope
- Out of Scope
- Expected Deliverable

#### Section: Overview
**Template:**
```markdown
## Overview

[1-2_SENTENCE_GOAL_AND_OBJECTIVE]
```

**Constraints:**
- Length: 1-2 sentences
- Content: goal and objective

**Example:**
> Implement a secure password reset functionality that allows users to regain account access through email verification. This feature will reduce support ticket volume and improve user experience by providing self-service account recovery.

#### Section: User Stories
**Template:**
```markdown
## User Stories

### [STORY_TITLE]

As a [USER_TYPE], I want to [ACTION], so that [BENEFIT].

[DETAILED_WORKFLOW_DESCRIPTION]
```

**Constraints:**
- Count: 1-3 stories
- Include: workflow and problem solved
- Format: title + story + details

#### Section: Spec Scope
**Template:**
```markdown
## Spec Scope

1. **[FEATURE_NAME]** - [ONE_SENTENCE_DESCRIPTION]
2. **[FEATURE_NAME]** - [ONE_SENTENCE_DESCRIPTION]
```

**Constraints:**
- Count: 1-5 features
- Format: numbered list
- Description: one sentence each

#### Section: Out of Scope
**Template:**
```markdown
## Out of Scope

- [EXCLUDED_FUNCTIONALITY_1]
- [EXCLUDED_FUNCTIONALITY_2]
```

**Purpose:** Explicitly exclude functionalities

#### Section: Expected Deliverable
**Template:**
```markdown
## Expected Deliverable

1. [TESTABLE_OUTCOME_1]
2. [TESTABLE_OUTCOME_2]
```

**Constraints:**
- Count: 1-3 expectations
- Focus: browser-testable outcomes

### Step 7: Create spec-lite.md

Use the file-creator subagent to create the file: `.agent-os/specs/YYYY-MM-DD-spec-name/spec-lite.md` for the purpose of establishing a condensed spec for efficient AI context usage.

#### File Template:
**Header:**
```markdown
# Spec Summary (Lite)
```

#### Content Structure:
**Spec Summary:**
- Source: Step 6 spec.md overview section
- Length: 1-3 sentences
- Content: core goal and objective of the feature

**Content Template:**
```
[1-3_SENTENCES_SUMMARIZING_SPEC_GOAL_AND_OBJECTIVE]
```

**Example:**
> Implement secure password reset via email verification to reduce support tickets and enable self-service account recovery. Users can request a reset link, receive a time-limited token via email, and set a new password following security best practices.

### Step 8: Create Technical Specification

Use the file-creator subagent to create the file: `sub-specs/technical-spec.md` using this template:

#### File Template:
**Header:**
```markdown
# Technical Specification

This is the technical specification for the spec detailed in .agent-os/specs/YYYY-MM-DD-spec-name/spec.md
```

#### Spec Sections:
**Technical Requirements:**
- functionality details
- UI/UX specifications
- integration requirements
- performance criteria

**External Dependencies (Conditional):**
- only include if new dependencies needed
- new libraries/packages
- justification for each
- version requirements

#### Example Template:
```markdown
## Technical Requirements

- [SPECIFIC_TECHNICAL_REQUIREMENT]
- [SPECIFIC_TECHNICAL_REQUIREMENT]

## External Dependencies (Conditional)

[ONLY_IF_NEW_DEPENDENCIES_NEEDED]
- **[LIBRARY_NAME]** - [PURPOSE]
- **Justification:** [REASON_FOR_INCLUSION]
```

#### Conditional Logic:
```bash
if [ "$SPEC_REQUIRES_NEW_DEPENDENCIES" == "true" ]; then
  echo "Including External Dependencies section"
else
  echo "Omitting External Dependencies section entirely"
fi
```

### Step 9: Create Database Schema (Conditional)

Use the file-creator subagent to create the file: `sub-specs/database-schema.md` ONLY IF database changes needed for this task.

#### Decision Tree:
```bash
if [ "$SPEC_REQUIRES_DATABASE_CHANGES" == "true" ]; then
  echo "Creating sub-specs/database-schema.md"
else
  echo "Skipping database schema step"
fi
```

#### File Template:
**Header:**
```markdown
# Database Schema

This is the database schema implementation for the spec detailed in .agent-os/specs/YYYY-MM-DD-spec-name/spec.md
```

#### Schema Sections:
**Changes:**
- new tables
- new columns
- modifications
- migrations

**Specifications:**
- exact SQL or migration syntax
- indexes and constraints
- foreign key relationships

**Rationale:**
- reason for each change
- performance considerations
- data integrity rules

### Step 10: Create API Specification (Conditional)

Use the file-creator subagent to create file: `sub-specs/api-spec.md` ONLY IF API changes needed.

#### Decision Tree:
```bash
if [ "$SPEC_REQUIRES_API_CHANGES" == "true" ]; then
  echo "Creating sub-specs/api-spec.md"
else
  echo "Skipping API specification step"
fi
```

#### File Template:
**Header:**
```markdown
# API Specification

This is the API specification for the spec detailed in .agent-os/specs/YYYY-MM-DD-spec-name/spec.md
```

#### API Sections:
**Routes:**
- HTTP method
- endpoint path
- parameters
- response format

**Controllers:**
- action names
- business logic
- error handling

**Purpose:**
- endpoint rationale
- integration with features

#### Endpoint Template:
```markdown
## Endpoints

### [HTTP_METHOD] [ENDPOINT_PATH]

**Purpose:** [DESCRIPTION]
**Parameters:** [LIST]
**Response:** [FORMAT]
**Errors:** [POSSIBLE_ERRORS]
```

### Step 11: User Review

Request user review of spec.md and all sub-specs files, waiting for approval or revision requests before proceeding to task creation.

#### Review Request:
```
I've created the spec documentation:

- Spec Requirements: .agent-os/specs/YYYY-MM-DD-spec-name/spec.md
- Spec Summary: .agent-os/specs/YYYY-MM-DD-spec-name/spec-lite.md
- Technical Spec: .agent-os/specs/YYYY-MM-DD-spec-name/sub-specs/technical-spec.md
[LIST_OTHER_CREATED_SPECS]

Please review and let me know if any changes are needed before I create the task breakdown.
```

### Step 12: Create tasks.md

Use the file-creator subagent to await user approval from step 11 and then create file: `tasks.md`

#### File Template:
**Header:**
```markdown
# Spec Tasks
```

#### Task Structure:
**Major Tasks:**
- Count: 1-5
- Format: numbered checklist
- Grouping: by feature or component

**Subtasks:**
- Count: up to 8 per major task
- Format: decimal notation (1.1, 1.2)
- First subtask: typically write tests
- Last subtask: verify all tests pass

#### Task Template:
```markdown
## Tasks

- [ ] 1. [MAJOR_TASK_DESCRIPTION]
  - [ ] 1.1 Write tests for [COMPONENT]
  - [ ] 1.2 [IMPLEMENTATION_STEP]
  - [ ] 1.3 [IMPLEMENTATION_STEP]
  - [ ] 1.4 Verify all tests pass

- [ ] 2. [MAJOR_TASK_DESCRIPTION]
  - [ ] 2.1 Write tests for [COMPONENT]
  - [ ] 2.2 [IMPLEMENTATION_STEP]
```

#### Ordering Principles:
- Consider technical dependencies
- Follow TDD approach
- Group related functionality
- Build incrementally

### Step 13: Decision Documentation (Conditional)

Evaluate strategic impact without loading decisions.md and update it only if there's significant deviation from mission/roadmap and user approves.

#### Conditional Reads:
```bash
if [[ "$MISSION_IN_CONTEXT" != "true" ]]; then
  echo "Use context-fetcher subagent"
  echo "Request: Get product pitch from mission-lite.md"
fi

if [[ "$ROADMAP_IN_CONTEXT" != "true" ]]; then
  echo "Use context-fetcher subagent"
  echo "Request: Get current development phase from roadmap.md"
fi
```

#### Manual Reads:
**Mission Lite:**
- IF NOT already in context: READ `.agent-os/product/mission-lite.md`
- IF already in context: SKIP reading

**Roadmap:**
- IF NOT already in context: READ `.agent-os/product/roadmap.md`
- IF already in context: SKIP reading

**Decisions:**
- NEVER load decisions.md into context

#### Decision Analysis:
**Review Against:**
- `.agent-os/product/mission-lite.md` (conditional)
- `.agent-os/product/roadmap.md` (conditional)

**Criteria:**
- significantly deviates from mission in mission-lite.md
- significantly changes or conflicts with roadmap.md

#### Decision Tree:
```bash
if [ "$SPEC_SIGNIFICANTLY_DEVIATES" != "true" ]; then
  echo "SKIP this entire step"
  echo "STATE: Spec aligns with mission and roadmap"
  echo "PROCEED to step 14"
else
  echo "EXPLAIN the significant deviation"
  echo "ASK user: This spec significantly deviates from our mission/roadmap. Should I draft a decision entry?"
  if [ "$USER_APPROVES" == "true" ]; then
    echo "DRAFT decision entry"
    echo "UPDATE decisions.md"
  else
    echo "SKIP updating decisions.md"
    echo "PROCEED to step 14"
  fi
fi
```

#### Decision Template:
```markdown
## [CURRENT_DATE]: [DECISION_TITLE]

**ID:** DEC-[NEXT_NUMBER]
**Status:** Accepted
**Category:** [technical/product/business/process]
**Related Spec:** .agent-os/specs/YYYY-MM-DD-spec-name/

### Decision

[DECISION_SUMMARY]

### Context

[WHY_THIS_DECISION_WAS_NEEDED]

### Deviation

[SPECIFIC_DEVIATION_FROM_MISSION_OR_ROADMAP]
```

### Step 14: Execution Readiness Check

Evaluate readiness to begin implementation after completing all previous steps, presenting the first task summary and requesting user confirmation to proceed.

#### Readiness Summary:
**Present to User:**
- Spec name and description
- First task summary from tasks.md
- Estimated complexity/scope
- Key deliverables for task 1

#### Execution Prompt:
```
PROMPT: "The spec planning is complete. The first task is:

**Task 1:** [FIRST_TASK_TITLE]
[BRIEF_DESCRIPTION_OF_TASK_1_AND_SUBTASKS]

Would you like me to proceed with implementing Task 1? I will focus only on this first task and its subtasks unless you specify otherwise.

Type 'yes' to proceed with Task 1, or let me know if you'd like to review or modify the plan first."
```

#### Execution Flow:
```bash
if [ "$USER_CONFIRMS" == "yes" ]; then
  echo "REFERENCE: ~/.agent-os/instructions/core/execute-tasks.md"
  echo "FOCUS: Only Task 1 and its subtasks"
  echo "CONSTRAINT: Do not proceed to additional tasks without explicit user request"
else
  echo "WAIT: For user clarification or modifications"
fi
```

## Execution Standards

#### Follow:
- `.agent-os/product/code-style.md`
- `.agent-os/product/dev-best-practices.md`
- `.agent-os/product/tech-stack.md`

#### Maintain:
- Consistency with product mission
- Alignment with roadmap
- Technical coherence

#### Create:
- Comprehensive documentation
- Clear implementation path
- Testable outcomes

## Final Checklist

#### Verify:
- [ ] Accurate date determined via file system
- [ ] Spec folder created with correct date prefix
- [ ] spec.md contains all required sections
- [ ] All applicable sub-specs created
- [ ] User approved documentation
- [ ] tasks.md created with TDD approach
- [ ] Cross-references added to spec.md
- [ ] Strategic decisions evaluated
