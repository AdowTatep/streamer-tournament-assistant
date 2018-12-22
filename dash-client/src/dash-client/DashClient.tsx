import * as React from 'react';
import "./DashClient.scss";
import DashRouter from './Router';
import Container from './Components/Layout/Container';

class DashClient extends React.Component {
    public render() {
        return (
            <div className="component-dashClient has-background-dark">
                <div className="distance">
                    <Container>
                        <DashRouter />
                    </Container>
                </div>
            </div>
        );
    }
}

export default DashClient;
