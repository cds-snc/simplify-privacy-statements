import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { extractCritical } from "emotion-server";
import flush from "styled-jsx/server";

const bodyStyling = {
  fontFamily: `"nta", Arial, sans-serif`
};

class MyDocument extends Document {
  static getInitialProps(ctx) {
    //eslint-disable-next-line react/display-name
    const page = ctx.renderPage(Component => props => <Component {...props} />);

    const emotionStyles = extractCritical(page.html);
    return {
      ...page,
      styles: (
        <React.Fragment>
          <style
            id="emotion-server-side"
            dangerouslySetInnerHTML={{ __html: emotionStyles.css }}
          />

          {flush() || null}
        </React.Fragment>
      )
    };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body style={bodyStyling}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
