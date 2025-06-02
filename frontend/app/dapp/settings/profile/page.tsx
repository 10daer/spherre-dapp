"use client"

import EmailModal from "@/app/components/EmailModal";
import { useState } from "react";

export default function Page() {

    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleSave = (email: string) => {
        console.log('Saved email:', email);
        alert(`Email saved: ${email}`);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-center flex items-center justify-center">
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
                Open Email Modal
            </button>

            <EmailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialEmail="johnsmith@gmail.com"
            />
        </div>
    );
};

