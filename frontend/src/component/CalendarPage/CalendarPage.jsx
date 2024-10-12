import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

function CalendarPage(props) {
  const localizer = momentLocalizer(moment);
  return (
    <div className="">
      <Calendar
        style={{ height: 500 }}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}

export default CalendarPage;
