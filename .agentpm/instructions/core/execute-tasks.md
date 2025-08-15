---
description: Rules to initiate execution of a set of tasks using Agent OS
globs:
alwaysApply: false
version: 1.0
encoding: UTF-8
---

# Task Execution Rules

## Overview

Initiate execution of one or more tasks for a given spec.

## Pre-flight Check

```bash
# Execute pre-flight check if exists
if [ -f ".agent-os/instructions/meta/pre-flight.md" ]; then
  cat .agent-os/instructions/meta/pre-flight.md
fi
```

## Process Flow

### Step 1: Task Assignment

Identify which tasks to execute from the spec (using spec_srd_reference file path and optional specific_tasks array), defaulting to the next uncompleted parent task if not specified.

#### Task Selection:
- **Explicit**: User specifies exact task(s)
- **Implicit**: Find next uncompleted task in tasks.md

#### Instructions:
- **ACTION**: Identify task(s) to execute
- **DEFAULT**: Select next uncompleted parent task if not specified
- **CONFIRM**: Task selection with user

### Step 2: Context Analysis

Use the context-fetcher subagent to gather minimal context for task understanding by always loading spec tasks.md, and conditionally loading `.agent-os/product/mission-lite.md`, spec-lite.md, and sub-specs/technical-spec.md if not already in context.

#### Instructions:
- **ACTION**: Use context-fetcher subagent to:
  - **REQUEST**: "Get product pitch from mission-lite.md"
  - **REQUEST**: "Get spec summary from spec-lite.md"
  - **REQUEST**: "Get technical approach from technical-spec.md"
- **PROCESS**: Returned information

#### Context Gathering:
**Essential Docs:**
- tasks.md for task breakdown

**Conditional Docs:**
- mission-lite.md for product alignment
- spec-lite.md for feature summary
- technical-spec.md for implementation details

### Step 3: Check for Development Server

Check for any running development server and ask user permission to shut it down if found to prevent port conflicts.

#### Server Check Flow:
```bash
if [ "$SERVER_RUNNING" == "true" ]; then
  echo "A development server is currently running."
  echo "Should I shut it down before proceeding? (yes/no)"
  # ASK user to shut down
  # WAIT for response
else
  echo "No development server detected, proceeding immediately"
fi
```

#### User Prompt:
```
A development server is currently running.
Should I shut it down before proceeding? (yes/no)
```

#### Instructions:
- **ACTION**: Check for running local development server
- **CONDITIONAL**: Ask permission only if server is running
- **PROCEED**: Immediately if no server detected

### Step 4: Git Branch Management

Use the git-workflow subagent to manage git branches to ensure proper isolation by creating or switching to the appropriate branch for the spec.

#### Instructions:
- **ACTION**: Use git-workflow subagent
- **REQUEST**: "Check and manage branch for spec: [SPEC_FOLDER]
  - Create branch if needed
  - Switch to correct branch
  - Handle any uncommitted changes"
- **WAIT**: For branch setup completion

#### Branch Naming:
- **Source**: Spec folder name
- **Format**: Exclude date prefix
- **Example**:
  - Folder: `2025-03-15-password-reset`
  - Branch: `password-reset`

### Step 5: Task Execution Loop

Execute all assigned parent tasks and their subtasks using `.agent-os/instructions/core/execute-task.md` instructions, continuing until all tasks are complete.

#### Execution Flow:
```bash
# LOAD .agent-os/instructions/core/execute-task.md ONCE

for parent_task in "${ASSIGNED_TASKS[@]}"; do
  echo "Executing task: $parent_task"
  # EXECUTE instructions from execute-task.md with:
  #   - parent_task_number
  #   - all associated subtasks
  # WAIT for task completion
  # UPDATE tasks.md status
done
```

#### Loop Logic:
**Continue Conditions:**
- More unfinished parent tasks exist
- User has not requested stop

**Exit Conditions:**
- All assigned tasks marked complete
- User requests early termination
- Blocking issue prevents continuation

#### Task Status Check:
```bash
# AFTER each task execution:
check_remaining_tasks() {
  # CHECK tasks.md for remaining tasks
  if [ "$ALL_ASSIGNED_TASKS_COMPLETE" == "true" ]; then
    echo "PROCEED to next step"
  else
    echo "CONTINUE with next task"
  fi
}
```

#### Instructions:
- **ACTION**: Load execute-task.md instructions once at start
- **REUSE**: Same instructions for each parent task iteration
- **LOOP**: Through all assigned parent tasks
- **UPDATE**: Task status after each completion
- **VERIFY**: All tasks complete before proceeding
- **HANDLE**: Blocking issues appropriately

### Step 6: Run All Tests

Use the test-runner subagent to run the entire test suite to ensure no regressions and fix any failures until all tests pass.

