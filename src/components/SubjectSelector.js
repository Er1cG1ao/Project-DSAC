// src/components/SubjectSelector.js
import React, { useEffect, useState } from 'react';

const SubjectSelector = ({ grade, onSelect }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const subjectsData = {
            Grade11: {
                Chinese: [
                    "Chinese_LL_SL_Qiongqiong",
                    "Chinese_AB_SL_Lisi"
                ],
                Math: [
                    "Math_HL_Mark",
                    "Math_SL_Sarah"
                ]
            },
            Grade12: {
                Chinese: [
                    "Chinese_LL_SL_Qiongqiong",
                    "Chinese_AB_SL_Lisi"
                ],
                Math: [
                    "Math_HL_Mark",
                    "Math_SL_Sarah"
                ]
            }
        };

        if (grade) {
            setCourses(subjectsData[grade]);
        }
    }, [grade]);

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Select Your Subjects</h2>
            {courses && Object.keys(courses).length > 0 ? (
                Object.keys(courses).map((subject) => (
                    <div key={subject} className="mb-4">
                        <h3 className="font-medium">{subject}</h3>
                        <div className="flex justify-center space-x-4">
                            {courses[subject].map((course) => (
                                <button
                                    key={course}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    onClick={() => onSelect(course)}
                                >
                                    {course.replace(/_/g, ' ')} {/* Formatting for display */}
                                </button>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>No subjects available for this grade.</p>
            )}
        </div>
    );
};

export default SubjectSelector;