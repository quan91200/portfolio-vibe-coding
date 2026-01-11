# PROMPT 6: ULTRA-OPTIMIZED GITHUB REPOSITORY FETCHING

Implement a high-performance GitHub repository showcase optimized for reliability and zero-cost API usage, specifically designed to bypass common REST API rate limits.

## 1. Zero-Explosion Fetching Strategy
- **Single Source of Truth**: Perform exactly **one** API request to fetch the repository list: `GET /users/{username}/repos`.
- **Field Utilization**: Use only the data returned in the primary list:
  - `name`: Project title.
  - `description`: Primary summary.
  - `language`: Main tech stack indicator.
  - `stargazers_count` & `forks_count`: Social proof.
  - `homepage`: Live demo link.
- **No Detail Calls**: Explicitly avoid per-repo requests like `/readme` or `/languages` to prevent rate limit exhaustion.

## 2. Visual & Dynamic Content
- **Asset Pattern**: Generate repository preview images using the GitHub OpenGraph pattern: `https://opengraph.githubassets.com/1/{username}/{repo_name}`. This provides high-quality visuals without consuming any API quota.
- **Placeholder Mesh**: Implement a fallback mesh-gradient container with an animated background for repos without available images.

## 3. High-Efficiency Caching
- **Persistent Storage**: Cache the processed repository array in `localStorage` with a generous expiration (e.g., 24 hours).
- **Silent Restore**: If an API error occurs (e.g., 403 Rate Limit), silently fallback to the cached data or a hardcoded "Featured" list to ensure the UI never breaks.

## 4. UI/UX & Style Standards
- **Markdown Aesthetics**: 
  - Prefix titles with `# `.
  - Prefix descriptions with `## `.
- **Layout Modes**: Provide a persistent state to toggle between **Grid** and **List** views.
- **Glassmorphism**: Apply deep blur (`16px`), low opacity backgrounds (`0.02`), and subtle border shifts on hover.
- **Responsiveness**: Ensure a single-column layout for mobile devices while maintaining 2-3 columns on larger screens.

## 5. Technical Requirements
- **Dependencies**: `axios`, `lucide-react`, `styled-components`.
- **Code Style**: No semicolons, JSDocs for logic, and clean separation between logic and styling.
