import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MyCalendar from './MyCalendar'; // Import the FullCalendar component
import allData from '../data/G11AllData.json';

const Calendar = ({ selectedCourses, selectedGrade }) => {
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const boxRef = useRef(null);

    useEffect(() => {
        const fetchExams = () => {
            let allExams = [];
            try {
                selectedCourses.forEach(course => {
                    for (const subject in allData) {
                        const courseData = allData[subject]?.courses[course];
                        if (courseData) {
                            allExams = allExams.concat(courseData.assessments.map(assessment => ({
                                ...assessment,
                                course: course
                            })));
                        }
                    }
                });

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
            navigate(`/subjects/${selectedGrade}`, { state: { selectedCourses } });
        } else {
            navigate('/');
        }
    };

    if (loading) {
        return <div className="text-center">Loading exams...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600">{error}</div>;
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-grow overflow-hidden">
                <div
                    ref={boxRef}
                    className="overflow-y-auto border-r border-gray-300 h-full w-1/5 p-4" // Adjusted to 1/5 width
                    style={{
                        whiteSpace: 'nowrap',
                        minWidth: 'fit-content'
                    }}
                >
                    <h2 className="text-xl font-bold mb-4">Upcoming Exams</h2>
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

                <div className="flex-1 p-8 overflow-auto w-4/5"> {/* Adjusted to 4/5 width */}
                    <MyCalendar events={exams.map(exam => ({
                        title: exam.course+" "+exam.description,
                        date: exam.date,
                    }))} />
                </div>
            </div>

            <div className="p-4">
                <button
                    onClick={handleModifySelection}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Modify Selection
                </button>
            </div>
        </div>
    );
};

export default Calendar;