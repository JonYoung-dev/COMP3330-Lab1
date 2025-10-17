import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import App from './App'
import ExpenseNewPage from './routes/expenses.new'
import { AuthBar } from './components/AuthBar'

const rootRoute = createRootRoute({
  component: () => <App />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <AuthBar />,
})

const expensesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/expenses',
  component: () => <p>Expenses Layout</p>,
})

const newExpenseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/expenses/new',
  component: ExpenseNewPage,
})

const routeTree = rootRoute.addChildren([indexRoute, expensesRoute, newExpenseRoute])

export const router = createRouter({ routeTree })

router.update({
  defaultNotFoundComponent: () => <p>Page not found</p>,
  defaultErrorComponent: ({ error }) => <p>Error: {(error as Error).message}</p>,
})

export function AppRouter() {
  return <RouterProvider router={router} />
}
