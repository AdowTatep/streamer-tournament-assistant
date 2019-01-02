import * as React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './Components/Pages/Home';
import Players from './Components/Pages/Players';
import Teams from './Components/Pages/Teams';
import Matchs from './Components/Pages/Matchs';

class DashRouter extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={Home} />
                    <Route path="/players" component={() => <Players namespace="player" />} />
                    <Route path="/teams" component={() => <Teams namespace="team" />} />
                    <Route path="/matchs" component={() => <Matchs namespace="match" />} />
                </div>
            </BrowserRouter>
        );
    }
}

export default DashRouter;
