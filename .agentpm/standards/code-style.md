# Code Style Guide

## Context

Global code style rules for Agent OS projects.

### General Formatting Rules

```bash
# Check if General Formatting section already read in current context
if [[ "$GENERAL_FORMATTING_IN_CONTEXT" == "true" ]]; then
  echo "SKIP: Re-reading this section"
  echo "NOTE: Using General Formatting rules already in context"
else
  echo "READ: The following formatting rules"
fi
```

## General Formatting

### Indentation
- Use 2 spaces for indentation (never tabs)
- Maintain consistent indentation throughout files
- Align nested structures for readability

### Naming Conventions
- **Methods and Variables**: Use snake_case (e.g., `user_profile`, `calculate_total`)
- **Classes and Modules**: Use PascalCase (e.g., `UserProfile`, `PaymentProcessor`)
- **Constants**: Use UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)

### String Formatting
- Use single quotes for strings: `'Hello World'`
- Use double quotes only when interpolation is needed
- Use template literals for multi-line strings or complex interpolation

### Code Comments
- Add brief comments above non-obvious business logic
- Document complex algorithms or calculations
- Explain the "why" behind implementation choices
- Never remove existing comments unless removing the associated code
- Update comments when modifying code to maintain accuracy
- Keep comments concise and relevant

### HTML/CSS/TailwindCSS Style Conditional Loading

```bash
# Check if current task involves HTML, CSS, or TailwindCSS
if [[ "$TASK_INVOLVES_HTML_CSS_TAILWIND" == "true" ]]; then
  if [[ "$HTML_STYLE_IN_CONTEXT" == "true" && "$CSS_STYLE_IN_CONTEXT" == "true" ]]; then
    echo "SKIP: Re-reading these files"
    echo "NOTE: Using HTML/CSS style guides already in context"
  else
    echo "Loading HTML/CSS style guides..."
    
    # Context fetcher strategy
    if [[ "$CURRENT_AGENT" == "claude-code" && "$CONTEXT_FETCHER_EXISTS" == "true" ]]; then
      echo "USE: context-fetcher agent"
      echo "REQUEST: Get HTML formatting rules from code-style/html-style.md"
      echo "REQUEST: Get CSS and TailwindCSS rules from code-style/css-style.md"
      echo "PROCESS: Returned style rules"
    else
      echo "Read the following style guides (only if not already in context):"
      if [[ "$HTML_STYLE_IN_CONTEXT" != "true" ]]; then
        echo "- Read: standards/code-style/html-style.md"
      fi
      if [[ "$CSS_STYLE_IN_CONTEXT" != "true" ]]; then
        echo "- Read: standards/code-style/css-style.md"
      fi
    fi
  fi
else
  echo "SKIP: HTML/CSS style guides not relevant to current task"
fi
```

### JavaScript Style Conditional Loading

```bash
# Check if current task involves JavaScript
if [[ "$TASK_INVOLVES_JAVASCRIPT" == "true" ]]; then
  if [[ "$JAVASCRIPT_STYLE_IN_CONTEXT" == "true" ]]; then
    echo "SKIP: Re-reading this file"
    echo "NOTE: Using JavaScript style guide already in context"
  else
    echo "Loading JavaScript style guide..."
    
    # Context fetcher strategy
    if [[ "$CURRENT_AGENT" == "claude-code" && "$CONTEXT_FETCHER_EXISTS" == "true" ]]; then
      echo "USE: context-fetcher agent"
      echo "REQUEST: Get JavaScript style rules from code-style/javascript-style.md"
      echo "PROCESS: Returned style rules"
    else
      echo "READ: standards/code-style/javascript-style.md"
    fi
  fi
else
  echo "SKIP: JavaScript style guide not relevant to current task"
fi
```
