import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import App from "./App"
import LogInComponent from './components/LogInComponent'
import MainView from "./views/MainView"
import RegisterComponent from "./components/RegisterComponent"

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<LogInComponent />} />
            <Route path="register" element={<RegisterComponent />} />
            <Route path="chat" element={<MainView />} />
        </Route>
    )
)