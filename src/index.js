import React from "react";
import ReactDOM from "react-dom/client";
import DateRangePicker from "./DateRangePicker";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DateRangePicker
      title="Date Range Picker (with prefined range)"
      predefinedRange={{
        startDate: "2024-01-03",
        endDate: "2024-01-31",
      }}
    />
    <br />
    <DateRangePicker />
  </React.StrictMode>
);
