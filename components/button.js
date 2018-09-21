import styled from "react-emotion";
import PropTypes from "prop-types";
import React from "react";
import { globalTheme } from "../theme";

const StyledButton = styled("button")(
  {
    backgroundColor: globalTheme.colour.fernGreen,
    border: "none",
    borderRadius: "3px",
    color: "white",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "space-between",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "23px",
    outlineOffset: "-1px",
    outline: "1px solid transparent",
    padding: ".526315em .789473em",
    textDecoration: "none",
    WebkitAppearance: "none",
    WebkitFontSmoothing: "antialiased",
    verticalAlign: "middle",
    ":hover": {
      backgroundColor: globalTheme.colour.darkGreen,
      color: "white"
    },
    ":focus": {
      color: "white",
      backgroundColor: globalTheme.colour.darkGreen
    },
    ":active": {
      position: "relative",
      top: "2px",
      boxShadow: `0 0 0 ${globalTheme.colour.darkGreen}`
    },
    ":visited": {
      color: "white"
    },
    " svg": {
      verticalAlign: "middle"
    }
  },
  ({ isBig }) => ({
    fontSize: isBig ? "24px" : undefined,
    lineHeight: isBig ? "31px" : undefined,
    padding: isBig ? ".36842em .84211em" : undefined,
    " svg": {
      height: isBig ? "31px" : undefined,
      width: isBig ? "36px" : undefined
    }
  }),
  ({ isSecondary }) => ({
    backgroundColor: isSecondary ? globalTheme.colour.cerulean : undefined,
    ":hover": {
      backgroundColor: isSecondary ? globalTheme.colour.darkGreyBlue : undefined
    },
    ":focus": {
      backgroundColor: isSecondary
        ? globalTheme.colour.darkGreyBlue
        : undefined,
      outline: `3px solid ` + globalTheme.colour.govukYellow
    },
    ":active": {
      boxShadow: isSecondary
        ? `0 0 0 ${globalTheme.colour.darkGreyBlue}`
        : undefined
    }
  })
);

// from: https://github.com/UKHomeOffice/govuk-react/blob/master/components/button/src/index.js

const Button = ({ big, secondary, children, icon, ...props }) => (
  <StyledButton icon={icon} isBig={big} isSecondary={secondary} {...props}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  /**
   * Button text
   */
  children: PropTypes.node,
  /**
   * Button icon
   */
  icon: PropTypes.node,
  /**
   * Renders a large button if set to true
   */
  big: PropTypes.bool,
  /**
   * Renders a disabled button and removes pointer events if set to true
   */
  secondary: PropTypes.bool
};

Button.defaultProps = {
  children: "Button",
  icon: undefined,
  big: false,
  secondary: false
};

export default Button;
