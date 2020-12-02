import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const DefaultButton = (props) => {
    const { text, click } = props;

    return (
        <Button className="defaultButton" variant="contained" onClick={click}>{text}</Button>
    )
}

export default DefaultButton;