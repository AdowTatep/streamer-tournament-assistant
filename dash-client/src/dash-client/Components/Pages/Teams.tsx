import * as React from 'react';
import ElementWrap from '../Elements/ElementWrap';
import TeamsTable from '../Elements/Teams/TeamsTable';
import { ITeam } from '../../Entities/ITeam';
import TeamsForm from '../Elements/Teams/TeamsForm';


export default class Teams extends ElementWrap<ITeam> {
    protected getElementTable(): React.ReactNode {
        return (<TeamsTable teams={this.state.elements} onteamSelected={(player, i) => { this.onElementSelected(player, i); }} />);
    }

    protected getElementForm() {
        return TeamsForm;
    }
}
