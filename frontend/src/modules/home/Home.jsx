import React, { Component } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import "./styles.scss";
import { addBlogEntry } from "../../actions/blog";

class Home extends Component {
  state = {
    title: "",
    text: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  postEntry = async () => {
    const { title, text } = this.state;
    try {
      await this.props.addBlogEntry({ title, text });
      this.setState({ title: "", text: "" });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { title, text } = this.state;
    return (
      <div className="blog-container">
        <div className="add-entry-container">
          <div className="title-container">
            <TextField
              name="title"
              label="Title"
              autoComplete="off"
              value={title}
              onChange={this.handleChange}
              fullWidth
            />
          </div>
          <div className="text-container">
            <label htmlFor="text">The blog entry's text</label>
            <br />
            <TextareaAutosize
              id="text"
              name="text"
              rows={3}
              placeholder="Blog text goes here..."
              value={text}
              style={{ width: "100%", minHeight: 120 }}
              onChange={this.handleChange}
            />
          </div>
          <div className="button-container">
            <Button
              variant="contained"
              color="primary"
              onClick={this.postEntry}
              fullWidth
            >
              Add blog entry
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addBlogEntry }, dispatch);
};

export default connect(null, mapDispatchToProps)(Home);
