import React, { useState, Component, useRef, createRef } from "react";
import styled from "styled-components";
import "./new-expense.scss";
// const FormStyle = React.forwardRef((props, ref) => {

// });
const FormFragment = React.forwardRef((props, ref) => (
  <FormStyle ref={ref} {...props} />
));
const FormStyle = styled.form`
  height: ${(props) => props.height};
  opacity: ${(props) => props.opacity};
`;
// return <FormStyle {...props} />;
class Form extends Component {
  constructor(props) {
    super(props);
    const { clientHeight } = props.parentRef.current;
    this.minHeight = clientHeight;
    this.state = {
      title: "",
      date: new Date(),
      amount: "",
      height: clientHeight,
      firstLoad: true,
      opacity: 0,
    };
    this.handleOnchange = this.handleOnchange.bind(this);
    this.ref = createRef();
  }
  componentDidMount() {
    const { clientHeight } = this.ref.current;
    setTimeout(() => {
      this.setState({ height: clientHeight, opacity: 1 });
    }, 0);
    this.setState({ firstLoad: false });
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
    const { title, date, amount, firstLoad } = this.state;
    let { height, opacity } = this.state;
    if (firstLoad) {
      height = "auto";
      opacity = 0;
    } else height = height + "px";
    return (
      <FormFragment
        height={height}
        opacity={opacity}
        className="form"
        ref={this.ref}
      >
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
      </FormFragment>
    );
  }
}

const NewExpense = (props) => {
  const { handleAddExpense } = props;
  const [isToggleForm, setIsToggleForm] = useState(false);
  const ref = useRef();
  function handleToggleForm() {
    setIsToggleForm((prevState) => !prevState);
  }
  return (
    <div className="new-expense" ref={ref}>
      {isToggleForm ? (
        <Form
          handleAddExpense={handleAddExpense}
          handleToggleForm={handleToggleForm}
          parentRef={ref}
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
