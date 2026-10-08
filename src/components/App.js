import React, { useState } from "react";

function App() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [editingYear, setEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState(year);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Number of days in selected month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // First day of selected month
  const firstDay = new Date(year, month, 1).getDay();

  const days = [];

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add actual days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Move to previous month
  const previousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  // Move to next month
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  // Previous year
  const previousYear = () => {
    setYear(year - 1);
  };

  // Next year
  const nextYear = () => {
    setYear(year + 1);
  };

  // Double-click year
  const startYearEditing = () => {
    setYearInput(year);
    setEditingYear(true);
  };

  // Save edited year
  const saveYear = () => {
    const newYear = Number(yearInput);

    if (newYear > 0) {
      setYear(newYear);
    }

    setEditingYear(false);
  };

  return (
    <div>
      <h1>Calendar</h1>

      {/* Month Dropdown */}
      <select
        id="month"
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
      >
        {months.map((monthName, index) => (
          <option key={index} value={index}>
            {monthName}
          </option>
        ))}
      </select>

      {/* Year */}
      {editingYear ? (
        <input
          id="year-input"
          type="number"
          value={yearInput}
          onChange={(e) => setYearInput(e.target.value)}
          onBlur={saveYear}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveYear();
            }
          }}
          autoFocus
        />
      ) : (
        <span id="year" onDoubleClick={startYearEditing}>
          {year}
        </span>
      )}

      {/* Navigation Buttons */}
      <div>
        <button id="prev-year" onClick={previousYear}>
          Previous Year
        </button>

        <button id="prev-month" onClick={previousMonth}>
          Previous Month
        </button>

        <button id="next-month" onClick={nextMonth}>
          Next Month
        </button>

        <button id="next-year" onClick={nextYear}>
          Next Year
        </button>
      </div>

      {/* Calendar */}
      <table id="calendar">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>

        <tbody>
          {Array.from(
            { length: Math.ceil(days.length / 7) },
            (_, weekIndex) => (
              <tr key={weekIndex}>
                {days
                  .slice(weekIndex * 7, weekIndex * 7 + 7)
                  .map((day, index) => (
                    <td key={index}>{day}</td>
                  ))}
              </tr>
            )
              )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
