import { App } from "app/App";
import { Main } from "app/Main";
import { Page404 } from "common/components/Page404/Page404";
import { Login } from "features/auth/ui/login/Login";
import { createBrowserRouter } from "react-router-dom";

export const Path = {
  Main: '/',
  Login: 'login'
} as const

export const router = createBrowserRouter([
  {
    path: Path.Main,
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Main/>
      },
      {
        path: Path.Login,
        element: <Login/>
      },
      {
        path: '*',
        element: <Page404/>
      }
    ]
  }
])