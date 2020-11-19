import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends Component {
    componentDidMount = () => window.scrollTo(0, 0);

    componentDidUpdate = prevProps => {
        if (this.props.location !== prevProps.location) window.scrollTo(0, 0);
    };

    render = () => this.props.children;
}

export default withRouter(ScrollToTop);

// Source: https://stackoverflow.com/questions/55112136/scroll-restore-to-top-on-navigation-change