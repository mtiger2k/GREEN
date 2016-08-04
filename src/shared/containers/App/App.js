import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

import Header from '../Header/Rubix-Header';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';

const App = (props) => {
  App.propTypes = {
    children: PropTypes.element.isRequired
  };

  return (
    <MainContainer {...props}>
      <Sidebar />
      <Header />
      <div id="body">
        <Grid>
          <Row>
            <Col xs={12}>
              {props.children}
            </Col>
          </Row>
        </Grid>
      </div>
      <Footer />
    </MainContainer>
  );
};

export default App;
