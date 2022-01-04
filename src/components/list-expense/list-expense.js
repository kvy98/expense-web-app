import propTypes from "prop-types";
import React from "react";
import Chart from "../chart/chart";
import "./list-expense.scss";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const ExpenseItem = (props) => {
  const { title, amount, date } = props;
  return (
    <div className="list-expense__item">
      <span className="list-expense__item__date-group">
        <span className="list-expense__item__month">
          {date.toDateString().split(" ").at(1)}
        </span>
        <span className="list-expense__item__year">{date.getFullYear()}</span>
        <span className="list-expense__item__date">{date.getDate()}</span>
      </span>
      <span className="list-expense__item__title">
        {title.replace(title.at(0), title.at(0).toUpperCase())}
      </span>
      <span className="list-expense__item__amount">
        ${Number.isInteger(amount) ? amount : amount.toFixed(2)}
      </span>
    </div>
  );
};

const ListExpense = (props) => {
  const { expenses, years, filterYear, hanleFilterYear } = props;
  let data = {};
  let sum = 0;
  months.forEach((item) => {
    data[item] = 0;
  });
  expenses.forEach((item) => {
    const { date, amount } = item;
    const month = months[date.getMonth()];
    data[month] += amount;
    sum += amount;
  });
  data = Object.entries(data).map(([key, value]) => ({
    value,
    title: key,
  }));
  return (
    <div className="list-expense">
      <div className="list-expense__control">
        <h2 className="list-expense__header">Filter by year</h2>
        <select
          className="list-expense__filter"
          onChange={(e) => {
            const { value: year } = e.target;
            hanleFilterYear(Number(year));
          }}
          value={filterYear}
        >
          {years.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </div>
      <Chart data={data} maxValue={sum} />
      <div className="list-expense__data">
        {expenses.map((item) => {
          const { title, amount, date } = item;
          return (
            <ExpenseItem
              title={title}
              amount={amount}
              date={date}
              key={date.toISOString()}
            />
          );
        })}
      </div>
    </div>
  );
};
ListExpense.prototype = {
  expenses: propTypes.number,
  years: propTypes.arrayOf(Number),
  filterYear: propTypes.number,
  hanleFilterYear: propTypes.func,
};
export default ListExpense;
