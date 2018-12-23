import * as React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import InGameOverlay from './Components/Pages/InGameOverlay';

class OverlayRouter extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={InGameOverlay} />
                </div>
            </BrowserRouter>
        );
    }
}

export default OverlayRouter;
