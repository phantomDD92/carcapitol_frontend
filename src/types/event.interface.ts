export interface Event {
  id: string;
  title: string;
  date: {
    day: number;
    weekday: string;
    range: string;
  };
  time: string;
}
