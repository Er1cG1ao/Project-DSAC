import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import coursesData from '../data/G11Courses.json'; // Import the JSON file
import Calendar from './Calendar'; // 引入日历组件

const SubjectPage = () => {
    const { grade } = useParams();
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
    const [showCalendar, setShowCalendar] = useState(false); // 新增状态

    useEffect(() => {
        setSubjectAreas(coursesData); // 读取课程数据
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
        }, 2000); // Notification disappears after 2 seconds
    };

    const handleConfirmSelection = () => {
        console.log("Selected courses:", selectedCourses); // Debug output
        if (Object.values(selectedCourses).some(course => course === '')) {
            showNotification('Please select all subjects before confirming your selection.');
            return;
        }
        showNotification('Selection confirmed!');
        setShowCalendar(true); // 显示日历
    };

    const handleCopyKey = () => {
        if (!personalKey) {
            showNotification('No key to copy.');
            return;
        }
        navigator.clipboard.writeText(personalKey);
        showNotification('Personal key copied to clipboard!');
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
                                <option key={course.title} value={course.path}>
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
                <button
                    onClick={handleCopyKey}
                    className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={!personalKey} // Disable button if no key is generated
                >
                    Copy Key
                </button>
            </div>
            <button
                onClick={handleConfirmSelection}
                className="mt-6 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                disabled={Object.values(selectedCourses).some(course => course === '')}
            >
                Confirm Selection
            </button>
            {showCalendar &&
                <Calendar
                    selectedCourses={[
                        selectedCourses.Chinese,
                        selectedCourses.English,
                        selectedCourses.Math,
                        selectedCourses.Humanities,
                        selectedCourses.Science,
                        selectedCourses.Art
                    ]} // 使用具体的课程路径
                />
            }
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