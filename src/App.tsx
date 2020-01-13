import React from 'react';
import './App.css';

// UI Components
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import SortingVisualiser from './components/SortingVisualiser';

const App: React.FC = () => {
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Sorting Algorithm Visualiser
                    </Typography>
                </Toolbar>
            </AppBar>
            <SortingVisualiser />
        </div>
    );
};

export default App;
