import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InstructionPage = () => {
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleNext = () => {
        if (isChecked) {
            navigate('/recording');
        } else {
            alert("Please agree to the terms before proceeding.");
        }
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 shadow-lg rounded-lg p-6 hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105">
                DIC Speech <span className="text-green-500">Dataset Collection</span> Project
            </h1>
            <div className=" w-11/12 max-w-screen bg-white p-8 rounded-lg shadow-lg mb-24  bg-gradient-to-br from-gray-300 to-slate-400">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Instructions:</h2>
                <ol className="list-decimal ml-6 text-gray-700 text-lg">
                    <li className="mb-2">Select a particular language first and then start recording.</li>
                    <li className="mb-2">Try test runs with 2 or 3 sentences to ensure your mic and audio are recording clearly.</li>
                    <li className="mb-2">Complete all sentences in a chosen language before switching to another.</li>
                    <li className="mb-2">Download all recordings as a single file when finished.</li>
                    <li className="mb-2">Try to record all 18 sentences in all 3 languages.</li>
                    <li className="mb-2">After recording sentences in one language, switch to another language from the dropdown menu. If the recording buttons are disabled after switching, press reset to enable them.</li>
                    <li className="mb-2">If your native language isn't among the 3 provided, you can record in your native language under the 'Other Language' tab.</li>
                    <li className="mb-2">Make sure all files are recorded properly. If some files are not recorded correctly, please record them again.</li>
                    <li className="mb-2">After recording in all languages, submit a combined .ZIP file containing all the folders of the recorded languages.</li>
                </ol>
                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
                    <button onClick={handleGoBack} className="mb-4 sm:mb-0 w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Go Back
                    </button>
                    <div>
                        <input
                            type="checkbox"
                            id="agreement"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        <label htmlFor="agreement" className="text-sm font-bold text-gray-800">
                            I agree to the terms and conditions.
                        </label>
                        <button onClick={handleNext} className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructionPage;
