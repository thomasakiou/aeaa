import { Coffee, Mic, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ScheduleEvent {
    time: string;
    title: string;
    icon: LucideIcon;
    type: 'break' | 'keynote' | 'session';
}

export interface ScheduleDay {
    day: string;
    date: string;
    events: ScheduleEvent[];
}

export const scheduleData: ScheduleDay[] = [
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
