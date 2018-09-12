import React, { Component } from "react";
import Button from "@govuk-react/button";
import { css } from "react-emotion";
import InputField from "@govuk-react/input-field";
import TextArea from "@govuk-react/text-area";
import Link from "next/link";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const page_wrapper = css`
  margin: 0 auto;
  max-width: 800px;
  font-family: "nta", Arial, sans-serif;
`;

const form_group = css`
  margin-bottom: 30px !important;
`;

export class Index extends Component {
  getOnChange = input_name => {
    const onChange = e => {
      const obj = {};
      obj[input_name] = e.target.value;
      this.props.saveInputData(obj);
    };
    return onChange;
  };

  render() {
    const { reduxState } = this.props;
    return (
      <div className={page_wrapper}>
        <h1>Generate a Simple Privacy Statement</h1>

        <InputField
          className={form_group}
          name="researcher_name"
          input={{
            onChange: this.getOnChange("researcher_name"),
            value: reduxState.researcher_name
          }}
        >
          Researcher Name
        </InputField>

        <InputField
          className={form_group}
          name="researcher_phone"
          input={{
            onChange: this.getOnChange("researcher_phone"),
            value: reduxState.researcher_phone
          }}
        >
          Researcher Phone
        </InputField>

        <InputField
          className={form_group}
          name="researcher_email"
          input={{
            onChange: this.getOnChange("researcher_email"),
            value: reduxState.researcher_email
          }}
        >
          Researcher Email
        </InputField>

        <TextArea
          className={form_group}
          name="session_goal"
          hint={
            "e.g. We are conducting research to help us evaluate the ease of use and content of a website."
          }
          input={{
            onChange: this.getOnChange("session_goal"),
            value: reduxState.session_goal
          }}
        >
          What is the goal of the session?
        </TextArea>

        <TextArea
          className={form_group}
          name="product_goal"
          hint={
            "e.g. This will help us create an online tool that will make it easier for Veterans to determine which VAC services are relevant to them."
          }
          input={{
            onChange: this.getOnChange("product_goal"),
            value: reduxState.product_goal
          }}
        >
          What is the goal of the product?
        </TextArea>

        <TextArea
          className={form_group}
          name="session_activity"
          hint={
            "e.g. To do this, we will ask you to complete specific tasks with this prototype and ask you to describe your thoughts and impressions."
          }
          input={{
            onChange: this.getOnChange("session_activity"),
            value: reduxState.session_activity
          }}
        >
          What activity will take place during the session?
        </TextArea>

        <TextArea
          className={form_group}
          name="session_duration"
          hint={"e.g. This will take us approximately 1 hour."}
          input={{
            onChange: this.getOnChange("session_duration"),
            value: reduxState.session_duration
          }}
        >
          How long will the session take?
        </TextArea>

        <Link href="/agreement">
          <Button>Submit</Button>
        </Link>
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
    saveInputData: x => {
      dispatch({ type: "SAVE_INPUT_DATA", data: x });
    }
  };
};

Index.propTypes = {
  reduxState: PropTypes.object,
  saveInputData: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
