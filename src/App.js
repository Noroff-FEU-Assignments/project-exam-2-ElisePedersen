import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Explore from "./components/explore/Explore";
import LandingPage from "./components/landingpage/LandingPage";
import User from "./components/user/User";
import EditPost from "./components/user/editPost/EditPost";
import NewPost from "./components/user/newPost/NewPost";
import SpecificProfile from "./components/specificProfile/SpecificProfile";
import SpecificPost from "./components/specificPost/SpecificPost";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import { AuthProvider } from "./context/AuthContext";

import EditAvatar from "./components/user/editProfile/EditAvatar";
import EditBanner from "./components/user/editProfile/EditBanner";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />

        <Layout>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />

            <Route exact path="/explore" element={<Explore />} />
            <Route exact path="/user/:name" element={<User />} />
            <Route exact path="/user/edit-post/:id" element={<EditPost />} />
            <Route exact path="/user/new-post" element={<NewPost />} />
            <Route
              exact
              path="/user/edit-banner/:name"
              element={<EditBanner />}
            />
            <Route
              exact
              path="/user/edit-avatar/:name"
              element={<EditAvatar />}
            />

            <Route exact path="/profile/:name" element={<SpecificProfile />} />
            <Route exact path="/post/:id" element={<SpecificPost />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
