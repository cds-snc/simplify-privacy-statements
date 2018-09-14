import React, { Component } from "react";
import Button from "@govuk-react/button";
import { css, cx } from "react-emotion";
import Link from "next/link";
import PropTypes from "prop-types";
import Layout from "../components/layout";
import Questionaire from "../components/questionaire";

import Agreement from "../components/agreement";

const button = css`
  display: inline;
  margin-right: 10px;
  margin-top: 10px;
`;


/*This just stops me getting horizontal scrolling if anything overflows the width*/
/*Just removing default browser padding/margin*/
const body = css`
    overflow-x: hidden;
    padding: 0;
    margin: 0;
`
/*Flexbox gives us the flexiness we need. The top just stays put as there is no scrolling on the body
due to the page never exceeding viewport height*/
const Top = css`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 10;
    height: 100px;
    padding-top: 0px;
`
/*This is our main wrapping element, it's made 100vh high to ensure it is always the correct size and then moved
into place and padded with negative margin and padding*/
const Container = css`
    display: flex;
    overflow: hidden;
    height: 100vh;
    margin-top: -100px;
    padding-top: 100px;
    position: relative;
    width: 100%;
    backface-visibility: hidden;
    will-change: overflow;
`
/*All the scrollable sections should overflow and be whatever height they need to be. As they are flex-items
(due to being inside a flex container) they could be made to stretch full height at all times if needed.
WebKit inertia scrolling is being added here for any present/future devices that are able to make use of it.
*/

const LeftRight = css`
    overflow: auto;
    height: auto;
    padding: .5rem;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
`

/*  Left and Right are set sizes while the Middle is set to flex one so it occupies all remaining space. This could be
set as a width too if prefereable, perhaps using calc.*/
const Left = css`
    width: 50%;
`

const Right = css`
    flex: 1;
`

export class Index extends Component {


  render() {

    return (
      <Layout >

    <div className={body}>
      <div className={Top}>
        <h1>Generate a Simple Privacy Statement</h1>
          <Link href="/validation">
            <Button className={button}>Validation</Button>
          </Link>
        </div>

          <div className={Container}>

              <div className={cx(LeftRight, Left)}>
                    <h2>Questionaire</h2>
                   <Questionaire store={this.props.store}/>
            </div>

          <div className={cx(LeftRight, Right)}>
            <h2>Agreement</h2>
            <Agreement store={this.props.store}/>
            </div>
        </div>
        </div>
      </Layout>
    );
  }
}

Index.propTypes = {
  store: PropTypes.object
};

export default Index;
