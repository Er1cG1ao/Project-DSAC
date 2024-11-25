// src/components/GradeSelector.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const GradeSelector = ({ onChange }) => {
    const navigate = useNavigate();

    const handleGradeSelect = (selectedGrade) => {
        onChange(selectedGrade);
        navigate(`/subjects/${selectedGrade}`); // Navigate to the specific subjects page
    };

    return (
        <div className="flex flex-col items-center">
            <img src="assets/kslogo.png" alt="Keystone Logo" className="w-40 mb-6" />
            <h2 className="text-xl font-semibold">Select Your Grade</h2>
            <div className="flex justify-center space-x-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleGradeSelect('Grade 11')}
                >
                    Grade 11
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleGradeSelect('Grade 12')}
                >
                    Grade 12
                </button>
            </div>
        </div>
    );
};

export default GradeSelector;