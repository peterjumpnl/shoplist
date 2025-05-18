// lib/time.ts
// Utility: getNextTriggerTime(day, hour, minute)
export function getNextTriggerTime(day: number, hour: number, minute: number) {
  const now = new Date();
  const target = new Date(now);
  target.setHours(hour, minute, 0, 0);
  target.setDate(now.getDate() + ((7 + day - now.getDay()) % 7));
  if (target <= now) target.setDate(target.getDate() + 7); // always in the future
  return target;
}
