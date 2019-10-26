import React, { Component } from "react";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error.message);
        console.log(error.stack);
        console.log(errorInfo);
        this.setState({ error });
    }

    render() {
        if (this.state.error) {
            return (
                <div className="snap">
                    <div className="snap-message">
                        <p>{this.state.error.message}</p>
                    </div>
                </div>
            );
        } else {
            return this.props.children;
        }
    }
}