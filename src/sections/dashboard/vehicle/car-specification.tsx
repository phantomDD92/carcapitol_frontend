import { ICarDetail } from '@/types/car-info.interface';
import { getDriveTrainName } from '@/utils/string';
import {
  Car,
  Gauge,
  Settings,
  Paintbrush,
  MapPin,
  AlertTriangle,
  PenToolIcon as Tool,
} from 'lucide-react';

const specifications = [
  {
    icon: Car,
    label: 'Body type',
    value: 'Coupe',
  },
  {
    icon: Gauge,
    label: 'Mileage',
    value: '15,000 km',
  },
  {
    icon: Settings,
    label: 'Modification',
    value: '2.5L Turbocharged Flat-4',
  },
  {
    icon: Settings,
    label: 'Transmission',
    value: 'Automatic',
  },
  {
    icon: Settings,
    label: 'Engine',
    value: 'Petrol, 3 L',
  },
  {
    icon: Settings,
    label: 'Drive',
    value: 'All-wheel',
  },
  {
    icon: Paintbrush,
    label: 'Color',
    value: 'Black, Glossy coating',
  },
  {
    icon: AlertTriangle,
    label: 'Road traffic accident',
    value: 'Restored after',
  },
  {
    icon: MapPin,
    label: 'Driven from',
    value: 'Japan',
  },
  {
    icon: Tool,
    label: 'Technical condition',
    value: 'Well-Maintained',
  },
];

type Props = {
  car: ICarDetail
};

function CarFeatureStat({ icon, label, value }: { icon: string, label: string, value: string }) {
  return (
    <li className='flex items-center gap-6 text-sm'>
      <div className='rounded-full border border-black size-10 p-1.5'>
        <img src={icon} />
      </div>
      <div>
        <h5>{label}</h5>
        <p>{value}</p>
      </div>
    </li>
  )
}

export function CarSpecifications({ car }: Props) {
  return (
    <>
      <section id="featuredStat">
        <h2 className='text-2xl pb-4'>Features</h2>
        <ul className="grid grid-cols-2 gap-6">
          <CarFeatureStat
            icon='/icon-total-mileage.svg'
            label="Mileage"
            value={Math.floor(car.mileage).toLocaleString()}
          />
          <CarFeatureStat
            icon='/icon-drivetrain.svg'
            label="Drivetrain"
            value={getDriveTrainName(car.driveTrain)}
          />
          <CarFeatureStat
            icon='/icon-exterior-color.svg'
            label="Exterior Color"
            value={car.exteriorColor}
          />
          <CarFeatureStat
            icon='/icon-interior-color.svg'
            label="Interior Color"
            value={car.interiorColor}
          />
        </ul>
      </section>
      <div className="grid grid-cols-2 gap-6">
        {specifications.map((spec) => {
          const Icon = spec.icon;
          return (
            <div key={spec.label} className="flex items-start gap-3">
              <div className="rounded-lg p-2">
                <Icon className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{spec.label}</p>
                <p className="font-medium">{spec.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
