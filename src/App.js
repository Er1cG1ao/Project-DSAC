// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GradeSelector from './components/GradeSelector';
import SubjectPage from './components/SubjectPage';
import './index.css';

const App = () => {
    const [grade, setGrade] = useState(null);

    const handleGradeChange = (selectedGrade) => {
        setGrade(selectedGrade);
    };

    return (
        <Router>
            <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
                <h1 className="text-3xl font-bold mb-4">Project D.S.A.C</h1>
                <Routes>
                    <Route path="/" element={<GradeSelector onChange={handleGradeChange} />} />
                    <Route path="/subjects/:grade" element={<SubjectPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;