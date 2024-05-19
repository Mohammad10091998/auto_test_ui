import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import Content from "./pages/Content";
import AddCollectionForm from "./features/collection/AddCollectionForm";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import Logout from "./pages/Logout";
import { CollectionContextProvider } from "./contexts/CollectionContext";
import SelectAddAPI from "./features/testingapi/SelectAddAPI";
import { APICollectionContextProvider } from "./contexts/APICollectionContext";
import CustomPostPutForm from "./features/testingapi/CustomPostPutForm";
import CustomGetDeleteForm from "./features/testingapi/CustomGetDeleteForm";
import SystemPostPutForm from "./features/testingapi/SystemPostPutForm";
import SystemGetDeleteForm from "./features/testingapi/SystemGetDeleteForm";
import Testing from "./pages/Testing";
import ShareCollection from "./features/collection/ShareCollection";
import { NotificationProvider } from "./contexts/NotificationContext";
import PasswordlessLogin from "./pages/PasswordlessLogin";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <AuthProvider>
      <CollectionContextProvider>
        <APICollectionContextProvider>
          <NotificationProvider>
            <Router>
              <Header />
              <Routes>
                <Route index element={<Navigate replace to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/collections" element={<Content />} />

                <Route
                  path="/collections/addcollection"
                  element={<AddCollectionForm />}
                />

                <Route
                  path="/collections/sharecollection/"
                  element={<ShareCollection />}
                />

                <Route path="/chooseapi" element={<SelectAddAPI />} />
                <Route
                  path="/addapi/custom_post/:apiType"
                  element={<CustomPostPutForm />}
                />
                <Route
                  path="/addapi/custom_put/:apiType"
                  element={<CustomPostPutForm />}
                />
                <Route
                  path="/addapi/custom_get/:apiType"
                  element={<CustomGetDeleteForm />}
                />
                <Route
                  path="/addapi/custom_delete/:apiType"
                  element={<CustomGetDeleteForm />}
                />

                <Route
                  path="/addapi/system_post/:apiType"
                  element={<SystemPostPutForm />}
                />
                <Route
                  path="/addapi/system_put/:apiType"
                  element={<SystemPostPutForm />}
                />
                <Route
                  path="/addapi/system_get/:apiType"
                  element={<SystemGetDeleteForm />}
                />
                <Route
                  path="/addapi/system_delete/:apiType"
                  element={<SystemGetDeleteForm />}
                />

                <Route path="/apitesting" element={<Testing />} />

                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                <Route path="/passwordlesslogin" element={<PasswordlessLogin />} />
                <Route path="/resetpassword" element={<ResetPassword />} />

              </Routes>
              <Footer />
            </Router>
          </NotificationProvider>
        </APICollectionContextProvider>
      </CollectionContextProvider>
    </AuthProvider>
  );
}

export default App;
