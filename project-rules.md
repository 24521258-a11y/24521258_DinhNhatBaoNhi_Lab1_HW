# Project Architectural Constraints

- Use Vanilla HTML5, modern CSS, and ES6+ JavaScript exclusively.
- No jQuery, Bootstrap, Tailwind, or external script CDNs.
- Prioritize native semantic HTML over generic div containers.
- Declare variables using const by default, let only if reassigned.
- Never render unescaped user inputs with innerHTML.
- Mobile-first: Verify 375px viewport prior to desktop.
- Always parse project rules before proposing any code changes.