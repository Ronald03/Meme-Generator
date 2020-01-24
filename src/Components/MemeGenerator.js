import React, { Component } from "react";

export default class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  formSubmit(event) {
    event.preventDefault();
    const randomNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    this.setState({ randomImg: this.state.allMemeImgs[randomNum].url });
  }

  render() {
    return (
      <div>
        <form className="name-form" onSubmit={this.formSubmit}>
          <input
            type="text"
            id="topTextInput"
            className="text-input"
            value={this.state.topText}
            name="topText"
            onChange={this.handleChange}
            placeholder="Top text"
          />
          <input
            type="text"
            id="bottomTextInput"
            className="text-input"
            value={this.state.bottomText}
            name="bottomText"
            onChange={this.handleChange}
            placeholder="Bottom text"
          />
          <button className="submit-btn">Gen</button>
        </form>

        <div id="img-holder">
          <img id="meme-img" src={this.state.randomImg} alt="" />
          <h2 className="meme-text-top"> {this.state.topText}</h2>
          <h2 className="meme-text-bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}
