import React from "react";
import { css } from "react-emotion";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Layout from "../components/layout";
import Questionaire from "../components/questionaire";
import Header from "../components/header";
import Button from "../components/button";
import Dropdown from "../components/dropdown";
import Link from "next/link";

const dropdownStyle = css`
  margin-bottom: 10px;
`;

export const Index = props => {
  return (
    <React.Fragment>
      <Header store={props.store} />
      <Layout>
        <Dropdown
          label="Which form do you need?"
          options={props.reduxState.questionsList}
          selected={props.reduxState.questionSelected}
          saveSelected={props.saveQuestionsSelected}
          className={dropdownStyle}
        />
        <Questionaire store={props.store} />

        <Link href="generatedForm">
          <Button>Generate form</Button>
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
    },
    saveQuestionsSelected: x => {
      dispatch({
        type: "SAVE_QUESTIONS_SELECTED",
        data: { questionsSelected: x }
      });
    }
  };
};

Index.propTypes = {
  reduxState: PropTypes.object,
  saveTemplateSelected: PropTypes.func,
  saveQuestionsSelected: PropTypes.func,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
