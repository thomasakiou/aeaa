import '../styles/animations.css';
import './css/Programme.css';
import { CalendarDays, ChevronDown, Clock, Users, Mic, Coffee } from 'lucide-react';
import { useState } from 'react';

const keyDates = [
    { label: 'Conference Dates', date: '16th - 20th August 2027' },
    { label: 'Deadline for Submission of Abstracts', date: '31st March 2027' },
    { label: 'Notification of Acceptance', date: '30th April 2027' },
    { label: 'Deadline for Submission of Papers and Presentations', date: '31st May 2027' },
    { label: 'Registration Deadline for Presenters', date: '30th June 2027' },
    { label: 'Close of Online Registration', date: '31st July 2027' },
];

const scheduleData = [
    {
        day: 'Day 1',
        date: 'August 16, 2027',
        events: [
            { time: '08:00 - 09:00', title: 'Registration & Welcome Coffee', icon: Coffee, type: 'break' },
            { time: '09:00 - 10:30', title: 'Opening Ceremony & Keynote Address', icon: Mic, type: 'keynote' },
            { time: '10:30 - 11:00', title: 'Tea Break & Networking', icon: Coffee, type: 'break' },
            { time: '11:00 - 13:00', title: 'Parallel Paper Sessions I', icon: Users, type: 'session' },
            { time: '14:00 - 16:00', title: 'Parallel Paper Sessions II', icon: Users, type: 'session' },
        ],
    },
    {
        day: 'Day 2',
        date: 'August 17, 2027',
        events: [
            { time: '09:00 - 10:30', title: 'Plenary Session: Assessment Innovation in Africa', icon: Mic, type: 'keynote' },
            { time: '10:30 - 11:00', title: 'Tea Break', icon: Coffee, type: 'break' },
            { time: '11:00 - 13:00', title: 'Workshop Sessions', icon: Users, type: 'session' },
            { time: '14:00 - 15:30', title: 'Panel Discussion: The Future of NECO', icon: Mic, type: 'keynote' },
            { time: '15:30 - 17:00', title: 'Parallel Paper Sessions III', icon: Users, type: 'session' },
        ],
    },
    {
        day: 'Day 3',
        date: 'August 18, 2027',
        events: [
            { time: '09:00 - 10:30', title: 'Keynote: Technology in Educational Assessment', icon: Mic, type: 'keynote' },
            { time: '11:00 - 13:00', title: 'Parallel Paper Sessions IV', icon: Users, type: 'session' },
            { time: '14:00 - 15:00', title: 'Closing Ceremony & Awards', icon: Mic, type: 'keynote' },
            { time: '19:00 - 22:00', title: 'Gala Dinner & Cultural Night', icon: Coffee, type: 'break' },
        ],
    },
    {
        day: 'Day 4',
        date: 'August 19, 2027',
        events: [
            { time: '09:00 - 13:00', title: 'Cultural Excursions & Local Tours', icon: Users, type: 'session' },
            { time: '14:00 - 16:00', title: 'Post-Conference Workshops', icon: Mic, type: 'keynote' },
        ],
    },
    {
        day: 'Day 5',
        date: 'August 20, 2027',
        events: [
            { time: '08:00 - 12:00', title: 'Delegates Departure & Farewell Breakfast', icon: Coffee, type: 'break' },
        ],
    },
];

export default function Programme() {
    const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 0: true });

    const toggleDay = (dayIndex: number) => {
        setExpandedDays((current) => ({ ...current, [dayIndex]: !current[dayIndex] }));
    };

    return (
        <div className="programme-page">
            <div className="page-hero">
                <h1 className="animate-fade-up">Conference <span style={{ opacity: 0.7 }}>Programme</span></h1>
                <p className="animate-fade-up-d1">Explore the full schedule for the 43rd AEAA Conference.</p>
            </div>
            <div className="page-body">
                <section id="key-dates" className="key-dates-section animate-fade-up-d2">
                    <div className="key-dates-heading">
                        <CalendarDays size={34} color="var(--color-green-primary)" />
                        <div>
                            <h2 className="section-title">Key <span className="text-gradient">Dates</span></h2>
                            <p>Keep track of the important milestones for the 43rd AEAA Conference.</p>
                        </div>
                    </div>
                    <div className="key-dates-grid">
                        {keyDates.map((item) => (
                            <div key={item.label} className="key-date-card">
                                <span>{item.label}</span>
                                <strong>{item.date}</strong>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="programme-intro animate-fade-up-d2">
                    <Clock size={40} color="var(--color-green-primary)" />
                    <h2 className="section-title">Event <span className="text-gradient">Schedule</span></h2>
                    <p style={{ color: 'var(--color-text-light)', maxWidth: '600px', margin: '0 auto' }}>
                        The programme spans three exciting days of keynote addresses, paper presentations, workshops, and networking opportunities.
                    </p>
                </div>

                {scheduleData.map((day, dayIdx) => (
                    <div key={dayIdx} className={`day-block animate-fade-up-d${Math.min(dayIdx + 2, 5)}`}>
                        <button
                            type="button"
                            className={`day-header ${expandedDays[dayIdx] ? 'day-header-expanded' : ''}`}
                            onClick={() => toggleDay(dayIdx)}
                            aria-expanded={Boolean(expandedDays[dayIdx])}
                            aria-controls={`day-schedule-${dayIdx}`}
                        >
                            <span className="day-heading-content">
                                <h3>{day.day}</h3>
                                <span className="day-date">{day.date}</span>
                            </span>
                            <ChevronDown size={22} className="day-toggle-icon" aria-hidden="true" />
                        </button>
                        {expandedDays[dayIdx] && <div id={`day-schedule-${dayIdx}`} className="timeline day-schedule-expanded">
                            {day.events.map((event, idx) => {
                                const Icon = event.icon;
                                return (
                                    <div key={idx} className={`timeline-item type-${event.type}`} style={{ animationDelay: `${(dayIdx * 0.1) + (idx * 0.08)}s` }}>
                                        <div className="timeline-dot">
                                            <Icon size={16} />
                                        </div>
                                        <div className="timeline-content">
                                            <span className="timeline-time">{event.time}</span>
                                            <h4>{event.title}</h4>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>}
                    </div>
                ))}
            </div>
        </div>
    );
}
