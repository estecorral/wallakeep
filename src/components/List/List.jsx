import React from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../../context/user";

class List extends React.Component {

    render()
    {
       console.log(this.context);
        return (
            <div>
                <h1>Estas en list {this.context.user.name}</h1>
            </div>
        );
    }
}

List.contextType = UserContext;

export default withRouter(List);