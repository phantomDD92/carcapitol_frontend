export interface CarInfo {
  id: string;
  model: string;
  type: string;
  year: number;
  price: number;
  priceChange: number;
  image: string;
}

export enum CarDriveTrainType {
  UNKNOWN = 0,
  FRONT_WHEEL_DRIVE = 1,  // Front-Wheel Drive
  REAR_WHEEL_DRIVE = 2,  // Rear-Wheel Drive
  ALL_WHEEL_DRIVE = 3,  // All-Wheel Drive
  FOUR_WHEEL_DRIVE = 4,// 4-Wheel Drive 
  FOUR_BY_TWO = 5 // Four By Two
}

export enum CarColorType {
  UNKNOWN = 0,
  BLACK = 1,
  BLUE = 2,
  BROWN = 3,
  GOLD = 4,
  GRAY = 5,
  GREEN = 6,
  ORANGE = 7,
  PINK = 8,
  PURPLE = 9,
  RED = 10,
  SILVER = 11,
  TEAL = 12,
  WHITE = 13,
  YELLOW = 14,
}

export enum CarEngineType {
  UNKNOWN = 0,
  H4 = 1,
  H6 = 2,
  I2 = 3,
  I3 = 4,
  I4 = 5,
  I5 = 6,
  I6 = 7,
  V6 = 8,
  V8 = 9,
  V10 = 10,
  V12 = 11,
  W12 = 12,
  ELECTRIC = 13,
}

export enum CarFuelType {
  UNKNOWN = 0,
  BIODIESEL = 1,
  DIESEL = 2,
  ELECTRIC = 3,
  GASOLINE = 4,
  HYBRID = 5,
  FLEX = 6,
}

export enum CarTransmissionType {
  UNKNOWN = 0,
  AUTOMATIC = 1,
  MANUAL = 2,
  DUAL = 3,
  CVT = 4,
}

export enum CarConditionType {
  UNKNOWN = 0,
  USED = 1,
  NEW = 2,
  CPO = 3,
}

export interface ICarMake {
  id: number,
  name: string,
}

export interface ICarModel {
  id: number,
  name: string,
  make?: ICarMake
}

export type ICar = {
  id: number;
  title: string,
  name: string,
  price: number,
  mileage: number,
  vin: string,
  condition: CarConditionType,
  transmission: string,
  color: CarColorType,
  exteriorColor: string,
  interiorColor: string,
  driveTrain: CarDriveTrainType,
  engineType: CarEngineType,
  engineName: string,
  fuelType: CarFuelType,
  year: number,
  preview: string,
}

export type ICarDetail = {
  id: number;
  status: string;
  title: string;
  name: string;
  price: number;
  mileage: number;
  vin: string;
  description: string;
  condition: number;
  features: string[];
  transmission: string;
  transmissionType: number;
  color: number,
  exteriorColor: string;
  interiorColor: string;
  driveTrain: number;
  engineType: number,
  engineName: string;
  fuelType: number;
  photos?: string[];
  postalCode: string;
  year: number;
  numberOfDoors: number;
  fuelEconomy?: string;
  cargoVolume: string;
  fuelTankCapacity: number;
  preview: string;
  distance: number;
  details?: any[];
  make: ICarMake; // Only name is required
  model: ICarModel; // Only name is required
}