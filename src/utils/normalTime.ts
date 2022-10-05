export default function normalTime(time: number) {
  if (!time && time !== 0) return null;
  if (time < 10) return `0${time}`;
  return time;
}
