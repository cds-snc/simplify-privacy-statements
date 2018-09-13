import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import Button from "@govuk-react/button";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import Layout from "../components/layout";

const button = css`
  display: inline;
  margin: 10px;
`;

export class Validation extends Component {
  missingVariables = (template, reduxState) => {
    const regex = /{\S*}/g;
    const matches = template.match(regex);
    const templateVariables = matches
      ? matches.map(s => s.replace(/}|{/g, ""))
      : [];
    return templateVariables
      .filter(v => reduxState[v] === undefined)
      .filter((v, index, self) => self.indexOf(v) === index);
  };

  render() {
    const { reduxState } = this.props;

    let template = this.props.template[0].template;

    const missingTemplateVariables = this.missingVariables(
      template,
      reduxState
    );

    return (
      <Layout>
        <div>
          <Link href="/">
            <Button className={button}>Home</Button>
          </Link>
          <Link href="/agreement">
            <Button className={button}>Agreement</Button>
          </Link>
        </div>
        <h1>Variables in template but missing from redux</h1>
        <ul>
          {missingTemplateVariables.map(v => {
            return <li key={v}>{v}</li>;
          })}
        </ul>
      </Layout>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState,
    template: reduxState.template
  };
};

Validation.propTypes = {
  reduxState: PropTypes.object,
  template: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Validation);
