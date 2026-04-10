# Contributing to WeRent Backend

Welcome! This guide will help you contribute to WeRent Backend as a beginner.

## Finding an Issue

1. Visit the [GitHub Issues](https://github.com/regencode/WeRent-backend/issues) page
2. Look for issues tagged with labels like `good first issue`, `bug`, or `enhancement`
3. Comment on an issue to claim it before starting work

## Forking and Setting Up

1. Click the **Fork** button on the repository page
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/WeRent-backend.git
cd WeRent-backend
```

3. Add the upstream remote:

```bash
git remote add upstream https://github.com/regencode/WeRent-backend.git
```

## Development Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env` and configure your database:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
```

3. Generate the Prisma client:

```bash
npx prisma generate
```

4. Run the development server:

```bash
npm run start:dev
```

## Making Changes

1. Sync your fork with the main repo to get the latest changes:

```bash
git fetch upstream
git checkout main
git pull upstream main
```

2. Create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes following the existing code style (NestJS conventions)
4. Keep your changes focused and reasonably sized

## Running Checks Before Submitting

Run these commands to ensure your code passes quality checks:

```bash
# Lint and fix
npm run lint

# Format code
npm run format

# Run tests
npm run test
```

## Opening a Pull Request

1. Push your branch to your fork:

```bash
git push origin feature/your-feature-name
```

2. Create a Pull Request with this template:

```markdown
## Description

[Describe your changes]

## Related Issue

Closes #

## Testing

- [ ] I have tested my changes locally
- [ ] I have added or updated tests if applicable

## Notes

[Any additional context or notes for reviewers]
```

## Best Practices

- **Sync often**: Pull latest changes ("git pull upstream main") from upstream before starting new work and before opening a PR
- **Commit messages**: Write clear, concise commit messages describing what changed
- **Secrets**: Never commit API keys, passwords, or credentials to `.env`
- **PR size**: Keep PRs focused and reasonably sized for easier review
- **Responsiveness**: Reply to review comments in a timely manner
- **Communication**: Comment on issues before starting work to avoid duplicate efforts

## Getting Help

If you have questions, feel free to open a discussion or ask in the repository issues.
