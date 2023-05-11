import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Route } from "react-router-dom";
import SpotIndex from "./components/Spots";
import ViewSingleSpot from "./components/ViewSingleSpot";
import CreateSpotForm from "./components/CreateSpot/CreateSpotForm";
import ManageSpot from "./components/ManageSpots";
import EditSpot from "./components/UpdateSpot";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
      <Switch>
        <Route exact path='/'>
          <SpotIndex />
        </Route>
        <Route exact path='/spots/new'>
          <CreateSpotForm />
        </Route>
        <Route exact path='/spots/current'>
          <ManageSpot />
        </Route>
        <Route exact path='/spots/:spotId/edit'>
          <EditSpot />
        </Route>
        <Route exact path='/spots/:spotId'>
          <ViewSingleSpot />
        </Route>

        </Switch>}
    </>
  );
}

export default App;
