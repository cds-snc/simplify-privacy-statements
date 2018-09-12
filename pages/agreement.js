import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import Button from "@govuk-react/button";
import JsxParser from "react-jsx-parser";
import PropTypes from "prop-types";
import { css } from "react-emotion";

const button = css`
  display: inline;
  margin: 10px;
`;

export class Agreement extends Component {
  cleanTemplate = templateIn => {
    let template = templateIn.replace(/(?:\r\n|\r|\n)/g, "<br/>\n");
    template = template.replace(/(<br\/>)*<li>/g, "<li>");
    template = template.replace(/<li>(<br\/>)*/g, "<li>");
    template = template.replace(/<\/li>(<br\/>)*/g, "</li>");
    template = template.replace(/<ul>(<br\/>)*/g, "<ul>");
    template = template.replace(/<\/ul>(<br\/>)*/g, "</ul>");
    return template;
  };

  render() {
    const { reduxState } = this.props;

    let template = this.props.template[0].template;
    template = this.cleanTemplate(template);

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
        <JsxParser bindings={reduxState} components={{}} jsx={template} />
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState,
    template: reduxState.template
  };
};

Agreement.propTypes = {
  reduxState: PropTypes.object,
  template: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Agreement);
