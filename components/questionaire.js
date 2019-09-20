import React, { Component } from "react";
import { css } from "react-emotion";
import InputField from "@govuk-react/input-field";
import TextArea from "@govuk-react/text-area";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MultipleChoice from "../components/multiple_choice";
import evaluateRowConditions from "../utils/evaluate_row";

const form_group = css`
  margin-bottom: 30px !important;
`;

export class Questionaire extends Component {
  getOnChange = input_name => {
    const onChange = e => {
      this.props.saveInputData({ [input_name]: e.target.value });
    };
    return onChange;
  };

  getOnFocus = input_name => {
    const onFocus = () => {
      this.props.saveVariableSelected({ variableSelected: input_name });
    };
    return onFocus;
  };

  render() {
    const { reduxState } = this.props;
    const questions = reduxState[reduxState.questionsSelected];
    if (!questions) {
      return null;
    }

    const jsx_array = [];

    const section_names = Array.from(
      new Set(questions.map(q => q.section_name))
    );

    section_names.forEach((section_name, k1) => {
      jsx_array.push(<h3 key={k1 + "-h3"}>{section_name}</h3>);
      questions
        .filter(q => q.section_name === section_name)
        .filter(g =>
          evaluateRowConditions(
            g,
            reduxState.allQuestions,
            reduxState.multiple_choice_options,
            reduxState.data
          )
        )

        .forEach((q, k2) => {
          const props = {
            className: form_group,
            name: q.variable_name,
            htmlFor: q.variable_name,
            input: {
              id: q.variable_name,
              onChange: this.getOnChange(q.variable_name),
              onFocus: this.getOnFocus(q.variable_name),
              value: reduxState.data[q.variable_name]
            },
            hint: q.hint,
            key: k1 + "-" + k2
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
                key={k1 + "-" + k2}
                store={this.props.store}
              />
            );
          }
        });
    });
    return (
      <React.Fragment>
        <p>
          Enter information about your research project to generate the forms and privacy notices you need. 
        </p>
        <p>
          Show them to your ATIP office for approval before using them.
        </p>
        {jsx_array}
      </React.Fragment>
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
    },
    saveVariableSelected: x => {
      dispatch({ type: "SAVE_VARIABLE_SELECTED", data: x });
    }
  };
};

Questionaire.propTypes = {
  reduxState: PropTypes.object,
  saveInputData: PropTypes.func,
  store: PropTypes.object,
  saveVariableSelected: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Questionaire);
