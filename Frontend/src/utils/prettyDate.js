import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

export const prettyDatecolors = {
    overdue: "#d1453b",
    today: "#4B9244",
    tomorrow: "#E69641",
    thisWeek: "#8647D9",
    nextWeek: "#0071ff",
    default: "var(--Disabled)",
};

export const prettyTodayString = dayjs().format("dddd , DD MMM");

export function getPrettyDate(date) {
    if (!date) return ["No Date", prettyDatecolors.default];

    date = dayjs(date);
    const today = dayjs();
    const tomorrow = today.add(1, "day");
    const thisYear = today.year();

    const dayOfWeek = today.day(); // Sunday=0, Monday=1
    const daysUntilSunday = (7 - dayOfWeek) % 7;
    const thisSunday = today.add(daysUntilSunday, "day");
    const nextSunday = thisSunday.add(7, "day");

    let dateString = "";
    let color = prettyDatecolors.default;

    if (date.isBefore(today, "day")) {
        dateString = date.year() < thisYear ? date.format("DD MMM, YYYY") : date.format("DD MMM");
        color = prettyDatecolors.overdue;
    } else if (date.isSame(today, "day")) {
        dateString = "Today";
        color = prettyDatecolors.today;
    } else if (date.isSame(tomorrow, "day")) {
        dateString = "Tomorrow";
        color = prettyDatecolors.tomorrow;
    } else if (date.isSameOrBefore(thisSunday, "day") && date.isAfter(today, "day")) {
        dateString = date.format("ddd");
        color = prettyDatecolors.thisWeek;
    } else if (date.isSameOrBefore(nextSunday, "day") && date.isAfter(thisSunday, "day")) {
        dateString = date.format("ddd, DD MMM");
        color = prettyDatecolors.nextWeek;
    } else {
        dateString = date.year() > thisYear ? date.format("DD MMM, YYYY") : date.format("DD MMM");
        color = prettyDatecolors.default;
    }

    return [dateString, color];
}
