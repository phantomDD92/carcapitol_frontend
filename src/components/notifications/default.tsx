export default function NotificationBanner() {
  return (
    <div className="mb-6 rounded-lg bg-green-50 p-4">
      <div className="flex items-center justify-between">
        <p className="text-[var(--font-size-base)] text-green-700">
          Today you will be scheduled for a test drive with AutoNation Honda on
          10:15 AM
        </p>
        <button className="text-[var(--font-size-sm)] font-medium text-green-700 hover:text-green-800">
          View details
        </button>
      </div>
    </div>
  );
}
