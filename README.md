# Mini Dashboard (React + TypeScript)

## Stack
- Vite + React + TypeScript
- TailwindCSS
- shadcn/ui style components
- TanStack React Query
- Axios reusable API layer
- Zustand auth state
- react-router-dom
- react-hook-form + zod

## Install
```bash
npm install
npm run dev
```

## Dependencies install command
```bash
npm i react react-dom react-router-dom @tanstack/react-query axios zustand react-hook-form zod @hookform/resolvers clsx tailwind-merge class-variance-authority lucide-react @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-slot
npm i -D vite typescript @vitejs/plugin-react tailwindcss postcss autoprefixer eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react-hooks eslint-plugin-react-refresh @types/react @types/react-dom @types/node
```

## Notes
- Auth uses Zustand as the default store (`token`, `user`, `isAuth`, `login`, `logout`, `hydrateFromStorage`).
- RTK alternative: this can be migrated by moving auth state/actions into a `createSlice`, async auth flows into `createAsyncThunk`, and reading/writing token from middleware/listeners. Zustand is lighter and faster to wire for this mini project.

## Project tree
```text
src
├── app
│   ├── router.tsx
│   └── styles.css
├── entities
│   └── user
│       └── types.ts
├── features
│   ├── auth
│   │   ├── api
│   │   │   └── authApi.ts
│   │   ├── model
│   │   │   └── authStore.ts
│   │   └── ui
│   │       └── LoginForm.tsx
│   ├── settings
│   │   └── ui
│   │       └── ProfileForm.tsx
│   └── users
│       ├── api
│       │   └── usersApi.ts
│       ├── hooks
│       │   ├── useUserQuery.ts
│       │   └── useUsersQuery.ts
│       └── ui
│           ├── UserModal.tsx
│           └── UsersTable.tsx
├── pages
│   ├── AuthPage.tsx
│   ├── OverviewPage.tsx
│   ├── SettingsPage.tsx
│   └── UsersPage.tsx
├── shared
│   ├── api
│   │   ├── axiosInstance.ts
│   │   └── endpoints.ts
│   ├── hooks
│   │   ├── useAuth.ts
│   │   └── useDebounce.ts
│   ├── lib
│   │   └── utils.ts
│   ├── providers
│   │   ├── AuthGuard.tsx
│   │   └── QueryProvider.tsx
│   └── ui
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── skeleton.tsx
│       ├── table.tsx
│       └── toast.tsx
├── widgets
│   ├── DashboardLayout.tsx
│   ├── Sidebar.tsx
│   └── Topbar.tsx
└── main.tsx
```
