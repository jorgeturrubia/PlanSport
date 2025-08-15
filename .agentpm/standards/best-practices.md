# Development Best Practices

## Context

Global development guidelines for Agent OS projects.

## Core Principles

```bash
# Check if Core Principles already loaded
if [ "$CORE_PRINCIPLES_LOADED" = "true" ]; then
  echo "Using Core Principles already in context"
else
  echo "Loading Core Principles..."
  CORE_PRINCIPLES_LOADED=true
fi
```

### Keep It Simple
- Implement code in the fewest lines possible
- Avoid over-engineering solutions
- Choose straightforward approaches over clever ones

### Optimize for Readability
- Prioritize code clarity over micro-optimizations
- Write self-documenting code with clear variable names
- Add comments for "why" not "what"

### DRY (Don't Repeat Yourself)
- Extract repeated business logic to private methods
- Extract repeated UI markup to reusable components
- Create utility functions for common operations

### File Structure
- Keep files focused on a single responsibility
- Group related functionality together
- Use consistent naming conventions

## Dependencies

```bash
# Check if task involves choosing an external library
if [ "$TASK_TYPE" = "choosing-external-library" ]; then
  if [ "$DEPENDENCIES_LOADED" = "true" ]; then
    echo "Using Dependencies guidelines already in context"
  else
    echo "Loading Dependencies guidelines..."
    DEPENDENCIES_LOADED=true
  fi
fi
```

### Choose Libraries Wisely
When adding third-party dependencies:
- Select the most popular and actively maintained option
- Check the library's GitHub repository for:
  - Recent commits (within last 6 months)
  - Active issue resolution
  - Number of stars/downloads
  - Clear documentation
