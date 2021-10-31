import React, { useState, useCallback, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import ScrollToTop from "./shared/util/ScrollToTop";
import MainNavigation from "./shared/components/NavBar/MainNavigation";
import Home from "./Homepage/pages/Home";
// import Notices from './Homepage/pages/Notices';
// import AddInfo from "./Homepage/components/AddInfo";
// import Dashboard from "./User/pages/Dashboard";
// import ForgotPassword from './shared/components/ForgotPassword/ForgotPassword';
// import ConfirmForgotPassword from './shared/components/ForgotPassword/ConfirmForgotPassword';
// import ConfirmEmail from './User/pages/ConfirmEmail';
import { AuthContext } from "./shared/context/auth-context";
// import Search from "./shared/components/Search/pages/Search";
import Search from "./Search/pages/Search";
import Crowdfunding from "./Crowdfunding/pages/Fundraisers";
import Fundraiser from "./Crowdfunding/pages/Fundraiser";
import CreateFundraiser from "./CreateFundraiser/pages/CreateFundraiser2";
import EditFundraiser from "./CreateFundraiser/pages/EditFundraiser";
import FundraiserUpdate from "./User/pages/FundraiserUpdate";
import Payment from "./Payment/pages/Payment";
import "./App.css";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import Footer from "./shared/components/Footer/Footer";
import PrivacyPolicy from "./Legal/pages/PrivacyPolicy";
import FundraiserTerms from "./Legal/pages/FundraiserTerms";
import Terms from "./Legal/pages/Terms";
import Security from "./Legal/pages/Security";
import About from "./Legal/pages/AboutUs";
import Pricing from "./Legal/pages/Pricing";

const Notices = React.lazy(() => import("./Homepage/pages/Notices"));
const AddInfo = React.lazy(() => import("./Homepage/components/AddInfo"));
const Dashboard = React.lazy(() => import("./User/pages/Dashboard"));
const ForgotPassword = React.lazy(() =>
  import("./shared/components/ForgotPassword/ForgotPassword")
);
const ConfirmForgotPassword = React.lazy(() =>
  import("./shared/components/ForgotPassword/ConfirmForgotPassword")
);
const ConfirmEmail = React.lazy(() => import("./User/pages/ConfirmEmail"));

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, token: token })
    );
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/search/:q">
          <Search />
        </Route>
        <Route path="/create-notice">
          <AddInfo />
        </Route>
        <Route path="/notices">
          <Notices />
        </Route>
        {/* <Route path="/forgot_password" exact>
          <ForgotPassword />
        </Route> */}
        {/* <Route path="/user/confirmforgotpassword/:key">
          <ConfirmForgotPassword />
        </Route> */}
        <Route path="/crowdfunding/fundraisers">
          <Crowdfunding />
        </Route>
        <Route path="/fundraiser/:fundraiserId" exact>
          <Fundraiser />
        </Route>
        <Route path="/fundraiser/:fundraiserId/donate">
          <Payment />
        </Route>
        <Route path="/:fundraiserId/update">
          <FundraiserUpdate />
        </Route>
        <Route path="/create">
          <CreateFundraiser />
        </Route>
        <Route path="/:fundraiserId/edit">
          <EditFundraiser />
        </Route>
        <Route path="/user/dashboard">
          <Dashboard />
        </Route>
        <Route path="/user/confirmemail/:key">
          <ConfirmEmail />
        </Route>
        <Route path="/legal/privacypolicy">
          <PrivacyPolicy />
        </Route>
        <Route path="/legal/fundraiserterms">
          <FundraiserTerms />
        </Route>
        <Route path="/legal/terms">
          <Terms />
        </Route>
        <Route path="/legal/security">
          <Security />
        </Route>
        <Route path="/legal/about">
          <About />
        </Route>
        <Route path="/pricing">
          <Pricing />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/search/:q">
          <Search />
        </Route>
        {/* <Route path="/create-notice">
          <AddInfo />
        </Route> */}
        <Route path="/notices">
          <Notices />
        </Route>
        <Route path="/forgot_password" exact>
          <ForgotPassword />
        </Route>
        <Route path="/user/confirmforgotpassword/:key">
          <ConfirmForgotPassword />
        </Route>
        <Route path="/crowdfunding/fundraisers">
          <Crowdfunding />
        </Route>
        <Route path="/fundraiser/:fundraiserId" exact>
          <Fundraiser />
        </Route>
        <Route path="/fundraiser/:fundraiserId/donate">
          <Payment />
        </Route>
        <Route path="/create">
          <CreateFundraiser />
        </Route>
        <Route path="/user/dashboard">
          <Dashboard />
        </Route>
        <Route path="/user/confirmemail/:key">
          <ConfirmEmail />
        </Route>
        <Route path="/legal/privacypolicy">
          <PrivacyPolicy />
        </Route>
        <Route path="/legal/fundraiserterms">
          <FundraiserTerms />
        </Route>
        <Route path="/legal/terms">
          <Terms />
        </Route>
        <Route path="/legal/security">
          <Security />
        </Route>
        <Route path="/legal/about">
          <About />
        </Route>
        <Route path="/pricing">
          <Pricing />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Router>
          <ScrollToTop />
          <MainNavigation />
          <main className="app__navbar-margin">
            <Suspense
              fallback={
                <div>
                  <LoadingSpinner asOverlay />
                </div>
              }
            >
              {routes}
            </Suspense>
          </main>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
