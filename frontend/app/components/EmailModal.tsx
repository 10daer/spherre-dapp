"use client"

import { X } from 'lucide-react';
import React, { useState } from 'react';

interface EmailModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    onSave?: (email: string) => void;
    initialEmail?: string;
}

const EmailModal: React.FC<EmailModalProps> = ({
    isOpen = true,
    onClose = () => { },
    onSave = () => { },
    initialEmail = ''
}) => {
    const [email, setEmail] = useState(initialEmail);
    const [isValid, setIsValid] = useState(initialEmail ? validateEmail(initialEmail) : true);

    function validateEmail(emailValue: string) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
        return emailRegex.test(emailValue);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsValid(validateEmail(newEmail));
    };

    const handleSave = () => {
        if (validateEmail(email)) {
            onSave(email);
            onClose();
        } else {
            setIsValid(false);
        }
    };

    const handleCancel = () => {
        // Reset to initial email and close without saving
        setEmail(initialEmail);
        setIsValid(initialEmail ? validateEmail(initialEmail) : true);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#16161666] bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#1C1D1F] font-sans grid border-4 border-[#292929] rounded-xl py-7 px-4 w-[589px] h-[342px]">
                {/* Close Button */}
                <button
                    onClick={handleCancel}
                    className="text-gray-400 bg-[#3f4146] place-self-end rounded-full size-7 grid place-content-center hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="place-self-center w-full max-w-[489px]">
                    {/* Header */}
                    <h2 className="text-white text-3xl mb-[10px] text-center leading-[120%] tracking-[0] font-bold">
                        {initialEmail ? "Edit Email Address" : "Add Email Address"}
                    </h2>

                    {/* Description */}
                    <p className="text-[#8E9BAE] font-semibold text-[15px] leading-[140%] tracking-[0] mb-5">
                        Please provide your email address and sign the message to add it.
                    </p>

                    {/* Form */}
                    <div className="w-full mb-6">
                        <label className="block text-start mb-2 text-gray-300 text-sm font-normal leading-6">
                            Email Address:
                        </label>
                        <input
                            type="email"
                            value={email}
                            aria-placeholder='johnsmith@gmail.com'
                            onChange={handleEmailChange}
                            className={`w-full bg-[#29292A] border-2 text-base font-normal leading-6 rounded px-4 py-3 text-white placeholder-gray-400 shadow-[0px_1.08px_2.16px_0px] shadow-[#1018280A] transition-colors ${isValid
                                ? 'border-[#292929] focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500'
                                : 'border-red-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                }`}
                            placeholder="johnsmith@gmail.com"
                        />
                        {!isValid && (
                            <p className="text-red-400 text-sm mt-1 text-start w-full">
                                Email must contain &quot;@&quot; and &quot;.com&quot;
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center space-x-4 w-full">
                        <button
                            onClick={handleCancel}
                            className="px-5 py-3 w-full text-gray-300 rounded-lg hover:text-white transition-colors font-medium text-base leading-6 tracking-0 shadow-[0px_1.08px_2.16px_0px] shadow-[#1018280A] bg-[#272729]"
                        >
                            Close
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-5 py-3 w-full text-white bg-[#6F2FCE] rounded-lg hover:bg-[#5A25A3] font-medium text-base leading-6 tracking-0 transition-colors shadow-[0px_1.08px_2.16px_0px] shadow-[#1018280A]"
                        >
                            Sign Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailModal