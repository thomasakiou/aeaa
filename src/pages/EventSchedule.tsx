import '../styles/animations.css';
import './css/Programme.css';
import { ChevronDown, Clock } from 'lucide-react';
import { useState } from 'react';
import { scheduleData } from '../data/scheduleData';

export default function EventSchedule() {
    const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 0: true });

    const toggleDay = (dayIndex: number) => {
        setExpandedDays((current) => ({ ...current, [dayIndex]: !current[dayIndex] }));
    };

    return (
        <div className="programme-page">
            <div className="page-hero">
                <h1 className="animate-fade-up">
                    Event <span style={{ opacity: 0.7 }}>Schedule</span>
                </h1>
                <p className="animate-fade-up-d1">
                    43rd AEAA Conference — 16th to 20th August 2027
                </p>
            </div>
            <div className="page-body">
                <div className="programme-intro animate-fade-up-d2">
                    <Clock size={40} color="var(--color-green-primary)" />
                    <h2 className="section-title">
                        Full <span className="text-gradient">Programme</span>
                    </h2>
                    <p style={{ color: 'var(--color-text-light)', maxWidth: '600px', margin: '0 auto' }}>
                        Five days of keynote addresses, paper presentations, workshops, excursions, and networking opportunities.
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
                                    <div
                                        key={idx}
                                        className={`timeline-item type-${event.type}`}
                                        style={{ animationDelay: `${(dayIdx * 0.1) + (idx * 0.08)}s` }}
                                    >
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
