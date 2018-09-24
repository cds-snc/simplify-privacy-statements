import React, { Component } from "react";
import { css, cx } from "react-emotion";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Layout from "../components/layout";
import Questionaire from "../components/questionaire";
import Agreement from "../components/agreement";
import Header from "../components/header";
import Button from "../components/button";
import Dropdown from "../components/dropdown";
import Link from "next/link";

const Container = css`
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  height: 100vh;
  margin-top: -80px;
  padding-top: 80px;
  position: relative;
  width: 100%;
  top: 0px;
  backface-visibility: hidden;
  will-change: overflow;
`;
const LeftRight = css`
  overflow: auto;
  height: auto;
  padding: 2rem;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
`;
const Left = css`
  box-sizing: border-box;
  width: 50%;
`;
const Right = css`
  flex: 1;
`;
const dropdownStyle = css`
  margin-bottom: 10px;
`;

export class Index extends Component {
  render() {
    return (
      <React.Fragment>
        <Header store={this.props.store} />
        <Layout>
          <div className={Container}>
            <div className={cx(LeftRight, Left)}>
              <h2>Questionaire</h2>
              <Questionaire store={this.props.store} />
            </div>

            <div className={cx(LeftRight, Right)}>
              <Dropdown
                label="Template"
                options={this.props.reduxState.templateList}
                selected={this.props.reduxState.templateSelected}
                saveSelected={this.props.saveTemplateSelected}
                className={dropdownStyle}
              />
              <Agreement store={this.props.store} />
              <Link href="/guidance">
                <Button>Download Word Doc</Button>
              </Link>
            </div>
          </div>
        </Layout>
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
    saveTemplateSelected: x => {
      dispatch({
        type: "SAVE_TEMPLATE_SELECTED",
        data: { templateSelected: x }
      });
    }
  };
};

Index.propTypes = {
  reduxState: PropTypes.object,
  saveTemplateSelected: PropTypes.func,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
