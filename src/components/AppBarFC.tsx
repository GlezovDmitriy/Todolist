import React from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
export const AppBarFC = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        //size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        //sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

