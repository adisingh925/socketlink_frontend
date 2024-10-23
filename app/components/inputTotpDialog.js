"use client";

import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Mfa = ({ handleSubmit, code, setCode, isOpen, closeDialog }) => {

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeDialog}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-80" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-6 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800 dark:border dark:border-gray-700">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                                    >
                                        Verify Your Identity
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <form className="space-y-4" onSubmit={handleSubmit}>
                                            <div>
                                                <label
                                                    htmlFor="code"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Enter MFA Code
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="code"
                                                    id="code"
                                                    autoComplete='off'
                                                    maxLength={6}
                                                    minLength={6}
                                                    required
                                                    value={code}
                                                    onChange={(e) => setCode(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="******"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Mfa;
