export default function normalTime(time: number) {
  if (!time) return null;
  if (time < 10) return `0${time}`;
  return time;
}
