# React Class to Hooks Migration

Migrate the following React class components to functional components using hooks.

## Components to Migrate

### 1. UserProfile (Class Component)
```tsx
class UserProfile extends React.Component<Props, State> {
  state = { user: null, loading: true, error: null };

  componentDidMount() {
    this.fetchUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser();
    }
  }

  componentWillUnmount() {
    this.abortController?.abort();
  }

  async fetchUser() {
    // fetch logic
  }

  render() {
    // render logic
  }
}
```

### 2. FormWithValidation (Class Component)
- Uses setState for form fields
- Has form validation logic
- Handles async submission
- Shows loading/error states

### 3. InfiniteScrollList (Class Component)
- Uses IntersectionObserver
- Manages pagination state
- Cleanup on unmount
- Scroll position restoration

### 4. ThemeProvider (Class Component)
- Uses React Context
- Persists to localStorage
- System preference detection

## Requirements

1. Convert all lifecycle methods to hooks:
   - `componentDidMount` → `useEffect`
   - `componentDidUpdate` → `useEffect` with deps
   - `componentWillUnmount` → `useEffect` cleanup

2. Extract reusable custom hooks:
   - `useFetch` - data fetching with abort
   - `useForm` - form state and validation
   - `useIntersectionObserver` - scroll detection
   - `useLocalStorage` - persistent state

3. Maintain all existing functionality
4. Add TypeScript types for hooks
5. No behavioral changes (tests should pass)

## Custom Hook Signatures

```typescript
function useFetch<T>(url: string): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

function useForm<T>(initial: T, validate: (v: T) => Errors): {
  values: T;
  errors: Errors;
  handleChange: (field: keyof T, value: any) => void;
  handleSubmit: (onSubmit: (v: T) => Promise<void>) => void;
  isSubmitting: boolean;
}
```

## Acceptance Criteria

- [ ] All 4 components converted
- [ ] Custom hooks extracted and typed
- [ ] No functionality regression
- [ ] Proper cleanup in effects
- [ ] Dependencies arrays correct
- [ ] Code is more readable than original
