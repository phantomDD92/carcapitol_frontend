import { CarColorType, CarConditionType, CarDriveTrainType, CarFuelType } from "@/types/car-info.interface";

export function getFuleTypeName(fuelType: CarFuelType, defaultValue: string = "All") {
  switch (fuelType) {
    case CarFuelType.BIODIESEL:
      return "Biodiesel";
    case CarFuelType.ELECTRIC:
      return "Electric";
    case CarFuelType.DIESEL:
      return "Diesel"
    case CarFuelType.GASOLINE:
      return "Gasoline";
    case CarFuelType.FLEX:
      return "Flex Fuel"
    case CarFuelType.HYBRID:
      return "Hybrid"
    default:
      break
  }
  return defaultValue;
}

export function getConditionName(condition: CarConditionType, defaultValue: string = "All") {
  switch (condition) {
    case CarConditionType.USED:
      return "Used";
    case CarConditionType.NEW:
      return "New";
    case CarConditionType.CPO:
      return "CPO";
    default:
      break
  }
  return defaultValue
}

const colorNames = [
  "",
  "BLACK",
  "BLUE",
  "BROWN",
  "GOLD",
  "GRAY",
  "GREEN",
  "ORANGE",
  "PINK",
  "PURPLE",
  "RED",
  "SILVER",
  "TEAL",
  "WHITE",
  "YELLOW",
];

const colorStyles = [
  "bg-transparent border-dashed border-gray-200",
  "bg-black-500",
  "bg-blue-500",
  "bg-amber-700",
  "bg-yellow-500",
  "bg-gray-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-purple-500",
  "bg-red-500",
  "bg-gray-300",
  "bg-teal-500",
  "bg-white border-gray-200",
  "bg-yellow-400",
];

const capitalizeFirstLetter = (str: string) =>
  `${str[0].toUpperCase()}${str.substring(1).toLowerCase()}`;

export function getColorName(color: CarColorType, defaultValue: string = "All") {
  if (color > 0 && color <= CarColorType.YELLOW)
    return capitalizeFirstLetter(colorNames[color])
  return defaultValue
}

export function getColorStyle(color: CarColorType) {
  return colorStyles[color]
}
const driveTrainNames = [
  "",
  "Front-Wheel Drive",  // Front-Wheel Drive
  "Rear-Wheel Drive",
  "All-Wheel Drive",
  "4-Wheel Drive",
  "Four By Two",
]
export const getDriveTrainName = (driveTrain: CarDriveTrainType) => driveTrainNames[driveTrain];