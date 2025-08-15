---
description: Rules to execute a task and its sub-tasks using Agent OS
globs:
alwaysApply: false
version: 1.0
encoding: UTF-8
---

# Task Execution Rules

## Overview

Execute a specific task along with its sub-tasks systematically following a TDD development workflow.

## Pre-flight Check

```bash
# Execute pre-flight check if exists
if [ -f ".agent-os/instructions/meta/pre-flight.md" ]; then
  cat .agent-os/instructions/meta/pre-flight.md
fi
```

## Process Flow

### Step 1: Task Understanding

Read and analyze the given parent task and all its sub-tasks from tasks.md to gain complete understanding of what needs to be built.

#### Task Analysis:
**Read from tasks.md:**
- Parent task description
- All sub-task descriptions
- Task dependencies
- Expected outcomes

#### Instructions:
- **ACTION**: Read the specific parent task and all its sub-tasks
- **ANALYZE**: Full scope of implementation required
- **UNDERSTAND**: Dependencies and expected deliverables
- **NOTE**: Test requirements for each sub-task

### Step 2: Technical Specification Review

Search and extract relevant sections from technical-spec.md to understand the technical implementation approach for this task.

#### Selective Reading:
**Search technical-spec.md for:**
- Current task functionality
- Implementation approach for this feature
- Integration requirements
- Performance criteria

#### Instructions:
- **ACTION**: Search technical-spec.md for task-relevant sections
- **EXTRACT**: Only implementation details for current task
- **SKIP**: Unrelated technical specifications
- **FOCUS**: Technical approach for this specific feature

### Step 3: Best Practices Review

Use the context-fetcher subagent to retrieve relevant sections from `.agent-os/standards/best-practices.md` that apply to the current task's technology stack and feature type.

#### Selective Reading:
**Search best-practices.md for:**
- Task's technology stack
- Feature type being implemented
- Testing approaches needed
- Code organization patterns

#### Instructions:
- **ACTION**: Use context-fetcher subagent
- **REQUEST**: "Find best practices sections relevant to:
  - Task's technology stack: [CURRENT_TECH]
  - Feature type: [CURRENT_FEATURE_TYPE]
  - Testing approaches needed
  - Code organization patterns"
- **PROCESS**: Returned best practices
- **APPLY**: Relevant patterns to implementation

### Step 4: Code Style Review

Use the context-fetcher subagent to retrieve relevant code style rules from `.agent-os/standards/code-style.md` for the languages and file types being used in this task.

#### Selective Reading:
**Search code-style.md for:**
- Languages used in this task
- File types being modified
- Component patterns being implemented
- Testing style guidelines

#### Instructions:
- **ACTION**: Use context-fetcher subagent
- **REQUEST**: "Find code style rules for:
  - Languages: [LANGUAGES_IN_TASK]
  - File types: [FILE_TYPES_BEING_MODIFIED]
  - Component patterns: [PATTERNS_BEING_IMPLEMENTED]
  - Testing style guidelines"
- **PROCESS**: Returned style rules
- **APPLY**: Relevant formatting and patterns

### Step 5: Task and Sub-task Execution

Execute the parent task and all sub-tasks in order using test-driven development (TDD) approach.

#### Typical Task Structure:
- **First sub-task**: Write tests for [feature]
- **Middle sub-tasks**: Implementation steps
- **Final sub-task**: Verify all tests pass

#### Execution Order:

**Sub-task 1 - Tests:**
```bash
if [[ "$SUBTASK_1" == *"Write tests"* ]]; then
  echo "Writing all tests for the parent feature"
  # Include unit tests, integration tests, edge cases
  # Run tests to ensure they fail appropriately
  # Mark sub-task 1 complete
fi
```

**Middle Sub-tasks - Implementation:**
```bash
for subtask in "${MIDDLE_SUBTASKS[@]}"; do
  echo "Implementing: $subtask"
  # Implement the specific functionality
  # Make relevant tests pass
  # Update any adjacent/related tests if needed
  # Refactor while keeping tests green
  # Mark sub-task complete
done
```

**Final Sub-task - Verification:**
```bash
if [[ "$FINAL_SUBTASK" == *"Verify all tests pass"* ]]; then
  echo "Running entire test suite"
  # Fix any remaining failures
  # Ensure no regressions
  # Mark final sub-task complete
fi
```

#### Test Management:
**New Tests:**
- Written in first sub-task
- Cover all aspects of parent feature
- Include edge cases and error handling

**Test Updates:**
- Made during implementation sub-tasks
- Update expectations for changed behavior
- Maintain backward compatibility

#### Instructions:
- **ACTION**: Execute sub-tasks in their defined order
- **RECOGNIZE**: First sub-task typically writes all tests
- **IMPLEMENT**: Middle sub-tasks build functionality
- **VERIFY**: Final sub-task ensures all tests pass
- **UPDATE**: Mark each sub-task complete as finished

### Step 6: Task-Specific Test Verification

Use the test-runner subagent to run and verify only the tests specific to this parent task (not the full test suite) to ensure the feature is working correctly.

#### Focused Test Execution:
**Run Only:**
- All new tests written for this parent task
- All tests updated during this task
- Tests directly related to this feature

**Skip:**
- Full test suite (done later in execute-tasks.md)
- Unrelated test files

#### Final Verification:
```bash
if [ "$TEST_FAILURES" -gt 0 ]; then
  echo "Debug and fix the specific issue"
  # Re-run only the failed tests
else
  echo "All task tests passing"
  # Ready to proceed
fi
```

#### Instructions:
- **ACTION**: Use test-runner subagent
- **REQUEST**: "Run tests for [this parent task's test files]"
- **WAIT**: For test-runner analysis
- **PROCESS**: Returned failure information
- **VERIFY**: 100% pass rate for task-specific tests
- **CONFIRM**: This feature's tests are complete

### Step 7: Task Status Updates

Update the tasks.md file immediately after completing each task to track progress.

#### Update Format:
- **Completed**: `- [x] Task description`
- **Incomplete**: `- [ ] Task description`
- **Blocked**: 
  ```markdown
  - [ ] Task description
  ⚠️ Blocking issue: [DESCRIPTION]
  ```

#### Blocking Criteria:
- **Attempts**: Maximum 3 different approaches
- **Action**: Document blocking issue
- **Emoji**: ⚠️

#### Instructions:
- **ACTION**: Update tasks.md after each task completion
- **MARK**: `[x]` for completed items immediately
- **DOCUMENT**: Blocking issues with ⚠️ emoji
- **LIMIT**: 3 attempts before marking as blocked
