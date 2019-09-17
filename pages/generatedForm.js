import React from "react";
import { css } from "react-emotion";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Layout from "../components/layout";
import Agreement from "../components/agreement";
import Header from "../components/header";
import Button from "../components/button";
import Dropdown from "../components/dropdown";
import Link from "next/link";

const dropdownStyle = css`
  display: inline;
  margin-bottom: 10px;
`;

const linkStyle = css`
  padding: 5px;
  margin-right: 50px;
`;

export const GeneratedForm = props => {
  return (
    <React.Fragment>
      <Header store={props.store} />
      <Layout>
        <Link href="/">
          <Button className={linkStyle}>Back</Button>
        </Link>
        <Dropdown
          label="Template"
          options={props.reduxState.templateList}
          selected={props.reduxState.templateSelected}
          saveSelected={props.saveTemplateSelected}
          className={dropdownStyle}
        />
        <Agreement store={props.store} />
        <Link href="/guidance">
          <Button>Download Word Doc</Button>
        </Link>
      </Layout>
    </React.Fragment>
  );
};

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveTemplateSelected: x => {
      dispatch({
        type: "SAVE_TEMPLATE_SELECTED",
        data: { templateSelected: x }
      });
    }
  };
};

GeneratedForm.propTypes = {
  reduxState: PropTypes.object,
  saveTemplateSelected: PropTypes.func,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneratedForm);
