'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Event {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: Date;
  type: 'test-drive' | 'offer';
}

const events: Event[] = [
  {
    id: '1',
    title: 'Test Drive - 2022 Toyota Camry SE',
    startTime: '10:00',
    endTime: '11:00',
    date: new Date(2024, 8, 9), // September 9
    type: 'test-drive',
  },
  {
    id: '2',
    title: 'Offer - 2021 Honda Accord EX-L',
    startTime: '12:30',
    endTime: '14:00',
    date: new Date(2024, 8, 10), // September 10
    type: 'offer',
  },
  {
    id: '3',
    title: 'Test Drive - 2022 Toyota Camry SE',
    startTime: '10:00',
    endTime: '11:00',
    date: new Date(2024, 8, 19), // September 19
    type: 'test-drive',
  },
  {
    id: '4',
    title: 'Offer - 2021 Honda Accord EX-L',
    startTime: '12:30',
    endTime: '14:00',
    date: new Date(2024, 8, 24), // September 24
    type: 'offer',
  },
];

function groupEventsByWeek(events: Event[]) {
  const weeks: { [key: string]: Event[] } = {};

  events.forEach((event) => {
    const date = event.date;
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay()); // Get Sunday
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const weekKey = `${weekStart.getDate()} - ${weekEnd.getDate()} sep.`;
    if (!weeks[weekKey]) {
      weeks[weekKey] = [];
    }
    weeks[weekKey].push(event);
  });

  return weeks;
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function UpcomingEvents() {
  const groupedEvents = groupEventsByWeek(events);

  return (
    <div className="w-full max-w-sm rounded-xl border bg-white p-6">
      <div className="space-y-6">
        <h2 className="text-lg font-medium">Upcoming Events</h2>

        <Select defaultValue="september">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="september">September</SelectItem>
            <SelectItem value="october">October</SelectItem>
            <SelectItem value="november">November</SelectItem>
          </SelectContent>
        </Select>

        <div className="space-y-6">
          {Object.entries(groupedEvents).map(([weekRange, weekEvents]) => (
            <div key={weekRange} className="space-y-2">
              <div className="text-sm text-gray-500">{weekRange}</div>
              <div className="space-y-2">
                {weekEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 rounded-lg bg-gray-50 p-3"
                  >
                    <div className="text-center">
                      <div className="text-sm text-gray-500">
                        {dayNames[event.date.getDay()]}
                      </div>
                      <div className="text-2xl font-medium">
                        {event.date.getDate()}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        <div className="text-sm font-medium">{event.title}</div>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {event.startTime}-{event.endTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
