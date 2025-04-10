import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { ClipboardIcon } from '@heroicons/react/24/outline';

export default function TotpDialog({ isOpen, onClose, secret, totpUri, handleSubmit, code, setCode }) {
    const handleCopy = () => {
        // Check if navigator.clipboard is available
        if (navigator.clipboard) {
            navigator.clipboard.writeText(secret).then(() => {
                alert('Secret copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        } else {
            // Fallback for older browsers or mobile
            const textarea = document.createElement('textarea');
            textarea.value = secret;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                alert('Secret copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy: ', err);
            } finally {
                document.body.removeChild(textarea);
            }
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="mt-20 ml-6 mr-6 bg-white rounded-2xl shadow dark:bg-gray-800 w-full max-w-md border-2 border-white/20">
                    <h2 className="text-lg font-semibold mb-4 px-5 pt-5">Setup Two-Factor Authentication</h2>
                    <p
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white px-5 pb-5"
                    >
                        1. Scan the QR code with your authenticator app or enter the secret key below to generate a 2FA code.
                    </p>
                    <QRCodeCanvas
                        value={totpUri}
                        className="mx-auto m-5 rounded-lg p-2 bg-white shadow"
                        fgColor="#000000"
                        bgColor="#ffffff"
                    />

                    <div className="flex items-center pt-5 px-5">
                        <input
                            type="text"
                            name="secret"
                            id="secret"
                            value={secret}
                            readOnly
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Secret Key"
                            required
                        />
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="ml-2 h-full text-white bg-blue-600 hover:bg-blue-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-2.5 py-2.5 text-center transition-transform duration-150 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            <ClipboardIcon className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-5">
                        <label
                            htmlFor="email"
                            className="block font-medium text-sm text-gray-900 dark:text-white pb-5"
                        >
                            2. Enter the 2FA code displayed on your authenticator app
                        </label>
                        <input
                            type="text"
                            name="code"
                            id="code"
                            minLength={6}
                            maxLength={6}
                            value={code}
                            autoComplete="off"
                            onChange={(e) => setCode(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Verification Code"
                            required
                        />
                        <div className="flex pt-5 space-x-2"> {/* Add spacing between buttons */}
                            <button
                                type="button" // Use type="button" for the cancel button
                                className="w-1/2 text-white bg-red-600 hover:bg-red-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-150 dark:bg-red-600 dark:hover:bg-red-700"
                                onClick={onClose} // Ensure you have an onClose handler
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-1/2 text-white bg-blue-600 hover:bg-blue-700 active:scale-95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-150 dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}
