import { Event } from '@/types/event.interface';
import { EventDateBadge } from '@/components/event/event-data-badge';

interface EventItemProps {
  event: Event;
  showIndicator?: boolean;
}

export function EventItem({ event, showIndicator = false }: EventItemProps) {
  return (
    <div className="relative flex items-start space-x-4 py-2">
      <EventDateBadge weekday={event.date.weekday} day={event.date.day} />
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
        <p className="text-sm text-gray-500">{event.time}</p>
      </div>
      {showIndicator && (
        <div className="absolute -left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-red-500" />
      )}
    </div>
  );
}
