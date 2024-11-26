import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GradeSelector = () => {
    const navigate = useNavigate();
    const [personalKey, setPersonalKey] = useState('');

    const handleGradeSelect = (selectedGrade) => {
        navigate(`/subjects/${selectedGrade}`); // Navigate to the specific subjects page
    };

    const handleKeyInput = () => {
        const parts = personalKey.split(';');
        if (parts.length === 7) {
            const grade = parts[0];
            const courses = parts.slice(1);

            // Navigate to the calendar with the selected courses
            navigate('/calendar', { state: { selectedCourses: courses } });
        } else {
            alert('Invalid key format. Please use the format: Grade level;Chinese course;English Course;Math course;Humanities course;Science course;Art course');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <img src="assets/kslogo.png" alt="Keystone Logo" className="w-40 mb-6" />
            <h2 className="text-xl font-semibold mb-4">Select Your Grade</h2> {/* Added mb-4 for more space */}
            <div className="flex justify-center space-x-4 mb-4">
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
            <div className="mb-4">
                <input
                    type="text"
                    value={personalKey}
                    onChange={(e) => setPersonalKey(e.target.value)}
                    placeholder="Or input your personalised key directly"
                    className="p-2 border rounded w-full"
                />
                <button
                    onClick={handleKeyInput}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Submit Key
                </button>
            </div>
        </div>
    );
};

export default GradeSelector;