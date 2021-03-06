import React, { useState } from "react";
import FormContext from "../../context/form";

function Form(props) {
    const [state, setState] = useState(props.initialValue);

    const handleChange = event => {
        setState({...state, [event.target.name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        props.onSubmit(state);
    };

    return (
        <FormContext.Provider value={{value: state, onChange: handleChange}}>
            <form onSubmit={handleSubmit}>
                {
                    props.children
                }
            </form>
        </FormContext.Provider>
    );
}

export default Form;