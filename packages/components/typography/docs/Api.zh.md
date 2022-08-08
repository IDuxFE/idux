## API

### IxTypography

```typescript
type TypographyType = 'success' | 'warning' | 'error' | 'secondary'

interface TypographyOptions {
  type?: TypographyType
  disabled?: boolean
}

type TypographyConfig = TypographyType | TypographyOptions
```
