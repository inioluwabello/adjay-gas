import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import NoPage from "./pages/NoPage";

import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./router/route";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordReset from "./pages/PasswordReset";
import CreateUser from "./pages/users/CreateUser";
import ListUsers from "./pages/users/ListUsers";
import UserDetails from "./pages/users/UserDetails";
import CreateNotification from "./pages/notifications/create-notification";
import ReceivedNotifications from "./pages/notifications/received-notifications";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<PasswordReset />} />

            <Route element={<Layout />}>
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="list-users" element={<ListUsers />} />
                <Route path="create-user" element={<CreateUser />} />
                <Route path="user-details" element={<UserDetails />} />
                <Route path="send-notifications" element={<CreateNotification />} />
                <Route path="received-notifications" element={<ReceivedNotifications />} />
              </Route>
              
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;