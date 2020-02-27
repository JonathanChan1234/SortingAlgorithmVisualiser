import React, { useState } from "react";
import "./App.css";

// UI Components
import {
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    IconButton
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SortingVisualiser from "./components/SortingVisualiser/SortingVisualiser";

// Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideMenuList from "./components/SideMenuList";
import SortingCompetition from "./components/SortingCompetition/SortingCompetition";
import ReactReducerTest from "./components/PathFinder/PathFinder";

const App: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = (state: boolean) => {
        setDrawerOpen(state);
    };

    return (
        <Router>
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={() => toggleDrawer(!drawerOpen)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6">
                            Algorithm Visualiser
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer open={drawerOpen} onClose={() => toggleDrawer(false)}>
                    <SideMenuList toggleDrawer={() => toggleDrawer(false)} />
                </Drawer>
                <Switch>
                    <Route path="/" exact>
                        <SortingVisualiser />
                    </Route>
                    <Route path="/competition" exact>
                        <SortingCompetition />
                    </Route>
                    <Route path="/reducer" exact>
                        <ReactReducerTest />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
