import "./TodoDatePicker.css";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Icon from "../../../utils/Icons";

export default function TodoDatePicker({dueDate ,  setDateValue }) {
    const [value, setValue] = useState(dueDate ? dayjs(dueDate) : null);

    const goToToday = () => setValue(dayjs());
    const goToTomorrow = () => setValue(dayjs().add(1, "day"));

    const goToComingMonday = () => {
        const today = dayjs();
        const dayOfWeek = today.day();
        const daysUntilNextMonday = 6 - dayOfWeek + 2;
        setValue(today.add(daysUntilNextMonday, "day"));
    };

    const goToThisWeekend = () => {
        const today = dayjs();
        const dayOfWeek = today.day();
        const daysUntilSaturday = 6 - dayOfWeek;
        setValue(today.add(daysUntilSaturday, "day"));
    };

    const clearDates = () => setValue(null);

    useEffect(() => {
        setDateValue(value ? new Date(value) : null); 
    }, [value]);

    return (
        <div className="TodoDatePickerContainer" onClick={(e) => e.stopPropagation()}>
            <div className="TodoDatePickerTopButtons">
                <button
                    className="TodoDatePickerTodayButton"
                    onClick={goToToday}
                    title="Today"
                    type="button"
                >
                    <Icon name={"IconCalendarToday"} size="M" />
                </button>
                <button
                    className="TodoDatePickerTomorrowButton"
                    onClick={goToTomorrow}
                    title="Tomorrow"
                    type="button"
                >
                    <Icon name={"IconSunRise"} size="M" />
                </button>
                <button
                    className="TodoDatePickerWeekendButton"
                    onClick={goToThisWeekend}
                    title="This Weekend"
                    type="button"
                >
                    <Icon name={"IconCalendarWeekend2"} size="M" />
                </button>
                <button
                    className="TodoDatePickerComingMondayButton"
                    onClick={goToComingMonday}
                    title="Coming Monday"
                    type="button"
                >
                    <Icon name={"IconCalendarNextWeek1"} size="M" />
                </button>
                <button
                    className="TodoDatePickerNoDateButton"
                    onClick={clearDates}
                    title="No Date"
                    type="button"
                >
                    <Icon name={"IconNot"} size="L" />
                </button>
            </div>
            <div className="TodoDatePickerCalendar">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        value={value}
                        onChange={setValue}
                        views={["year", "month", "day"]}
                        sx={{
                            "& .MuiDateCalendar-root": {
                                width: "28rem !important",
                            },
                            "& .MuiPickersCalendarHeader-label": {
                                font: "var(--Heading-3) !important",
                            },
                            "& .MuiButtonBase-root *": {
                                height: "2.4rem !important",
                                width: "2.4rem !important",
                            },
                            "& .MuiDayCalendar-weekDayLabel": {
                                fontWeight: "bold",
                                color: "var(--Primary-Color)",
                                backgroundColor: "var(--Accent-BG)",
                                borderRadius: 8,
                                font: "var(--Text-2)",
                                width: "3.4rem",
                                height: "3.4rem",
                            },
                            "& .MuiDayCalendar-monthContainer": {
                                height: "100%",
                            },
                            "& .MuiPickersDay-root": {
                                color: "var(--Primary-Color)",
                                borderRadius: 8,
                                font: "var(--Text-2)",
                                width: "3.4rem",
                                height: "3.rem",
                            },
                            "& .MuiPickersDay-today": {
                                border: "1px solid var(--Disabled)",
                            },
                            "& .MuiPickersDay-root:hover": {
                                backgroundColor: "var(--Accent-BG)",
                                color: "var(--Primary-Color)",
                            },
                            "& .Mui-selected": {
                                backgroundColor: "var(--Accent-Color) !important",
                                color: "#fff",
                                border: "none",
                            },
                            "& .Mui-selected:hover": {
                                backgroundColor: "var(--Accent-Color) !important",
                                color: "#fff",
                                border: "none",
                            },
                        }}
                        slotProps={{
                            popper: {
                                disablePortal: false, // ensures it renders in body
                                style: { zIndex: 9999 },
                            },
                        }}
                    />
                </LocalizationProvider>
            </div>
        </div>
    );
}
