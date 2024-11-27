import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GradeSelector = ({ onGradeChange }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [personalKey, setPersonalKey] = useState('');
    const [selectedGrade, setSelectedGrade] = useState(location.state?.selectedGrade || '');
    const [selectedCourses, setSelectedCourses] = useState(location.state?.selectedCourses || []);

    useEffect(() => {
        if (location.state) {
            setSelectedGrade(location.state.selectedGrade || '');
            setSelectedCourses(location.state.selectedCourses || []);
        }
    }, [location.state]);

    const handleGradeSelect = (grade) => {
        setSelectedGrade(grade);
        onGradeChange(grade); // Update the grade in App.js
        navigate(`/subjects/${grade}`);
    };

    const handleKeyInput = () => {
        const parts = personalKey.split(';');
        if (parts.length === 7) {
            const grade = parts[0];
            const courses = parts.slice(1);
            setSelectedGrade(grade);
            setSelectedCourses(courses);
            onGradeChange(grade); // Update the grade in App.js
            navigate('/calendar', { state: { selectedCourses: courses, selectedGrade: grade } });
        } else {
            alert('Invalid key format. Please use the format: Grade level;Chinese course;English Course;Math course;Humanities course;Science course;Art course');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <img src="assets/kslogo.png" alt="Keystone Logo" className="w-40 mb-6" />
            <h2 className="text-xl font-semibold mb-4">Select Your Grade</h2>
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

            {/* Footer Section */}
            <div className="fixed bottom-0 left-0 right-0 text-center text-sm p-1 bg-white shadow">
                <a href="https://github.com/Er1cG1ao/Project-DSAC" className="block">
                    Version 0.0.1 Beta
                </a>
                <span className="block mb-0">
                    Developed by <a href="https://github.com/williamcompsci" className="text-black">williamcompsci</a> & <a href="https://github.com/Er1cG1ao" className="text-black">Er1cG1ao</a>
                </span>
                <div className="flex justify-center items-center ">
                    <a href="https://keycas.cn/" className="mr-1">
                        Powered by KeyCAS
                    </a>
                    <img src="assets/Keystone Blue Round Black.png" alt="KeyCAS Logo" className="h-6 w-auto" />
                </div>
            </div>
        </div>
    );
};

export default GradeSelector;