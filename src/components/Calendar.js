import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import allData from '../data/G11AllData.json'; // Import the all data JSON

const Calendar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedCourses = location.state?.selectedCourses || [];
    const selectedGrade = location.state?.grade; // Capture the selected grade
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const boxRef = useRef(null);

    useEffect(() => {
        const fetchExams = () => {
            let allExams = [];
            try {
                // Loop through selected courses
                selectedCourses.forEach(course => {
                    for (const subject in allData) {
                        const courseData = allData[subject]?.courses[course];
                        if (courseData) {
                            // Include the course name in the exams
                            allExams = allExams.concat(courseData.assessments.map(assessment => ({
                                ...assessment,
                                course: course // Add the course name
                            })));
                        }
                    }
                });

                // Sort exams by date
                allExams.sort((a, b) => new Date(a.date) - new Date(b.date));
                setExams(allExams);
            } catch (error) {
                console.error('Error fetching exams:', error);
                setError('Failed to fetch exams');
            } finally {
                setLoading(false);
            }
        };

        if (selectedCourses.length > 0) {
            fetchExams();
        } else {
            setLoading(false);
        }
    }, [selectedCourses]);

    useEffect(() => {
        if (boxRef.current) {
            const longestLine = [...boxRef.current.children].reduce((maxWidth, current) => {
                return Math.max(maxWidth, current.scrollWidth);
            }, 0);
            boxRef.current.style.width = `${longestLine}px`;
        }
    }, [exams]);

    const handleModifySelection = () => {
        if (selectedGrade) {
            navigate(`/subjects/${selectedGrade}`, { state: { selectedCourses } }); // Use selectedGrade in the URL
        } else {
            console.error('Selected grade is undefined');
        }
    };

    if (loading) {
        return <div className="text-center">Loading exams...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600">{error}</div>;
    }

    return (
        <div className="flex h-screen w-full" style={{ margin: 0, padding: 0 }}>
            {/* Scrollable Box with Adaptive Width, aligned to the left */}
            <div
                ref={boxRef}
                className="overflow-y-auto border-r border-gray-300 h-screen"
                style={{
                    whiteSpace: 'nowrap',
                    padding: '1rem',
                    margin: 0,
                    minWidth: 'fit-content'
                }}
            >
                <h2 className="text-xl font-bold mb-4">Upcoming Exams</h2> {/* Moved into the box */}
                {exams.length === 0 ? (
                    <p>No upcoming exams.</p>
                ) : (
                    exams.map((exam, index) => (
                        <div key={index} className="mb-2 text-left" style={{ whiteSpace: 'nowrap' }}>
                            <strong>{exam.date}</strong>: {exam.course}: {exam.description}
                        </div>
                    ))
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <button
                    onClick={handleModifySelection}
                    className="block mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Modify Selection
                </button>
            </div>
        </div>
    );
};

export default Calendar;