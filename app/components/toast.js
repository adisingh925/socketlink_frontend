import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

/**
 * Toast component to display a Material UI Snackbar with an Alert.
 * Automatically hides after a duration based on the message length.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.snackbarState - Controls whether the Snackbar is open
 * @param {Function} props.setSnackbarState - Function to close the Snackbar
 * @param {string} props.message - The message to display in the alert
 * @param {'error' | 'warning' | 'info' | 'success'} props.severity - The severity level of the alert
 */
export default function Toast(props) {
    /**
     * Handles closing of the Snackbar.
     *
     * @param {React.SyntheticEvent | Event} event - The event object
     * @param {string} reason - The reason the Snackbar was closed
     */
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setSnackbarState(false);
    };

    /**
     * Base duration (in milliseconds) the Snackbar is shown
     * even for very short messages.
     */
    const baseDuration = 3000;

    /**
     * Additional milliseconds to add per character in the message.
     */
    const extraPerChar = 40;

    /**
     * Maximum duration to prevent Snackbar from showing too long.
     */
    const maxDuration = 10000;

    /**
     * Final auto-hide duration calculated based on the message length.
     */
    const calculatedDuration = Math.min(
        baseDuration + (props.message?.length || 0) * extraPerChar,
        maxDuration
    );

    return (
        <div>
            <Snackbar open={props.snackbarState} autoHideDuration={calculatedDuration} onClose={handleClose}>
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