import styles from './App.module.css';
import React from 'react';
import {connect} from "react-redux";
import FormularContainer from "./Components/Formular/FormularContainer";
import GameFieldContainer from "./Components/GameField/GameFieldContainer";



const App = (props) => {
    return (
        <div className={styles.App}>
            <FormularContainer/>
            <GameFieldContainer />
        </div>
    );
}

let mapStateToProps = (state) => {
    return {

    }
}
let AppContainer = connect(mapStateToProps, {})(App)

export default AppContainer;
