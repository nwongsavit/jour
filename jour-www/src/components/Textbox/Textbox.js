
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App.js";

class QuestionPrompt extends React.Component{
    constructor(props){
        super(props);
          this.state = {
              value: 'How did your day go?'
              };

                this.handleChange = this.handleChange.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
      this.setState({value: event.target.value});
    }

    handleSubmit(event){
      alert('Thank you. See you tomorrow!' + this.state.value);
      event.preventDefault();
      event.preventDefault();
    }

    render(){
      return(
        <form onSubmit={this.handleSubmit}>
        <label>
        Question:
        <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        </form>

        );
      }



}


//}

class MyStatus extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: 'Happy'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  handleSubmit(event){
    alert('You are feeling ' + this.state.value + ' today');
    event.preventDefault();
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
        I am feeling:
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
          <option value="anxious">Anxious</option>
          <option value="confident">Confident</option>
          <option value="nostalgic">Nostalgic</option>
        </select>
        </label>
      <input type="submit" value="Submit" />
    </form>

    );


  }


}



ReactDOM.render(
<MyStatus />,

<QuestionPrompt />,
document.getElementById('root')


)
export { QuestionPrompt, MyStatus };
