import { createBrowserRouter } from "react-router";
import Splash from "./screens/Splash";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Welcome from "./screens/Welcome";
import Home from "./screens/Home";
import Learning from "./screens/Learning";
import Practice from "./screens/Practice";
import UPISimulation from "./screens/UPISimulation";
import PasswordGame from "./screens/PasswordGame";
import AppPermissions from "./screens/AppPermissions";
import Quiz from "./screens/Quiz";
import Community from "./screens/Community";
import AIAssistant from "./screens/AIAssistant";
import Profile from "./screens/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/welcome",
    Component: Welcome,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/learning",
    Component: Learning,
  },
  {
    path: "/practice",
    Component: Practice,
  },
  {
    path: "/upi-simulation",
    Component: UPISimulation,
  },
  {
    path: "/password-game",
    Component: PasswordGame,
  },
  {
    path: "/app-permissions",
    Component: AppPermissions,
  },
  {
    path: "/quiz",
    Component: Quiz,
  },
  {
    path: "/community",
    Component: Community,
  },
  {
    path: "/ai-assistant",
    Component: AIAssistant,
  },
  {
    path: "/profile",
    Component: Profile,
  },
]);
