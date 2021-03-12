import React from "react";
import {connect} from "react-redux";
import GameField from "./GameField";
import GameFieldTwo from "./GameFieldTwo";


class GameFieldContainer extends React.Component {
componentDidUpdate= ( prevProps) => {
    if (prevProps!= this.props) {
        this.forceUpdate(); 
    }
}
    render() {
        return (<>
               <GameField cols={this.props.fieldWidth} rows={this.props.fieldHeight} lifeCycles={this.props.lifeCycles}/>
               {/* <GameFieldTwo rows={this.props.fieldWidth} cols={this.props.fieldHeight} lifeCycles={this.props.lifeCycles}/> */}
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