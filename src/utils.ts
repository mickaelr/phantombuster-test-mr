export type DecomposedTime = {
    days: number;
    hours: number;
    minutes: number;
}

export const convertRemainingTime = (minutesRemaining: number): DecomposedTime => {
    if(!minutesRemaining) {
        //TODO: check if it's better in our case to throw an Error instead of default value?
        return { days: 0, hours: 0, minutes: 0 };
    }

    const days: number = Math.floor(minutesRemaining / 1440);
    const hours: number = Math.floor((minutesRemaining - (days * 1440)) / 60);
    const minutes: number = minutesRemaining - (days * 1440) - (hours * 60);
    return { days, hours, minutes };
}