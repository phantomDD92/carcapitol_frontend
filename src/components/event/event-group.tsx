import { Event } from '@/types/event.interface';
import { EventItem } from './event-item';

interface EventGroupProps {
  range: string;
  events: Event[];
}

export function EventGroup({ range, events }: EventGroupProps) {
  return (
    <div className="space-y-1">
      <div className="text-sm text-gray-500">{range}</div>
      <div className="space-y-2">
        {events.map((event, index) => (
          <EventItem
            key={event.id}
            event={event}
            showIndicator={index === events.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
