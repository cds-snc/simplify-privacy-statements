import React, { Component } from "react";
import { css } from "react-emotion";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Link from "next/link";
import { globalTheme } from "../theme";
import Button from "../components/button";

// Top taken from https://benfrain.com/independent-scrolling-panels-body-scroll-using-just-css/

const Top = css`
  box-sizing: border-box;
  align-items: center;
  justify-content: left;
  position: relative;
  z-index: 10;
  padding-top: 24px;
  background-color: #000;
  height: 80px;
`;
const H1 = css`
  display: inline-block;
  font-size: 2em;
  color: ${globalTheme.colour.cdsYellow};
  margin: 0px;
  font-weight: normal;
`;
const button = css`
  display: inline-block;
  margin-right: 10px;
`;
const buttonBar = css`
  float: right;
`;
const Container = css`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1600px;
  padding-left: 2rem;
  padding-right: 2rem;
`;

export class Header extends Component {
  handleOnClick = () => {
    if (this.props.reduxState.editingMode === "researcher") {
      this.props.saveEditingMode("policy");
    } else {
      this.props.saveEditingMode("researcher");
    }
  };

  render() {
    const editingTemplates = this.props.reduxState.editingMode === "policy";

    return (
      <div className={Top}>
        <div className={Container}>
          <h1 className={H1}>
            <b>Proof of Concept</b> - {this.props.text}
          </h1>
          <span className={buttonBar}>
            {editingTemplates ? (
              <Link href="/refresh">
                <Button className={button}>Refresh Airtable</Button>
              </Link>
            ) : null}
            <Button className={button} onClick={this.handleOnClick}>
              {editingTemplates ? "Researcher Mode" : "Policy Mode"}
            </Button>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveEditingMode: x => {
      dispatch({ type: "SAVE_EDITING_MODE", data: { editingMode: x } });
    }
  };
};

Header.defaultProps = {
  text: "Privacy and Consent Form Generator"
};

Header.propTypes = {
  text: PropTypes.string,
  reduxState: PropTypes.object,
  saveEditingMode: PropTypes.func,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
