import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import dropdownArrow from './dropdown-60px.svg';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function ArrowIcon(props) {
    return (
        <Icon {...props}>
            <img src={dropdownArrow} />
        </Icon>
    );
}

export const Dropdown = (props) => {
    const classes = useStyles();

    return (
        <div className="customDropdown">
            <FormControl className={classes.formControl}>
                <Select
                    value={props.value}
                    onChange={props.change}
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                    IconComponent={ArrowIcon}
                >
                    <MenuItem value={5}>5 kilometers</MenuItem>
                    <MenuItem value={10}>10 kilometers</MenuItem>
                    <MenuItem value={15}>15 kilometers</MenuItem>
                    <MenuItem value={20}>20 kilometers</MenuItem>
                    <MenuItem value={25}>25 kilometers</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default Dropdown;
