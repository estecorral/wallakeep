import React, { useContext } from "react";
import FormContext from "../../context/form";

function Input(props) {
    const context = useContext(FormContext);

    return (
        <div>
            <label>{props.name}: </label>
            <input {...props}
                   value={context.value[props.name]} onChange={context.onChange}
            />
        </div>
    )
}

export default Input;