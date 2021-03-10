import React from "react";
import {connect} from "react-redux";
import GameField from "./GameField";
import Formular from "../Formular/Formular";


class GameFieldContainer extends React.Component {


    render() {
        return (<>
               <GameField rows={this.props.fieldWidth} cols={this.props.fieldHeight} lifeCycles={this.props.lifeCycles}/>
            </>
        )
    }
}

let mapStateToProps =(state) => ({
    fieldWidth: state.formular.width,
    fieldHeight: state.formular.height,
    lifeCycles: state.formular.lifeCycles
})

export default connect(mapStateToProps, {})(GameFieldContainer);