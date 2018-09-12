import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import Button from "@govuk-react/button";
import JsxParser from "react-jsx-parser";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import MarkdownIt from "markdown-it";

const button = css`
  display: inline;
  margin: 10px;
`;

export class Agreement extends Component {
  render() {
    const { reduxState } = this.props;

    let md = new MarkdownIt({ breaks: true });

    const jsx_array = reduxState.template_1.map((row, key) => {
      if (row.logic_type === "none") {
        return (
          <JsxParser
            bindings={reduxState}
            components={{}}
            jsx={md.render(row.display_text).replace(/<br>/g, "<br/>")}
            key={key}
          />
        );
      }
    });

    return (
      <div>
        <div>
          <Link href="/">
            <Button className={button}>Home</Button>
          </Link>
          <Link href="/validation">
            <Button className={button}>Validation</Button>
          </Link>
        </div>
        <h1>Agreement</h1>
        {jsx_array}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState
  };
};

Agreement.propTypes = {
  reduxState: PropTypes.object
};

export default connect(mapStateToProps)(Agreement);
