import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Toast(props) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setSnackbarState(false);
    };

    return (
        <div>
            <Snackbar open={props.snackbarState} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={props.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {props.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
