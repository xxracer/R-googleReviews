import React from 'react';
import './TrainingSchedule.css';

const scheduleData = [
    {
        day: 'Monday',
        sessions: [
            { time: '10:00 AM - 11:00 AM', title: 'Homeschool Kids', tags: ['kids'] },
            { time: '11:00 AM - 12:00 PM', title: 'Adults Jiu Jitsu (all levels)', tags: ['adults'] },
            { time: '4:00 PM - 5:00 PM', title: 'Private Lessons', tags: ['private'] },
            { time: '5:00 PM - 5:55 PM', title: 'Kids (7-9 yrs)', tags: ['kids'] },
            { time: '5:00 PM - 6:00 PM', title: 'Wrestling Program', tags: ['wrestling'] },
            { time: '6:00 PM - 6:55 PM', title: 'Kids (10-13 yrs)', tags: ['kids'] },
            { time: '7:00 PM - 8:00 PM', title: 'Adults Gi (all levels)', tags: ['adults'] }
        ]
    },
    {
        day: 'Tuesday',
        sessions: [
            { time: '4:00 PM - 5:00 PM', title: 'Private Lessons', tags: ['private'] },
            { time: '5:00 PM - 5:45 PM', title: 'Kids (4-6 yrs)', tags: ['kids'] },
            { time: '6:00 PM - 6:55 PM', title: 'Kids Comp Class', tags: ['kids'] },
            { time: '7:00 PM - 8:00 PM', title: 'Adults Gi (advanced)', tags: ['adults'] },
            { time: '7:00 PM - 8:00 PM', title: 'Adult Fundamentals', tags: ['adults'] }
        ]
    },
    {
        day: 'Wednesday',
        sessions: [
            { time: '10:00 AM - 11:00 AM', title: 'Homeschool Kids', tags: ['kids'] },
            { time: '11:00 AM - 12:00 PM', title: 'Adult Jiu Jitsu (all levels)', tags: ['adults'] },
            { time: '4:00 PM - 5:00 PM', title: 'Private Lessons', tags: ['private'] },
            { time: '5:00 PM - 5:55 PM', title: 'Kids (7-9 yrs)', tags: ['kids'] },
            { time: '5:00 PM - 6:00 PM', title: 'Wrestling Program', tags: ['wrestling'] },
            { time: '6:00 PM - 6:55 PM', title: 'Kids (10-13 yrs)', tags: ['kids'] },
            { time: '7:00 PM - 8:00 PM', title: 'Adults Gi (all levels)', tags: ['adults'] }
        ]
    },
    {
        day: 'Thursday',
        sessions: [
            { time: '4:00 PM - 5:00 PM', title: 'Private Lessons', tags: ['private'] },
            { time: '5:00 PM - 5:45 PM', title: 'Kids (4-6 yrs)', tags: ['kids'] },
            { time: '5:00 PM - 6:00 PM', title: 'Wrestling Program', tags: ['wrestling'] },
            { time: '6:00 PM - 6:55 PM', title: 'Kids Comp Class', tags: ['kids'] },
            { time: '7:00 PM - 8:00 PM', title: 'Adult Gi (Advanced)', tags: ['adults'] }
        ]
    },
    {
        day: 'Friday',
        sessions: [
            { time: '10:00 AM - 11:00 AM', title: 'Homeschool Kids', tags: ['kids'] },
            { time: '11:00 AM - 12:00 PM', title: 'Adult Jiu Jitsu (all levels)', tags: ['adults'] },
            { time: '4:00 PM - 5:00 PM', title: 'Private Lessons', tags: ['private'] },
            { time: '5:00 PM - 5:55 PM', title: 'Kids (7-9 yrs)', tags: ['kids'] },
            { time: '6:00 PM - 6:55 PM', title: 'Kids (10-13 yrs)', tags: ['kids'] },
            { time: '7:00 PM - 8:00 PM', title: 'Kids Comp Class (all levels)', tags: ['kids'] },
            { time: '7:00 PM - 8:00 PM', title: 'Adult Jiu Jitsu (all levels)', tags: ['adults'] }
        ]
    },
    {
        day: 'Saturday',
        sessions: [
            { time: '11:00 AM - 12:00 PM', title: 'Adults Gi (all levels)', tags: ['adults'] },
            { time: '11:00 AM - 12:00 PM', title: 'Adult Fundamentals', tags: ['adults'] },
            { time: '12:00 PM - 4:00 PM', title: 'Private Lessons', tags: ['private'] }
        ]
    },
    {
        day: 'Sunday',
        sessions: []
    }
];

const tagLabels = {
    kids: 'Kids',
    adults: 'Adults',
    private: 'Private Training',
    wrestling: 'Wrestling'
};

const TrainingSchedule = () => {
    return (
        <div className="schedule-page">
            <h1>Training Schedule</h1>
            <p className="schedule-intro">
                Below is the latest weekly schedule for Reign Jiu Jitsu in Katy, including daytime homeschool sessions, evening
                classes, and our brand-new Wrestling Program. Use it to plan your training and make the most of every mat time
                opportunity.
            </p>

            <div className="schedule-grid">
                {scheduleData.map((day) => (
                    <div key={day.day} className="schedule-day">
                        <h2>{day.day}</h2>
                        <ul className="schedule-sessions">
                            {day.sessions.length === 0 ? (
                                <li className="schedule-session">
                                    <span className="time">—</span>
                                    <p className="title">No scheduled sessions</p>
                                </li>
                            ) : (
                                day.sessions.map((session, index) => (
                                    <li key={`${day.day}-${index}`} className="schedule-session">
                                        <span className="time">{session.time}</span>
                                        <p className="title">{session.title}</p>
                                        {session.tags && session.tags.length > 0 && (
                                            <div className="session-tags">
                                                {session.tags.map((tag) => (
                                                    <span key={tag} className={`session-tag ${tag}`}>
                                                        {tagLabels[tag] || tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="schedule-cta">
                Looking for a private training slot or have scheduling questions? <a href="/contact">Contact us</a> and our team will
                help you get started.
            </div>
        </div>
    );
};

export default TrainingSchedule;
