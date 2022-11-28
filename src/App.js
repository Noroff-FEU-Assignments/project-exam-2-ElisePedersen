import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Explore from "./components/explore/Explore";
import LandingPage from "./components/landingpage/LandingPage";
import User from "./components/user/User";
import EditPost from "./components/user/editPost/EditPost";
import NewPost from "./components/user/newPost/NewPost";
import SpecificProfile from "./components/specificProfile.js/SpecificProfile";
import SpecificPost from "./components/specificPost/SpecificPost";

import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/layout/Footer";
import EditAvatar from "./components/user/editProfile/EditAvatar";
import EditBanner from "./components/user/editProfile/EditBanner";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />

        <Container>
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
        </Container>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
