import * as React from 'react';
import ElementWrap from '../Elements/ElementWrap';
import MatchsTable from '../Elements/Match/MatchsTable';
import MatchsForm from '../Elements/Match/MatchsForm';
import { IMatch } from '../../Entities/IMatch';


// I know that it is called "Matches", but I add the "S" manually on some cases and there's no need to make things more complex
// Only to account different plurals on classes that won't be displayed on screen
export default class Matchs extends ElementWrap<IMatch> {
    protected getTitle(): string {
        return "Matches";
    }

    protected getElementTable(): React.ReactNode {
        return (<MatchsTable matchs={this.state.elements} onMatchSelected={(player, i) => { this.onElementSelected(player, i); }} />);
    }

    protected getElementForm() {
        return MatchsForm;
    }
}
