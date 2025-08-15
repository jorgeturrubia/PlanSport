# JavaScript Style Guide

## Context
JavaScript coding standards and best practices for Agent OS projects.

## Core Conventions

### File Organization
- Use kebab-case for file names: `user-profile.js`
- Keep files focused on a single responsibility
- Use index.js for barrel exports

### Variable Declarations
```javascript
// Use const by default
const userName = 'john_doe';

// Use let when reassignment is needed
let isActive = false;

// Avoid var entirely
// var deprecated = 'use const/let instead';
```

### Function Definitions
```javascript
// Prefer arrow functions for callbacks
const users = data.map(item => item.user);

// Use function declarations for top-level functions
function processUserData(userData) {
  return userData.filter(user => user.isActive);
}

// Use async/await over promises
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}
```

### Object and Array Handling
```javascript
// Use destructuring
const { name, email } = user;
const [first, second] = items;

// Use spread operator
const newUser = { ...user, isActive: true };
const newItems = [...items, newItem];

// Use template literals
const message = `Hello ${name}, your email is ${email}`;
```

### Error Handling
```javascript
// Always handle errors explicitly
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  logger.error('Operation failed:', error);
  throw new Error(`Operation failed: ${error.message}`);
}
```

### Comments and Documentation
```javascript
/**
 * Calculates user engagement score based on activity metrics
 * @param {Object} user - User object with activity data
 * @param {number} timeframe - Time period in days
 * @returns {number} Engagement score between 0-100
 */
function calculateEngagementScore(user, timeframe) {
  // Implementation details...
}
```

## Framework-Specific Rules

### Angular/TypeScript
- Use TypeScript interfaces for type definitions
- Implement OnInit, OnDestroy lifecycle hooks properly
- Use RxJS operators for reactive programming
- Follow Angular style guide naming conventions

### React
- Use functional components with hooks
- Implement proper dependency arrays in useEffect
- Use React.memo for performance optimization when needed
- Follow React hooks rules

## Testing Guidelines
```javascript
// Use descriptive test names
describe('UserService', () => {
  it('should return active users when filtering by status', async () => {
    // Arrange
    const mockUsers = [/* test data */];
    
    // Act
    const result = await userService.getActiveUsers(mockUsers);
    
    // Assert
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(expect.objectContaining({ isActive: true }));
  });
});
```

## Performance Best Practices
- Avoid deep object nesting (max 3 levels)
- Use early returns to reduce complexity
- Implement proper memoization for expensive calculations
- Use lazy loading for non-critical modules
- Optimize bundle size with tree shaking
