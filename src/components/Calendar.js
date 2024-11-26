import React, { useEffect, useState } from 'react';
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

    const handleModifySelection = () => {
        if (selectedGrade) {
            navigate(`/subjects/${selectedGrade}`, { state: { selectedCourses } }); // Use selectedGrade in the URL
        } else {
            console.error('Selected grade is undefined');
            // Handle the error case as needed, maybe navigate to an error page or show a message
        }
    };

    if (loading) {
        return <div className="text-center">Loading exams...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600">{error}</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Upcoming Exams</h2>
            <button
                onClick={handleModifySelection}
                className="block mx-auto mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Modify Selection
            </button>
            {exams.length === 0 ? (
                <p>No upcoming exams.</p>
            ) : (
                <div className="overflow-y-auto max-h-60 border border-gray-300 p-4">
                    {exams.map((exam, index) => (
                        <div key={index} className="mb-2 text-left">
                            <strong>{exam.date}</strong>: {exam.course}: {exam.description}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Calendar;