import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import allData from '../data/G11AllData.json'; // Adjust based on your actual path

const Notification = ({ message, visible }) => {
    return (
        <div className={`fixed top-4 right-4 p-2 bg-green-500 text-white rounded transition-transform duration-300 ${visible ? 'translate-x-0' : 'translate-x-[150%]'}`}>
            {message}
        </div>
    );
};

const SubjectPage = () => {
    const navigate = useNavigate();
    const { grade } = useParams(); // Get grade from URL params
    const [selectedCourses, setSelectedCourses] = useState({});
    const [subjects, setSubjects] = useState(Object.keys(allData));
    const [personalKey, setPersonalKey] = useState('');
    const [notificationVisible, setNotificationVisible] = useState(false);

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
        generatePersonalKey({ ...selectedCourses, [subject]: course });
    };

    const generatePersonalKey = (courses) => {
        const keyParts = [grade]; // Start with the grade
        subjects.forEach(subject => {
            if (courses[subject]) {
                keyParts.push(courses[subject]); // Add only if a course is selected
            }
        });
        setPersonalKey(keyParts.join(';')); // Join with semicolon
    };

    const handleCopyKey = () => {
        navigator.clipboard.writeText(personalKey)
            .then(() => {
                setNotificationVisible(true);
                setTimeout(() => {
                    setNotificationVisible(false);
                }, 1000); // Hide after 1 second
            })
            .catch(err => console.error('Failed to copy: ', err));
    };

    const handleSubmit = () => {
        const coursesToSend = Object.values(selectedCourses).filter(course => course !== '');
        if (coursesToSend.length > 0) {
            navigate('/calendar', { state: { selectedCourses: coursesToSend, grade } }); // Pass the grade
        } else {
            alert('Please select at least one course before confirming your selection.'); // Alert if no course is selected
        }
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
            {/* Personal Key Display Box */}
            <div className="mb-4 p-4 border rounded bg-gray-100 flex flex-col items-center justify-center">
                <h3 className="font-semibold text-center">Your Personal Key:</h3>
                <p className="text-lg text-center">{personalKey}</p>
                <button
                    onClick={handleCopyKey}
                    className="mt-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Copy
                </button>
            </div>
            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                View Calendar
            </button>
            <Notification message="Personal key copied!" visible={notificationVisible} />
        </div>
    );
};

export default SubjectPage;