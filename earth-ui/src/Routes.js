import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./shared/applied-route";
import asyncComponent from "./shared/async-component";
import AuthenticatedRoute from "./shared/authenticated-route";
import UnauthenticatedRoute from "./shared/unauthenticated-route";

const AsyncMainComponent = asyncComponent(() => import("./components/main/main"));
const AsyncLoginComponent = asyncComponent(() => import("./components/login/login"));
const AsyncSettingsComponent = asyncComponent(() =>
  import("./components/settings/settings")
);
const AsyncSignupComponent = asyncComponent(() => import("./components/sign-up/sign-up"));
const AsyncResetPasswordComponent = asyncComponent(() =>
  import("./components/login/reset-password")
);
const AsyncViewStoryComponent = asyncComponent(() =>
  import("./components/view-story/view-story")
);
const AsyncAddStoryComponent = asyncComponent(() =>
  import("./components/add-story/add-story")
);
const AsyncNotFoundComponent = asyncComponent(() =>
  import("./components/not-found/not-found")
);
const AsyncChangePasswordComponent = asyncComponent(() =>
  import("./components/settings/change-password")
);
const AsyncChangeEmailComponent = asyncComponent(() =>
  import("./components/settings/change-email")
);

export default ({ childProps }) => (
  <Switch>
    <UnauthenticatedRoute
      path="/login"
      exact
      component={AsyncLoginComponent}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/login/reset"
      exact
      component={AsyncResetPasswordComponent}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/signup"
      exact
      component={AsyncSignupComponent}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/settings"
      exact
      component={AsyncSettingsComponent}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/settings/password"
      exact
      component={AsyncChangePasswordComponent}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/settings/email"
      exact
      component={AsyncChangeEmailComponent}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/add"
      exact
      component={AsyncAddStoryComponent}
      props={childProps}
    />
    <AppliedRoute
      path="/stories/:storyId"
      exact
      component={AsyncViewStoryComponent}
      props={childProps}
    />
    <AppliedRoute
      path="/"
      exact
      component={AsyncMainComponent}
      props={childProps}
    />
    {/* Finally, catch all unmatched routes */}
    <Route component={AsyncNotFoundComponent} />
  </Switch>
);
