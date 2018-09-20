import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import MarkdownIt from "markdown-it";
import JsxParser from "react-jsx-parser";
import ReactDOMServer from "react-dom/server";

const root = css`
  margin: 10px;
  border-style: solid;
  border-color: red;
  border-radius: 5px;
  padding-left: 20px;
  padding-right: 20px;
`;

export class BadTemplateRows extends Component {
  isRowBad = row => {
    let md = new MarkdownIt({ breaks: true });
    let jsxString = md.render(row.display_text).replace(/<br>/g, "<br/>");
    const jsx = <JsxParser bindings={{}} components={{}} jsx={jsxString} />;
    const html = ReactDOMServer.renderToStaticMarkup(jsx);
    if (html.replace(/<div class="jsx-parser"><\/div>/, "") === "") {
      // seems to cause the template to not display?
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { reduxState } = this.props;

    const template = reduxState[reduxState.templateSelected];
    template.forEach((row, index) => {
      row.rowIndex = index;
    });

    const badTemplateRows = template.filter(row => {
      return this.isRowBad(row, reduxState);
    });

    if (badTemplateRows.length > 0) {
      return (
        <div className={root}>
          <h2>Bad display_text in Template</h2>
          <ul>
            {badTemplateRows.map(v => {
              return (
                <li key={v.rowIndex + 1}>template row {v.rowIndex + 1}</li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState
  };
};

BadTemplateRows.propTypes = {
  reduxState: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(BadTemplateRows);
