# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Chess clock application built with Electron, Vue 3, TypeScript, Webpack, and Tailwind CSS. The app runs fullscreen and provides a dual-sided timer interface for chess games.

## Development Commands

### Running the Application

**Development mode (recommended for active development):**
```bash
npm run dev              # Start webpack dev server on port 9000
npm run start            # In separate terminal: start Electron app (loads from localhost:9000)
```

**Alternative development flow:**
```bash
npm run webpack:start    # Start webpack dev server only
npm run electron:start   # Start Electron only
```

### Building and Packaging

```bash
npm run build           # Build production bundle to dist/
npm run package         # Package Electron app with Electron Forge
npm run make            # Create distributable packages (zip, deb, rpm, squirrel)
```

### Code Quality

```bash
npm run format          # Check code formatting with Prettier
npm run format:write    # Auto-format code with Prettier
```

## Architecture

### Application Flow

**Development Mode:**
- Webpack dev server runs on `http://localhost:9000` (webpack.config.js:51)
- Electron loads from dev server (main.js:19)
- DevTools open automatically in undocked mode (main.js:20)

**Production Mode:**
- Webpack builds to `dist/` directory
- Electron loads from `dist/index.html` (main.js:22)

### Project Structure

```
main.js              # Electron main process (window creation, app lifecycle)
preload.js           # Electron preload script (minimal, displays version info)
src/
  main.ts            # Vue app entry point
  App.vue            # Single-file component containing all chess clock logic
  index.css          # Tailwind CSS imports
  components/        # Empty (currently unused)
webpack.config.js    # Webpack bundler configuration
forge.config.js      # Electron Forge packaging configuration
```

### Key Technical Details

**Electron Window Configuration (main.js:4-16):**
- Fullscreen by default
- Fixed dimensions: 800x480 to 1024x576
- Preload script enabled for security

**Vue Application:**
- Vue 3 Composition API with TypeScript
- All application logic in single `App.vue` component (monolithic design)
- State management: Local refs (no Pinia/Vuex currently used despite Pinia being installed)
- Two main views: Setup screen and game screen (controlled by `isGameStarted` ref)

**Webpack Configuration:**
- Entry: `src/main.ts`
- Loaders: vue-loader, ts-loader (for .vue files), postcss-loader for Tailwind
- Dev server: Port 9000, serves from `public/` directory

**TypeScript:**
- Strict mode enabled (tsconfig.json:5)
- Path alias: `@/*` maps to `src/*` (tsconfig.json:16-18)
- Vue shims defined in `src/shims-vue.d.ts`

**Styling:**
- Tailwind CSS with custom fonts: `chivo-mono` and `digital-7-mono` (tailwind.config.js:10-11)
- Fonts loaded from `fonts/` directory
- Custom breakpoints defined at 1024px and 1920px

### Component Logic (App.vue)

The chess clock implements:
- **Setup phase:** Time selection for both players (hours:minutes format), chess piece color selection
- **Game phase:** Active timer with pause/resume, clock switching on click, auto-stop when time expires
- **Timer mechanism:** 1-second interval updates using `window.setInterval` (App.vue:260-274)
- **State:** All game state managed via Vue refs without external state management

### Important Build Details

- Node.js requirement: >=18.16.0 (package.json:6)
- Webpack output: `dist/bundle.js` (webpack.config.js:9)
- HtmlWebpackPlugin injects bundle into `index.html` template
- Electron Forge makers: squirrel (Windows), zip (macOS/Linux), deb, rpm

## Development Notes

When modifying the chess clock logic, all timer and game state is managed within `App.vue`. The component is currently monolithic—consider breaking into smaller components if adding significant features.

The app uses a dual-mode development workflow: Webpack dev server for hot reloading and Electron for desktop testing. Always run both in development.
