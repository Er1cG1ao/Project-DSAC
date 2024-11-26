import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import coursesData from '../data/G11Courses.json';

const Calendar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedCourses = location.state?.selectedCourses || [];
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExams = async () => {
            let allExams = [];
            try {
                const examsArray = await Promise.all(selectedCourses.map(async (title) => {
                    const courseEntry = coursesData.flatMap(subject =>
                        subject.courses.find(course => course.title === title)
                    ).pop();

                    if (courseEntry) {
                        const filePath = courseEntry.path;
                        try {
                            const response = await import(`${filePath}`);
                            if (response.assessments) {
                                return response.assessments.map(assessment => ({
                                    date: new Date(assessment.date),
                                    description: assessment.description,
                                }));
                            }
                        } catch (error) {
                            console.error(`Error loading data for ${title}:`, error);
                        }
                    }
                    return [];
                }));

                allExams = examsArray.flat();
                setExams(allExams);
            } catch (error) {
                console.error('Error fetching exams:', error);
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

    if (loading) {
        return <div className="text-center">Loading exams...</div>;
    }

    const handleModifySelection = () => {
        navigate(`/${location.state?.grade}/subjects/${location.state?.grade}`, { state: { selectedCourses } });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Upcoming Exams</h2>
            {exams.length === 0 ? (
                <p>No upcoming exams.</p>
            ) : (
                <ul className="list-disc pl-5">
                    {exams.map((exam, index) => (
                        <li key={index} className="mb-2">
                            <strong>{exam.date.toLocaleDateString()}</strong>: {exam.description}
                        </li>
                    ))}
                </ul>
            )}
            <button
                onClick={handleModifySelection}
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Modify Selection
            </button>
        </div>
    );
};

export default Calendar;