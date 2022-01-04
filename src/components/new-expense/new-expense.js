import React, { useState, Component } from "react";
import "./new-expense.scss";

class Form extends Component {
  constructor(props) {
    super(props);
    const { clientHeight } = document.querySelector(".new-expense");
    this.minHeight = clientHeight;
    this.state = {
      title: "",
      date: new Date(),
      amount: "",
      height: `${clientHeight}px`,
      firstLoad: true,
      opacity: 0,
    };
    this.handleOnchange = this.handleOnchange.bind(this);
  }
  componentDidMount() {
    const { clientHeight } = document.querySelector(".new-expense form");
    this.setState({ firstLoad: false });
    setTimeout(() => {
      this.setState({ height: `${clientHeight}px`, opacity: 1 });
    }, 100);
  }

  handleOnchange(e) {
    let { id: key, value } = e.target;
    if (key === "date") value = new Date(value);
    this.setState({
      [key]: value,
    });
  }
  render() {
    const { handleToggleForm, handleAddExpense } = this.props;
    const { title, date, amount, height, firstLoad, opacity } = this.state;
    const style = {};
    if (!firstLoad) {
      style.height = height;
      style.opacity = opacity;
    }
    return (
      <form className="form" style={style}>
        <div className="form__group">
          <label className="form__label" htmlFor="title">
            Title
          </label>
          <input
            required={true}
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={this.handleOnchange}
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="amount">
            Amount
          </label>
          <input
            required={true}
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={this.handleOnchange}
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={((date) => {
              const year = date.getFullYear();
              let month = date.getMonth() + 1;
              month = month < 10 ? "0" + month : month;
              let _date = date.getDate();
              _date = _date < 10 ? "0" + _date : _date;
              return `${year}-${month}-${_date}`;
            })(date)}
            onChange={this.handleOnchange}
          />
        </div>
        <div className="form-group">
          <button
            onClick={(e) => {
              e.preventDefault();
              const { minHeight } = this;
              this.setState({ height: minHeight - 40, opacity: 0 });
              setTimeout(() => handleToggleForm(), 800);
            }}
          >
            Cancle
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (title.length === 0 || amount.length === 0) {
                alert("field must not empty");
                return;
              }
              handleAddExpense({ title, amount: Number(amount), date });
              this.setState({ title: "", amount: "", date: new Date() });
            }}
          >
            Add Expense
          </button>
        </div>
      </form>
    );
  }
}

const NewExpense = (props) => {
  const { handleAddExpense } = props;
  const [isToggleForm, setIsToggleForm] = useState(false);
  function handleToggleForm() {
    setIsToggleForm((prevState) => !prevState);
  }
  return (
    <div className="new-expense">
      {isToggleForm ? (
        <Form
          handleAddExpense={handleAddExpense}
          handleToggleForm={handleToggleForm}
        />
      ) : (
        <button className="btn" onClick={handleToggleForm}>
          Add New Expense
        </button>
      )}
    </div>
  );
};

export default NewExpense;
