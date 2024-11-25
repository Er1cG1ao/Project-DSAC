import React, { useEffect, useState } from 'react';

const Calendar = ({ selectedCourses }) => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const examPromises = selectedCourses.map(async (filePath, index) => {
                    console.log(`Attempting to load exams from: ${filePath}`); // Debug
                    const response = await import(`${filePath}`);
                    return response.assessments.map(assessment => ({
                        date: new Date(assessment.date),
                        description: assessment.description,
                        course: filePath.split('/').pop().replace('.json', ''), // 提取课程名称
                    }));
                });

                const examsArray = await Promise.all(examPromises);
                const allExams = examsArray.flat();
                setExams(allExams);
            } catch (error) {
                console.error("Error fetching exams:", error);
            } finally {
                setLoading(false);
            }
        };

        if (selectedCourses.length > 0) {
            fetchExams();
        }
    }, [selectedCourses]);

    if (loading) {
        return <div className="text-center">Loading exams...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Upcoming Exams</h2>
            {exams.length === 0 ? (
                <p>No upcoming exams.</p>
            ) : (
                <ul className="list-disc pl-5">
                    {exams.map((exam, index) => (
                        <li key={index} className="mb-2">
                            <strong>{exam.date.toLocaleDateString()}</strong>: {exam.description} (Course: {exam.course})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Calendar;