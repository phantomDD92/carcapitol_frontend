interface EventDateBadgeProps {
  weekday: string;
  day: number;
}

export function EventDateBadge({ weekday, day }: EventDateBadgeProps) {
  return (
    <div className="flex w-12 flex-col text-gray-600">
      <span className="text-sm">{weekday}</span>
      <span className="text-2xl font-semibold">{day}</span>
    </div>
  );
}
