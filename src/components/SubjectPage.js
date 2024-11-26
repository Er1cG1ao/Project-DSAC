import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import allData from '../data/G11AllData.json'; // Adjust based on your actual path

const SubjectPage = () => {
    const navigate = useNavigate();
    const { grade } = useParams(); // Get grade from URL params
    const [selectedCourses, setSelectedCourses] = useState({});
    const [subjects, setSubjects] = useState(Object.keys(allData));

    useEffect(() => {
        // Initialize selectedCourses based on subjects
        const initialCourses = {};
        subjects.forEach(subject => {
            initialCourses[subject] = ''; // Set initial value to an empty string
        });
        setSelectedCourses(initialCourses);
    }, [subjects]);

    const handleCourseSelection = (subject, course) => {
        setSelectedCourses(prev => ({
            ...prev,
            [subject]: course
        }));
    };

    const handleSubmit = () => {
        const coursesToSend = Object.values(selectedCourses).filter(course => course !== '');
        navigate('/calendar', { state: { selectedCourses: coursesToSend } }); // Pass selected courses
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Select Your Courses for {grade}</h1>
            <div className="grid grid-cols-3 gap-4">
                {subjects.map(subject => (
                    <div key={subject} className="mb-4 p-4 border rounded shadow">
                        <h2 className="text-2xl font-semibold">{subject}</h2>
                        <select
                            value={selectedCourses[subject]}
                            onChange={(e) => handleCourseSelection(subject, e.target.value)}
                            className="mt-2 p-2 border rounded w-full"
                        >
                            <option value="">Select a course</option>
                            {Object.keys(allData[subject].courses).map(course => (
                                <option key={course} value={course}>
                                    {course}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                View Calendar
            </button>
        </div>
    );
};

export default SubjectPage;