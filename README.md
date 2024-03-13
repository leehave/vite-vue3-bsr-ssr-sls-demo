## Development Setup

```bash
# install dependencies
$ pnpm install

$ pnpm run dev
$ pnpm run build
$ pnpm run start

# lint test
$ pnpm run lint

# release
$ pnpm run release
```

## Actions setup

**Rule:**

- Any PR opend → `CI:Build test`
- New tag `v*` → `CI:Create Release`
- Release created → `CI:Deploy` → `CI:Execute server script`
