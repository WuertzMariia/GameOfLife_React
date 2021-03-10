import React from "react";
import {connect} from "react-redux";
import Formular from "./Formular";
import {updateValuesOfFormular} from "../../redux/formularReducer";

class FormularContainer extends React.Component {
    updateGameValues = (values) => {

        this.props.updateValuesOfFormular(values.fieldHeight, values.fieldWidth, values.lifecycles);
    }

    render() {
        return (<>
                <Formular updateGameValues={this.updateGameValues} fieldWidth={this.props.fieldWidth} fieldHeight={this.props.fieldHeight} lifeCycles={this.props.lifeCycles}/>
            </>
        )
    }
}

let mapStateToProps =(state) => ({
    fieldWidth: state.formular.width,
    fieldHeight: state.formular.height,
    lifeCycles: state.formular.lifeCycles
})

export default connect(mapStateToProps, {updateValuesOfFormular})(FormularContainer);