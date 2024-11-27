import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import GradeSelector from './components/GradeSelector';
import SubjectPage from './components/SubjectPage';
import Calendar from './components/Calendar';
import './index.css';

const Title = () => {
    const location = useLocation();
    return (
        <>
            {location.pathname !== '/calendar' && (
                <h1 className="text-3xl font-bold mb-4">Project D.S.A.C</h1>
            )}
        </>
    );
};

const App = () => {
    const [grade, setGrade] = useState(null);
    const [selectedCourses, setSelectedCourses] = useState([]);

    const handleGradeChange = (selectedGrade) => {
        setGrade(selectedGrade);
    };

    const handleCourseSelection = (courses) => {
        setSelectedCourses(courses);
    };

    return (
        <Router>
            <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
                <Title />
                <Routes>
                    <Route
                        path="/"
                        element={<GradeSelector onGradeChange={handleGradeChange} />}
                    />
                    <Route
                        path="/subjects/:grade"
                        element={<SubjectPage selectedCourses={selectedCourses} onCourseChange={handleCourseSelection} />}
                    />
                    <Route
                        path="/calendar"
                        element={<Calendar selectedCourses={selectedCourses} selectedGrade={grade} />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;