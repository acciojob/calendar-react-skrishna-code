import React, { useState } from "react";

function App() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [editingYear, setEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState(new Date().getFullYear());

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

  // Get number of days in selected month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get weekday of the first day
  const firstDay = new Date(year, month, 1).getDay();

  // Create calendar days
  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push("");
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Previous month
  const handlePreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prevYear) => prevYear - 1);
    } else {
      setMonth((prevMonth) => prevMonth - 1);
    }
  };

  // Next month
  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prevYear) => prevYear + 1);
    } else {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };

  // Previous year
  const handlePreviousYear = () => {
    setYear((prevYear) => prevYear - 1);
  };

  // Next year
  const handleNextYear = () => {
    setYear((prevYear) => prevYear + 1);
  };

  // Start editing year
  const handleYearDoubleClick = () => {
    setYearInput(year);
    setEditingYear(true);
  };

  // Save year
  const handleYearChange = (e) => {
    setYearInput(e.target.value);
  };

  const saveYear = () => {
    const newYear = parseInt(yearInput, 10);

    if (!isNaN(newYear)) {
      setYear(newYear);
    }

    setEditingYear(false);
  };

  return (
    <div>
      <h1>Calendar</h1>

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

      {editingYear ? (
        <input
          id="year-input"
          type="number"
          value={yearInput}
          onChange={handleYearChange}
          onBlur={saveYear}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveYear();
            }
          }}
          autoFocus
        />
      ) : (
        <span id="year" onDoubleClick={handleYearDoubleClick}>
          {year}
        </span>
      )}

      <div>
        <button id="prev-year" onClick={handlePreviousYear}>
          Previous Year
        </button>

        <button id="prev-month" onClick={handlePreviousMonth}>
          Previous Month
        </button>

        <button id="next-month" onClick={handleNextMonth}>
          Next Month
        </button>

        <button id="next-year" onClick={handleNextYear}>
          Next Year
        </button>
      </div>

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
            { length: Math.ceil(calendarDays.length / 7) },
            (_, weekIndex) => {
              const week = calendarDays.slice(
                weekIndex * 7,
                weekIndex * 7 + 7
              );

              while (week.length < 7) {
                week.push("");
              }

              return (
                <tr key={weekIndex}>
                  {week.map((day, index) => (
                    <td key={index}>{day}</td>
                  ))}
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
