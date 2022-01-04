import React, { useState } from "react";
import ListExpense from "./components/list-expense/list-expense";
import NewExpense from "./components/new-expense/new-expense";
const years = [2019, 2020, 2021, 2022];
years.reverse();
const _expenses = [
  {
    amount: 11.11,
    title: "buy cookie",
    date: new Date(2022, 11, 10),
  },
  {
    amount: 20,
    title: "buy hamburger",
    date: new Date(2022, 10, 10),
  },
  {
    amount: 50.25,
    title: "wash car",
    date: new Date(2022, 9, 10),
  },
  {
    amount: 100,
    title: "buy second hand pc",
    date: new Date(2022, 8, 10),
  },
];
const App = () => {
  const [filterYear, setYearFilter] = useState(years.at(0));
  const [expenses, setExpenses] = useState(_expenses);
  function handleAddExpense(expense) {
    setYearFilter(expense.date.getFullYear());
    setExpenses((prevState) => [...prevState, expense]);
  }
  return (
    <div className="app">
      <NewExpense handleAddExpense={handleAddExpense} />
      <ListExpense
        expenses={expenses.filter(
          (item) => item.date.getFullYear() === filterYear
        )}
        filterYear={filterYear}
        years={years}
        hanleFilterYear={setYearFilter}
      />
    </div>
  );
};

export default App;
