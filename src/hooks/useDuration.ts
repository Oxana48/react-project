export function useDuration() {
  const formatDuration = (minutes: number | undefined | null) => {
    if (!minutes || isNaN(minutes)) return "0м";

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return hours > 0 ? `${hours}ч ${mins}м` : `${mins}`;
  };

  return { formatDuration };
}
