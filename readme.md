# `firebase/firebase-js-sdk` Issue #6928

https://github.com/firebase/firebase-js-sdk/issues/6928

This might also be a PNPM issue, I am not 100 % sure I also opened an issue with
them:

https://github.com/pnpm/pnpm/issues/5912

## Steps To Reproduce

Note that I have only tried this on macOS, not sure if it happens on Windows or
Linux.

### This works well

- `npx create-next-app`
  - Name: `my-app-npm`
  - TypeScript: Yes (default)
  - ESLint: Yes (default)
- `cd my-app-npm`
- `npm install firebase`
- Go to `pages/_app.tsx` and add this line:
  `import { initializeApp } from 'firebase/app'`
- Command/Control-click through `firebase/app` in `_app.tsx`
- Land on `node_modules/firebase/app/dist/app/index.d.ts`
- Command/Control-click through `@firebase/app` in `index.d.ts`
- Land on `node_modules/@firebase/app/dist/app-public.d.ts`
- Add `"preserveSymlinks": true` in `tsconfig.json`'s `compilerOptions`
- Press Control/Command+Shift+P and select Developer: Reload Window
- Observe that these steps still work as expected after that

Everything still works with NPM.

### It doesn't work with PNPM and `"preserveSymlinks": true`

- `pnpm create next-app`
  - Name: `my-app-pnpm`
  - TypeScript: Yes (default)
  - ESLint: Yes (default)
- `cd my-app-pnpm`
- `pnpm install firebase`
- Go to `pages/_app.tsx` and add this line:
  `import { initializeApp } from 'firebase/app'`
- Command/Control-click through `firebase/app` in `_app.tsx`
- Land on `node_modules/.pnpm/firebase@9.15.0/node_modules/firebase/app/dist/app/index.d.ts`
- Command/Control-click through `@firebase/app` in `index.d.ts`
- Land on `node_modules/.pnpm/@firebase+app@0.9.0/node_modules/@firebase/app/dist/app-public.d.ts`
- Add `"preserveSymlinks": true` in `tsconfig.json`'s `compilerOptions`
- Press Control/Command+Shift+P and select Developer: Reload Window
- Notice `initializeApp` in `_app.tsx` now shows a type error:
  > 'initializeApp' is declared but its value is never read. ts(6133)
  > Module '"firebase/app"' has no exported member 'initializeApp'. ts(2305)
- Command/Control-click through `firebase/app` in `_app.tsx`
- Land on `node_modules/firebase/app/dist/app/index.d.ts`
- Try to command/control-click through `@firebase/app` in `index.d.ts`
- Notice that nothing happens - VS Code / TypeScript can't resolve the import

When using PNPM with `"preserveSymlinks": true`, an error occurs.
