import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import dropdownArrow from './dropdown-60px.svg';
import SvgIcon from '@material-ui/core/SvgIcon';
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
        // <SvgIcon {...props}>
        //     <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        // </SvgIcon>
        <Icon {...props}>
            <img src={dropdownArrow} />
        </Icon>
    );
}

export const Dropdown = (props) => {
    const classes = useStyles();
    // const [age, setAge] = React.useState(5);

    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };

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
                    <MenuItem value={5}>5 miles</MenuItem>
                    <MenuItem value={10}>10 miles</MenuItem>
                    <MenuItem value={15}>15 miles</MenuItem>
                    <MenuItem value={20}>20 miles</MenuItem>
                    <MenuItem value={25}>25 miles</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default Dropdown;
