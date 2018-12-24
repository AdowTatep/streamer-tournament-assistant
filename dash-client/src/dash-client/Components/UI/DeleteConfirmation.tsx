import * as React from 'react';
import "./DeleteConfirmation.scss";
import Heading from './Heading';
import Card from './Card';
import SideForm from './SideForm';

interface IProps {
    onConfirm: () => void;
    onCancel: () => void;
}

class DeleteConfirmation extends React.Component<IProps> {
    public render() {
        return (
            <div className={`component-deleteConfirmation`}>
                <SideForm onSubmit={() => { this.onSubmit() }} onCancel={() => { this.onCancel() }} isUpdate={true} heading={"Remover"}>
                    <p>Você tem certeza de que quer remover?</p>
                </SideForm>
            </div>
        );
    }

    private onCancel(): any {
        this.props.onCancel();
    }

    private onSubmit(): void {
        this.props.onConfirm();
    }
}

export default DeleteConfirmation;
