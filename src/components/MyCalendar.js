// src/components/MyCalendar.js
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../MyCalendar.css'; // Import custom styles

const MyCalendar = ({ events }) => {
    const handleDateClick = (arg) => {
        alert(`Date clicked: ${arg.dateStr}`);
    };

    const handleEventClick = (clickInfo) => {
        alert(`Event: ${clickInfo.event.title}`);
    };

    // Define CodeDays for each date
    const codeDays = {
        '2024-11-24': 'E',
        '2024-11-25': 'F',
        '2024-11-26': 'G',
        '2024-11-27': 'H',
        // Add more dates as needed
    };

    const dayCellDidMount = (info) => {
        console.log(`Day cell mounted: ${info.dateStr}`); // Debugging line
        const codeDayLabel = document.createElement('div');
        const codeDay = codeDays[info.dateStr] || ''; // Get CodeDay for the specific date
        if (codeDay) {
            codeDayLabel.innerText = codeDay; // Set the label text
            codeDayLabel.classList.add('codeday-label'); // Add a class for styling
            info.el.prepend(codeDayLabel); // Append the label to the day cell
        }
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            height="auto"
            dayCellDidMount={dayCellDidMount} // Ensure it's included
            eventDisplay="block" // Optional: Force events to appear as blocks
            expandRows={true}
        />
    );
};

export default MyCalendar;