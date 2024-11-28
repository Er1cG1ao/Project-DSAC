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

    // Format date to ensure month is always two digits
    const formatDateString = (dateStr) => {
        if (!dateStr) return ''; // Ensure dateStr is defined
        const parts = dateStr.split('-');
        if (parts.length !== 3) return dateStr; // Return original if not in expected format
        const [year, month, day] = parts;
        return `${year}-${parseInt(month, 10)}-${parseInt(day, 10)}`;
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
        const formattedDate = formatDateString(info.dateStr); // Format the date for consistency

        // Check if formattedDate is still valid before proceeding
        if (!formattedDate) {
            console.error('Formatted date is invalid:', info.dateStr);
            return; // Exit if the date is not valid
        }

        const codeDay = codeDays[formattedDate] || ''; // Get CodeDay for the specific date
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