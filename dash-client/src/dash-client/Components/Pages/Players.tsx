import * as React from 'react';
import { IPlayer } from '../../Entities/IPlayer';
import PlayersTable from '../Elements/Players/PlayersTable';
import PlayersForm from '../Elements/Players/PlayersForm';
import ElementWrap from '../Elements/ElementWrap';

export default class Players extends ElementWrap<IPlayer> {
    protected getTitle(): string {
        return "Players";
    }

    protected getElementTable(): React.ReactNode {
        return (<PlayersTable players={this.state.elements} onPlayerSelected={(player, i) => { this.onElementSelected(player, i); }} />);
    }

    protected getElementForm() {
        return PlayersForm;
    }
}
