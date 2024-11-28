import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import allData from '../data/G11AllData.json';

const Notification = ({ message, visible, type }) => {
    const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';
    return (
        <div className={`fixed top-4 right-4 p-2 ${bgColor} text-white rounded transition-transform duration-300 ${visible ? 'translate-x-0' : 'translate-x-[150%]'}`}>
            {message}
        </div>
    );
};

const SubjectPage = ({ selectedCourses, onCourseChange }) => {
    const navigate = useNavigate();
    const { grade } = useParams();
    const location = useLocation();
    const [courses, setCourses] = useState({});
    const [subjects, setSubjects] = useState(Object.keys(allData));
    const [personalKey, setPersonalKey] = useState('');
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('');

    // Initialize courses from the props or location state
    useEffect(() => {
        const initialCourses = {};
        const stateCourses = location.state?.selectedCourses || {};

        subjects.forEach(subject => {
            initialCourses[subject] = stateCourses[subject] || ''; // Load from location state
        });
        setCourses(initialCourses);
    }, [subjects, location.state]);

    const handleCourseSelection = (subject, course) => {
        setCourses(prev => ({
            ...prev,
            [subject]: course
        }));
        generatePersonalKey({ ...courses, [subject]: course });
    };

    const generatePersonalKey = (courses) => {
        const keyParts = [grade];
        subjects.forEach(subject => {
            if (courses[subject]) {
                keyParts.push(courses[subject]);
            }
        });
        setPersonalKey(keyParts.join(';'));
    };

    const handleCopyKey = () => {
        navigator.clipboard.writeText(personalKey)
            .then(() => {
                setNotificationMessage('Personal key copied!');
                setNotificationType('success');
                setNotificationVisible(true);
                setTimeout(() => {
                    setNotificationVisible(false);
                }, 1000); // Dismiss notification after 1 second
            })
            .catch(err => console.error('Failed to copy: ', err));
    };

    const handleKeyInput = () => {
        const keyParts = personalKey.split(';').map(part => part.trim());
        const keyGrade = keyParts[0];
        const keyCourses = keyParts.slice(1);

        // Validate grade
        if (keyGrade !== grade) {
            setNotificationMessage('Grade mismatch. Key will not be processed.');
            setNotificationType('error');
            setNotificationVisible(true);
            setTimeout(() => {
                setNotificationVisible(false);
            }, 3000); // Dismiss notification after 3 seconds
            return; // Do not navigate back to home
        }

        // Match courses to subjects
        const updatedCourses = { ...courses };

        // Iterate over each course in the key
        keyCourses.forEach(course => {
            subjects.forEach(subject => {
                const availableCourses = Object.keys(allData[subject]?.courses || {});
                if (availableCourses.includes(course)) {
                    updatedCourses[subject] = course; // Automatically select the matching course
                }
            });
        });

        // Update courses state
        setCourses(updatedCourses);
    };

    const handleSubmit = () => {
        const coursesToSend = Object.values(courses).filter(course => course !== '');
        if (coursesToSend.length > 0) {
            onCourseChange(coursesToSend);
            navigate('/calendar', { state: { selectedCourses: coursesToSend, selectedGrade: grade } });
        } else {
            alert('Please select at least one course before confirming your selection.');
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
                            value={courses[subject]}
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

            {/* Key Input Section */}
            <div className="mb-4 p-4 border rounded bg-gray-100 flex flex-col items-center justify-center">
                <h3 className="font-semibold text-center">Or Input Your Personal Key:</h3>
                <input
                    type="text"
                    value={personalKey}
                    onChange={(e) => setPersonalKey(e.target.value)}
                    placeholder="Paste your personal key here"
                    className="mt-2 p-2 border rounded w-full"
                />
                <div className="flex space-x-2 mt-2">
                    <button
                        onClick={handleKeyInput}
                        disabled={!personalKey.trim()}
                        className={`px-4 py-2 ${personalKey.trim() ? 'bg-green-500' : 'bg-green-300 cursor-not-allowed'} text-white rounded hover:bg-green-600`}
                    >
                        Submit Key
                    </button>
                    <button
                        onClick={handleCopyKey}
                        disabled={!personalKey.trim()}
                        className={`px-4 py-2 ${personalKey.trim() ? 'bg-blue-500' : 'bg-blue-300 cursor-not-allowed'} text-white rounded hover:bg-blue-600`}
                    >
                        Copy Key
                    </button>
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                View Calendar
            </button>
            <Notification message={notificationMessage} visible={notificationVisible} type={notificationType} />
        </div>
    );
};

export default SubjectPage;