import React from 'react';
import {Field, Form} from "react-final-form";
import styles from './Formular.module.css'


const Formular = (props) => {
    return (
        <div>
            <Form
                onSubmit={(values) => {
                    debugger;
                    props.updateGameValues(values);
                }}
                initialValues={{
                    fieldWidth: props.fieldWidth,
                    fieldHeight: props.fieldHeight,
                    lifecycles: props.lifeCycles

                }}
                render={({handleSubmit, form, submitting, pristine, values}) => (
                    <form onSubmit={handleSubmit} className={styles.main}>
                        <h1>Game Of Life</h1>
                        <h4>You can change initial values in the form below</h4>

                        <div className={styles.field}>
                            <label>Width of the field</label>
                            <Field name={"fieldWidth"} component={"input"} type={"number"}
                                   value={props.fieldWidth} placeholder={props.fieldWidth}/>
                        </div>
                        <div className={styles.field}>
                            <label>Height of the Field</label>
                            <Field className={styles.inputS} name={"fieldHeight"} component={"input"} type={"number"}
                                   value={props.fieldHeight} placeholder={props.fieldHeight}
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Lifecycles</label>
                            <Field name={"lifecycles"} component={"input"} type={"number"}
                                   value={props.lifeCycles} placeholder={props.lifeCycles}
                            />
                        </div>

                        <div className="buttons">
                            <button type="submit" disabled={submitting || pristine}>
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={form.reset}
                                disabled={submitting || pristine}
                            >
                                Reset
                            </button>
                        </div>

                    </form>
                )}
            />
        </div>
    )
}

export default Formular;