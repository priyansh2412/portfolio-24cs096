# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
## Practical 8: Performance Optimization and Lazy Loading

### Objective
Improve frontend performance through route-based code splitting and lazy loading using React's `lazy()` and `Suspense`.

### Implementation
- Lazy-loaded the `Projects`, `Contact`, `Auth`, and `Header` components.
- Wrapped the route rendering in `Suspense` with a `Loading page...` fallback.
- Kept the existing React Router navigation and JWT authentication behavior.
- Used Vite production builds and Chrome DevTools Network panel to inspect JavaScript chunks and loading behavior.

### Performance Comparison

| Metric | Before Optimization | After Optimization |
|---|---|---|
| Main JavaScript bundle size | Record from baseline build | Record from optimized build |
| JavaScript transferred on homepage | Record from Network panel | Record from Network panel |
| Projects route chunk | Record baseline | Record observed chunk |
| Contact route chunk | Record baseline | Record observed chunk |
| Load time | Record baseline | Record after optimization |

**Note:** Fill in the table using your actual build output and browser measurements. Do not estimate or invent the values.

### Testing
- Verified the production build.
- Checked route navigation and the Suspense fallback.
- Inspected JavaScript requests in Chrome DevTools.
- Confirmed that authentication and task management functionality remain intact.

### Conclusion
React lazy loading enables code splitting so route components can be downloaded when needed, rather than requiring every route component to be included in the initial application load. Actual performance improvements depend on bundle sizes, network conditions, caching, and the browser environment.
