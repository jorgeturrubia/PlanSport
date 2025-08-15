---
description: Common Pre-Flight Steps for Agent OS Instructions
globs:
alwaysApply: false
version: 2.0
encoding: UTF-8
---

# Pre-Flight Rules

## Agent OS Executable Markdown Format

All Agent OS instructions are now in **executable markdown format** with the following conventions:

### Subagent Usage
- **IMPORTANT**: When instructions specify using a subagent (e.g., "Use the context-fetcher subagent"), you MUST use the specified subagent for that step
- Subagent names are clearly specified in plain text (no XML attributes)
- Follow subagent-specific instructions as documented in `claude-code/agents/`

### Process Flow
- Follow step-by-step instructions in numerical order
- Execute bash scripts as provided for conditional logic
- Use templates exactly as specified in markdown code blocks
- Apply formatting rules consistently

### Conditional Logic
```bash
# All conditional logic is now in executable bash format
if [[ "$CONDITION" == "true" ]]; then
  echo "Execute this branch"
else
  echo "Execute alternative branch"
fi
```

### File References
- All file paths use relative references from project root
- Use `.agent-os/` prefix for Agent OS files
- Follow markdown linking conventions

### Templates and Examples
- All templates are in markdown code blocks
- Replace `[PLACEHOLDER]` values with actual content
- Maintain exact formatting as shown in examples

## Important Changes

⚠️ **NO MORE XML**: The system no longer uses XML tags or attributes
✅ **Executable Format**: All instructions are in plain markdown with bash scripts
✅ **Clear Structure**: Steps, conditions, and templates are clearly marked
✅ **Subagent Integration**: Subagent usage is explicitly documented in plain text
