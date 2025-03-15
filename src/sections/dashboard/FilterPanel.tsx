import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  selectedOption?: string;
  onSelect: (value: string) => void;
}

function FilterSection({
  title,
  options,
  selectedOption,
  onSelect,
}: FilterSectionProps) {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-base text-gray-500">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={cn(
              'flex items-center rounded-lg px-4 py-2 text-sm',
              selectedOption === option.value
                ? 'bg-blue-50 text-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            )}
          >
            {option.label}
            {selectedOption === option.value && <X className="ml-2 h-4 w-4" />}
          </button>
        ))}
      </div>
    </div>
  );
}

export function FilterPanel() {
  return (
    <div className="absolute right-0 top-full mt-2 w-[580px] rounded-lg border bg-white p-6 shadow-lg">
      <FilterSection
        title="Transaction status"
        options={[
          { label: 'Active', value: 'active' },
          { label: 'Completed', value: 'completed' },
          { label: 'Pending', value: 'pending' },
          { label: 'In Progress', value: 'in-progress' },
        ]}
        selectedOption="completed"
        onSelect={() => {}}
      />

      <FilterSection
        title="Operation type"
        options={[
          { label: 'Purchase', value: 'purchase' },
          { label: 'Sale', value: 'sale' },
          { label: 'Trade-In', value: 'trade-in' },
          { label: 'Credit', value: 'credit' },
        ]}
        onSelect={() => {}}
      />

      <FilterSection
        title="Time"
        options={[
          { label: 'Today', value: 'today' },
          { label: 'This week', value: 'this-week' },
          { label: 'This month', value: 'this-month' },
          { label: 'This year', value: 'this-year' },
        ]}
        onSelect={() => {}}
      />

      <FilterSection
        title="Payment method"
        options={[
          { label: 'Credit', value: 'credit' },
          { label: 'Cash', value: 'cash' },
          { label: 'Bank Transfer', value: 'bank-transfer' },
        ]}
        onSelect={() => {}}
      />
    </div>
  );
}
