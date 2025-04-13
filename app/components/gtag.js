// lib/gtag.js or directly in your component
export function gtag_report_conversion(url) {
    const callback = function () {
        if (typeof url !== 'undefined') {
            window.location = url;
        }
    };

    window.gtag('event', 'conversion', {
        send_to: 'AW-16656132114/M9e7CMiXhLgaEJLQoYY-',
        transaction_id: '',
        event_callback: callback,
    });

    return false;
}  