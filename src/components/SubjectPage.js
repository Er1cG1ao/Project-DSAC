// src/components/SubjectPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // 更新为 useNavigate
import coursesData from '../data/G11Courses.json';

const SubjectPage = () => {
    const { grade } = useParams();
    const navigate = useNavigate(); // 使用 useNavigate
    const [selectedCourses, setSelectedCourses] = useState({
        Chinese: '',
        English: '',
        Math: '',
        Humanities: '',
        Science: '',
        Art: ''
    });
    const [personalKey, setPersonalKey] = useState('');
    const [notification, setNotification] = useState('');
    const [subjectAreas, setSubjectAreas] = useState([]);

    useEffect(() => {
        setSubjectAreas(coursesData);
    }, []);

    const handleCourseChange = (subject, course) => {
        setSelectedCourses((prev) => ({
            ...prev,
            [subject]: course,
        }));
        generatePersonalKey({ ...selectedCourses, [subject]: course });
    };

    const generatePersonalKey = (courses) => {
        const keyParts = [grade];
        for (const area of Object.keys(courses)) {
            if (courses[area]) {
                keyParts.push(courses[area]);
            }
        }
        const key = keyParts.join(';');
        setPersonalKey(key);
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification('');
        }, 2000);
    };

    const handleConfirmSelection = () => {
        showNotification('Selection confirmed!');
        navigate(`/${grade}/calendar`, { state: { selectedCourses, grade } });
    };

    return (
        <div className="p-6 relative">
            <h2 className="text-2xl font-bold mb-4">{`${grade} Subjects`}</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
                {subjectAreas.map((area) => (
                    <div key={area.name} className="border p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-2">{area.name}</h3>
                        <select
                            className="w-full p-2 border rounded"
                            onChange={(e) => handleCourseChange(area.name, e.target.value)}
                            value={selectedCourses[area.name] || ""}
                        >
                            <option value="">Select a course</option>
                            {area.courses.map((course) => (
                                <option key={course.title} value={course.title}>
                                    {course.title}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
            <div className="mb-4 p-4 border rounded bg-gray-100">
                <h3 className="text-lg font-semibold">Personal Key:</h3>
                <div className="text-gray-700">{personalKey || 'Key will appear here after selection.'}</div>
            </div>
            <button
                onClick={handleConfirmSelection}
                className="mt-6 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                disabled={Object.values(selectedCourses).some(course => course === '')}
            >
                Confirm Selection
            </button>
            {notification && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-center text-green-600">{notification}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubjectPage;