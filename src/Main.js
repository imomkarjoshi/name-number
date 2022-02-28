import React, { Component } from "react";

class Main extends Component {
  constructor(props) {
    super();
    this.state = { name: "", sumDigits: null, oneDigitSum: null };
  }

  sumDigits = (n) => {
    if (n < 10) return n;
    return this.sumDigits((n % 10) + this.sumDigits(Math.floor(n / 10)));
  };

  onSubmit = () => {
    if (this.state.name !== "") {
      let { name } = this.state;
      let sumDigits = 0;
      for (let i = 0; i < name.length; i++) {
        sumDigits +=
          name.toLocaleLowerCase().charCodeAt(i) - "a".charCodeAt(0) + 1;
      }

      let oneDigitSum = this.sumDigits(sumDigits);
      this.setState({ sumDigits, oneDigitSum });
    }
  };
  render() {
    return (
      <>
        <div className="main-component">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              this.onSubmit();
            }}
          >
            <label htmlFor="name" className="mr-2">
              Please Enter your Name: &nbsp;
            </label>
            <input
              id="name"
              type="text"
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
            <button type="submit">Save</button>
          </form>
          {this.state.sumDigits && (
            <>
              Sum Letters: {this.state.sumDigits} <br />
            </>
          )}
          {this.state.oneDigitSum && (
            <>One Digit Sum Letters: {this.state.oneDigitSum}</>
          )}
          {this.state.oneDigitSum && (
            <>
              <br />
              <button
                onClick={() => {
                  document.getElementById("name").value = "";
                  this.setState({
                    name: "",
                    sumDigits: null,
                    oneDigitSum: null,
                  });
                }}
              >
                Reset
              </button>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Main;
