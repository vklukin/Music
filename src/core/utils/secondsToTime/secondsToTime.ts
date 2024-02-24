export function secondsToTime(seconds?: number): string {
    if (seconds === undefined) return "";

    const minutes = Math.floor(seconds / 60);
    const remainSec = (seconds % 60).toString().padStart(2, "0");

    return `${minutes}:${remainSec}`;
}
