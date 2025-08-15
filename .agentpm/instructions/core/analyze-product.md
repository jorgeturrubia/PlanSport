---
description: Analyze Current Product & Install Agent OS
globs:
alwaysApply: false
version: 1.0
encoding: UTF-8
---

# Analyze Current Product & Install Agent OS

## Overview

Install Agent OS into an existing codebase, analyze current product state and progress.  Builds on plan-product.md

## Pre-flight Check

```bash
# Execute pre-flight check if exists
if [ -f ".agent-os/instructions/meta/pre-flight.md" ]; then
  cat .agent-os/instructions/meta/pre-flight.md
fi
```

## Process Flow

### Step 1: Analyze Existing Codebase

Perform a deep codebase analysis of the current codebase to understand current state before documentation purposes.

#### Analysis Areas:

**Project Structure:**
- Directory organization
- File naming patterns
- Module structure
- Build configuration

**Technology Stack:**
- Frameworks in use
- Dependencies (package.json, Gemfile, requirements.txt, etc.)
- Database systems
- Infrastructure configuration

**Implementation Progress:**
- Completed features
- Work in progress
- Authentication/authorization state
- API endpoints
- Database schema

**Code Patterns:**
- Coding style in use
- Naming conventions
- File organization patterns
- Testing approach

#### Instructions:
- **ACTION**: Thoroughly analyze the existing codebase
- **DOCUMENT**: Current technologies, features, and patterns
- **IDENTIFY**: Architectural decisions already made
- **NOTE**: Development progress and completed work

### Step 2: Gather Product Context

Use the context-fetcher subagent to supplement codebase analysis with business context and future plans.

#### Context Questions:

Based on my analysis of your codebase, I can see you're building [OBSERVED_PRODUCT_TYPE].

To properly set up Agent OS, I need to understand:

1. **Product Vision**: What problem does this solve? Who are the target users?

2. **Current State**: Are there features I should know about that aren't obvious from the code?

3. **Roadmap**: What features are planned next? Any major refactoring planned?

4. **Decisions**: Are there important technical or product decisions I should document?

5. **Team Preferences**: Any coding standards or practices the team follows that I should capture?

#### Instructions:
- **ACTION**: Ask user for product context
- **COMBINE**: Merge user input with codebase analysis
- **PREPARE**: Information for plan-product.md execution

### Step 3: Execute Plan-Product with Context

Execute our standard flow for installing Agent OS in existing products

#### Execution Parameters:
- **Main Idea**: [DERIVED_FROM_ANALYSIS_AND_USER_INPUT]
- **Key Features**: [IDENTIFIED_IMPLEMENTED_AND_PLANNED_FEATURES]
- **Target Users**: [FROM_USER_CONTEXT]
- **Tech Stack**: [DETECTED_FROM_CODEBASE]

#### Execution Command:
```bash
# Load and execute plan-product.md
cat .agent-os/instructions/core/plan-product.md
```

#### Execution Prompt:
I'm installing Agent OS into an existing product. Here's what I've gathered:

**Main Idea**: [SUMMARY_FROM_ANALYSIS_AND_CONTEXT]

**Key Features**:
- Already Implemented: [LIST_FROM_ANALYSIS]
- Planned: [LIST_FROM_USER]

**Target Users**: [FROM_USER_RESPONSE]

**Tech Stack**: [DETECTED_STACK_WITH_VERSIONS]

#### Instructions:
- **ACTION**: Execute plan-product.md with gathered information
- **PROVIDE**: All context as structured input
- **ALLOW**: plan-product.md to create .agent-os/product/ structure

### Step 4: Customize Generated Documentation

Refine the generated documentation to ensure accuracy for the existing product by updating roadmap, tech stack, and decisions based on actual implementation.

#### Customization Tasks:

**Roadmap Adjustment:**
- Mark completed features as done
- Move implemented items to "Phase 0: Already Completed"
- Adjust future phases based on actual progress

**Tech Stack Verification:**
- Verify detected versions are correct
- Add any missing infrastructure details
- Document actual deployment setup

**Decisions Documentation:**
- Add historical decisions that shaped current architecture
- Document why certain technologies were chosen
- Capture any pivots or major changes

#### Roadmap Template:

```markdown
## Phase 0: Already Completed

The following features have been implemented:

- [x] [FEATURE_1] - [DESCRIPTION_FROM_CODE]
- [x] [FEATURE_2] - [DESCRIPTION_FROM_CODE]
- [x] [FEATURE_3] - [DESCRIPTION_FROM_CODE]

## Phase 1: Current Development

- [ ] [IN_PROGRESS_FEATURE] - [DESCRIPTION]

[CONTINUE_WITH_STANDARD_PHASES]
```

### Step 5: Final Verification and Summary

Verify installation completeness and provide clear next steps for the user to start using Agent OS with their existing codebase.

#### Verification Checklist:
- [ ] .agent-os/product/ directory created
- [ ] All product documentation reflects actual codebase
- [ ] Roadmap shows completed and planned features accurately
- [ ] Tech stack matches installed dependencies

#### Summary Template:

## ✅ Agent OS Successfully Installed

I've analyzed your [PRODUCT_TYPE] codebase and set up Agent OS with documentation that reflects your actual implementation.

### What I Found

- **Tech Stack**: [SUMMARY_OF_DETECTED_STACK]
- **Completed Features**: [COUNT] features already implemented
- **Code Style**: [DETECTED_PATTERNS]
- **Current Phase**: [IDENTIFIED_DEVELOPMENT_STAGE]

### What Was Created

- ✓ Product documentation in `.agent-os/product/`
- ✓ Roadmap with completed work in Phase 0
- ✓ Tech stack reflecting actual dependencies

### Next Steps

1. Review the generated documentation in `.agent-os/product/`
2. Make any necessary adjustments to reflect your vision
3. See the Agent OS README for usage instructions: https://github.com/buildermethods/agent-os
4. Start using Agent OS for your next feature:
   ```bash
   cat .agent-os/instructions/core/create-spec.md
   ```

Your codebase is now Agent OS-enabled! 🚀

## Error Handling

### Error Scenarios:

**Scenario: No Clear Structure**
- **Condition**: Cannot determine project type or structure
- **Action**: Ask user for clarification about project

**Scenario: Conflicting Patterns**
- **Condition**: Multiple coding styles detected
- **Action**: Ask user which pattern to document

**Scenario: Missing Dependencies**
- **Condition**: Cannot determine full tech stack
- **Action**: List detected technologies and ask for missing pieces

## Execution Summary

### Final Checklist:
- [ ] Codebase analyzed thoroughly
- [ ] User context gathered
- [ ] plan-product.md executed with proper context
- [ ] Documentation customized for existing product
- [ ] Team can adopt Agent OS workflow
