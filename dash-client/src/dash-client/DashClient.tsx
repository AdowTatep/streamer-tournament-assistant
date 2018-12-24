import * as React from 'react';
import "./DashClient.scss";
import DashRouter from './DashRouter';
import Container from './Components/Layout/Container';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


class DashClient extends React.Component {
    componentDidMount() {
        library.add(faTimes);
    }

    public render() {
        return (
            <div className="component-dashClient">
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
