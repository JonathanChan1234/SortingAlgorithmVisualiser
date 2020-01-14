import React from 'react';
import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    listItem: {
        textDecoration: "none",
    }
});

type SideMenuListProps = {
    toggleDrawer: (state: boolean) => void;
};

const SideMenuList: React.FC<RouteComponentProps & SideMenuListProps> = ({
    toggleDrawer,
    history,
}) => {
    const classes = useStyles();
    return (
        <div
            className={classes.list}
            role="presentation"
            onClick={() => toggleDrawer(false)}
            onKeyDown={() => toggleDrawer(false)}>
            <List>
                <ListItem button key="visualiser">
                    <ListItemText
                        className="listItem"
                        primary="Sorting Algorithm Visualiser"
                        onClick={() => history.push("/")} />
                </ListItem>
                <ListItem button key="competition">
                    <ListItemText
                        className="listItem"
                        primary="Sorting Algorithm Competition"
                        onClick={() => history.push("/competition")} />
                </ListItem>
            </List>
        </div>
    );
};

export default withRouter(SideMenuList);