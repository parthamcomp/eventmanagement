import React from "react"
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";
import AppBar from "../components/AppBar";
import Link from "@material-ui/core/Link/index";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles/index';
import { TextField } from "@material-ui/core/index";
import Typography from "@material-ui/core/Typography/index";
import SearchIcon from "@material-ui/icons/Search"
import IconButton from "@material-ui/core/IconButton/index";

const styles = theme => ({
    title: {
        fontSize: 16,
    },
    placeholder: toolbarStyles(theme).root,
    toolbar: {
        justifyContent: 'space-between',
    },
    left: {
        flex: 4,
    },
    leftLinkActive: {
        color: theme.palette.common.white,
    },
    leftSmall: {
        flex: 1,
        display: 'flex',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor: "White",
        borderRadius: "0.2em 0.2em 0.3em 0.3em "
    },
    button: {
        margin: theme.spacing(1),
    },
    input1: {
        height: "0.3em",
    },
    right: {
        flex: 1,
        justifyContent: "left",
        display: 'flex',
        marginLeft: 50
    },
    rightLink: {
        fontSize: 30,
        color: theme.palette.common.white,
        marginLeft: theme.spacing(2),
    },
    linkSecondary: {
        color: theme.palette.secondary.main,
    },
    icon: {
        margin: theme.spacing(1),
        fontSize: 40,
    },

});

function SearchBar(props) {
    const { classes } = props;
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.leftSmall}>
                        <Link
                            underline="none"
                            color="inherit"
                            className={classes.title}
                            href="/">
                            <Typography variant={"h5"}
                                align={"center"}
                                color={"initial"}>
                                {'Meraki Events'}
                            </Typography>
                        </Link>
                    </div>
                    <div className={classes.left}>
                        <TextField
                            id="filled-search"
                            label="Enter Property"
                            autoFocus={true}
                            type="text"
                            fullWidth
                            margin={"dense"}
                            className={classes.textField}
                            variant={"filled"}
                            onChange={props.changeField}
                        />
                    </div>
                    <div className={classes.right}
                         onClick={props.search}>
                        <IconButton size={"small"}>
                            <SearchIcon
                                className={clsx(classes.rightLink, classes.linkSecondary, classes.icon)}>
                            </SearchIcon>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.placeholder} />
        </div>
    )
};
SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SearchBar);
