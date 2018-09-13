import React, { Component } from "react";
import Button from "@govuk-react/button";
import { css } from "react-emotion";
import InputField from "@govuk-react/input-field";
import TextArea from "@govuk-react/text-area";
import Link from "next/link";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MultipleChoice from "../components/multiple_choice";

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
      this.props.saveInputData({ [input_name]: e.target.value });
    };
    return onChange;
  };

  render() {
    const { questions } = this.props.reduxState;
    const { reduxState } = this.props;

    const jsx_array = [];
    questions.forEach((q, key) => {
      const props = {
        className: form_group,
        name: q.variable_name,
        input: {
          onChange: this.getOnChange(q.variable_name),
          value: reduxState[q.variable_name]
        },
        hint: q.hint,
        key: key
      };

      if ("multiple_choice_options" in q) {
        q.options = reduxState.multiple_choice_options.filter(x => {
          return q.multiple_choice_options.indexOf(x.id) > -1;
        });
      }

      if (q.input_type == "short_text") {
        jsx_array.push(<InputField {...props}>{q.title}</InputField>);
      } else if (q.input_type == "long_text") {
        jsx_array.push(<TextArea {...props}>{q.title}</TextArea>);
      } else if (q.input_type == "multiple_choice") {
        jsx_array.push(
          <MultipleChoice
            hint={q.hint}
            label={q.title}
            name={q.variable_name}
            options={q.options}
            className={form_group}
            key={key}
            store={this.props.store}
          />
        );
      }
    });

    return (
      <div className={page_wrapper}>
        <h1>Generate a Simple Privacy Statement</h1>

        {jsx_array}

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
  saveInputData: PropTypes.func,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
