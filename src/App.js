import React, { useState } from 'react';
import './reset.css';
import './App.css';
import axios from 'axios';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Main from './pages/main/Main';
import Channel from './pages/channel/Channel'

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/channel/:id" component={Channel} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

/*
Task option 1:
Build an application utilising Viihde program data.
Some example queries to use:
•	Currently live programs:
•	https://rest-api.elisaviihde.fi/rest/epg/schedule/live
•	All channels
•	https://rest-api.elisaviihde.fi/rest/epg/channels
•	Programs on a channel on specific day:
•	https://rest-api.elisaviihde.fi/rest/epg/schedule?channelId=<channelIDs>&date=<date>
•	For example: https://rest-api.elisaviihde.fi/rest/epg/schedule?channelId=39,40&date=2020-02-01

You can freely base your application on one or more of above queries and enrich the data from external sources.

Application UI should be written with React.


*/