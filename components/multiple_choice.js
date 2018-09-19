import React, { Component } from "react";
import Radio from "@govuk-react/radio";
import MultiChoice from "@govuk-react/multi-choice";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { connect } from "react-redux";

const style = css`
  margin-top: 10px;
`;

export class MultipleChoice extends Component {
  render() {
    const { options, name, label, hint, className, reduxState } = this.props;

    const jsx_array = options.map((option, key) => {
      return (
        <Radio
          name={name}
          id={option.variable_name + key}
          key={key}
          className={key === 0 ? style : null}
          disabled={option.disabled == "true" ? "disabled" : null}
          onClick={() => {
            this.props.saveInputData({ [name]: option.display_text });
            this.props.saveVariableSelected({ variableSelected: name });
          }}
          checked={option.display_text === reduxState[name] ? true : null}
          onChange={() => {}} // remove jest warning
        >
          {option.display_text}
        </Radio>
      );
    });

    return (
      <MultiChoice id={name} label={label} hint={hint} className={className}>
        <div role="radiogroup" aria-labelledby={name}>
          {jsx_array}
        </div>
      </MultiChoice>
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

MultipleChoice.propTypes = {
  reduxState: PropTypes.object,
  saveInputData: PropTypes.func,
  saveVariableSelected: PropTypes.func,
  options: PropTypes.array,
  name: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  className: PropTypes.string,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultipleChoice);
