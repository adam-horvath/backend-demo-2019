import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import "./styles.scss";
import { getBlogEntries } from "../../actions/blog";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

class Entries extends Component {
  state = {
    open: false,
    title: "",
    text: ""
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  onEntryClick = (title, text) => {
    this.setState({
      title,
      text,
      open: true
    });
  };

  componentDidMount() {
    this.props.getBlogEntries();
  }

  render() {
    const { entries } = this.props;
    return entries.length ? (
      <div className="blog-entries-container">
        {entries.map(entry => (
          <div
            key={entries.indexOf(entry)}
            className="entry"
            onClick={() => this.onEntryClick(entry.title, entry.text)}
          >
            {entry.title}
          </div>
        ))}
        <Dialog open={!!this.state.open} onClose={this.closeModal} maxWidth={"md"}>
          <DialogTitle>{this.state.title}</DialogTitle>
          <DialogContentText style={{ padding: "16px 24px" }}>
            {this.state.text}
          </DialogContentText>
          <DialogActions style={{ padding: "16px 24px" }}>
            <Button onClick={this.closeModal}>Bezár</Button>
          </DialogActions>
        </Dialog>
      </div>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    entries: state.blog.entries
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getBlogEntries }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Entries);