#### Instructions:
- **ACTION**: Use test-runner subagent
- **REQUEST**: "Run the full test suite"
- **WAIT**: For test-runner analysis
- **PROCESS**: Fix any reported failures
- **REPEAT**: Until all tests pass

#### Test Execution:
**Order:**
1. Run entire test suite
2. Fix any failures

**Requirement:** 100% pass rate

#### Failure Handling:
- **Action**: Troubleshoot and fix
- **Priority**: Before proceeding

### Step 7: Git Workflow

Use the git-workflow subagent to create git commit, push to GitHub, and create pull request for the implemented features.

#### Instructions:
- **ACTION**: Use git-workflow subagent
- **REQUEST**: "Complete git workflow for [SPEC_NAME] feature:
  - Spec: [SPEC_FOLDER_PATH]
  - Changes: All modified files
  - Target: main branch
  - Description: [SUMMARY_OF_IMPLEMENTED_FEATURES]"
- **WAIT**: For workflow completion
- **PROCESS**: Save PR URL for summary

#### Commit Process:
**Commit:**
- Message: Descriptive summary of changes
- Format: Conventional commits if applicable

**Push:**
- Target: Spec branch
- Remote: origin

**Pull Request:**
- Title: Descriptive PR title
- Description: Functionality recap

### Step 8: Roadmap Progress Check (Conditional)

Check `.agent-os/product/roadmap.md` (if not in context) and update roadmap progress only if the executed tasks may have completed a roadmap item and the spec completes that item.

#### Conditional Execution:
```bash
# Preliminary check
if [ "$TASKS_POTENTIALLY_COMPLETE_ROADMAP_ITEM" != "true" ]; then
  echo "SKIP this entire step"
  echo "PROCEED to step 9"
else
  echo "CONTINUE with roadmap check"
fi
```

#### Conditional Loading:
```bash
if [[ "$ROADMAP_IN_CONTEXT" != "true" ]]; then
  echo "LOAD .agent-os/product/roadmap.md"
else
  echo "SKIP loading (use existing context)"
fi
```

#### Roadmap Criteria:
**Update When:**
- Spec fully implements roadmap feature
- All related tasks completed
- Tests passing

**Caution:** Only mark complete if absolutely certain

#### Instructions:
- **ACTION**: First evaluate if roadmap check is needed
- **SKIP**: If tasks clearly don't complete roadmap items
- **CHECK**: If roadmap.md already in context
- **LOAD**: Only if needed and not in context
- **EVALUATE**: If current spec completes roadmap goals
- **UPDATE**: Mark roadmap items complete if applicable
- **VERIFY**: Certainty before marking complete

### Step 9: Task Completion Notification

Play a system sound to alert the user that tasks are complete.

#### Notification Command:
```bash
# macOS
afplay /System/Library/Sounds/Glass.aiff

# Windows (alternative)
# powershell -c "[console]::beep(800,200)"

# Linux (alternative)
# paplay /usr/share/sounds/alsa/Front_Left.wav 2>/dev/null || echo -e '\a'
```

#### Instructions:
- **ACTION**: Play completion sound
- **PURPOSE**: Alert user that task is complete

### Step 10: Completion Summary

Create a structured summary message with emojis showing what was done, any issues, testing instructions, and PR link.

#### Summary Template:
```markdown
## ✅ What's been done

1. **[FEATURE_1]** - [ONE_SENTENCE_DESCRIPTION]
2. **[FEATURE_2]** - [ONE_SENTENCE_DESCRIPTION]

## ⚠️ Issues encountered

[ONLY_IF_APPLICABLE]
- **[ISSUE_1]** - [DESCRIPTION_AND_REASON]

## 👀 Ready to test in browser

[ONLY_IF_APPLICABLE]
1. [STEP_1_TO_TEST]
2. [STEP_2_TO_TEST]

## 📦 Pull Request

View PR: [GITHUB_PR_URL]
```

#### Summary Sections:
**Required:**
- Functionality recap
- Pull request info

**Conditional:**
- Issues encountered (if any)
- Testing instructions (if testable in browser)

#### Instructions:
- **ACTION**: Create comprehensive summary
- **INCLUDE**: All required sections
- **ADD**: Conditional sections if applicable
- **FORMAT**: Use emoji headers for scannability

## Error Handling

#### Error Protocols:
**Blocking Issues:**
- Document in tasks.md
- Mark with ⚠️ emoji
- Include in summary

**Test Failures:**
- Fix before proceeding
- Never commit broken tests

**Technical Roadblocks:**
- Attempt 3 approaches
- Document if unresolved
- Seek user input

## Final Checklist

#### Verify:
- [ ] Task implementation complete
- [ ] All tests passing
- [ ] tasks.md updated
- [ ] Code committed and pushed
- [ ] Pull request created
- [ ] Roadmap checked/updated
- [ ] Summary provided to user
