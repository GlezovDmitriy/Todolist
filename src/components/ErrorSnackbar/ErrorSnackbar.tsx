import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import {Simulate} from "react-dom/test-utils";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function ErrorSnackbar() {
    //const [open, setOpen] = useState(true)
    const error = useSelector<AppRootStateType, null|string>(state => state.app.error)
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        debugger
        if (reason === 'clickaway') {
            return
        }
        //setOpen(false)

    }
    const isOpen = error !== null
    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>
    )
}