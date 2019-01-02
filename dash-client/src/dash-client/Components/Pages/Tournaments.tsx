import * as React from 'react';
import { ITournament } from '../../Entities/ITournament';
import ElementWrap from '../Elements/ElementWrap';
import TournamentsTable from '../Elements/Tournament/TournamentsTable';
import TournamentsForm from '../Elements/Tournament/TournamentsForm';

export default class Tournaments extends ElementWrap<ITournament> {
    protected getTitle(): string {
        return "Tournaments";
    }

    protected getElementTable(): React.ReactNode {
        return (<TournamentsTable tournaments={this.state.elements} onTournamentSelected={(tournament, i) => { this.onElementSelected(tournament, i); }} />);
    }

    protected getElementForm() {
        return TournamentsForm;
    }
}
