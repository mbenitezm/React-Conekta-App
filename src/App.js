import React, { Component } from 'react';
import uuid from 'uuid';
import { createStore, combineReducers } from 'redux';
import logo from './logo.svg';
import './App.css';
import { Tabs, CcForm, OxxoForm, ConektaPubKey, LoadingAnimation, Reducer } from './constants';

class App extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  handleMenuTabClick = (id) => {
    store.dispatch({
      type: 'TAB_CLICKED',
      id: id
    });
  };

  handleCcSubmit = () => {
  };

  handleOxxoSubmit = () => {
  };

  render() {
    const state = store.getState();
    const tabs = state.forms.map(t=> (
      {
        id: t.id,
        title: t.title,
        active: t.id == state.activeTab
      }
    ));

    return (
      <div className='ui segment'>
        <MenuTabs
          tabs={tabs}
          onTabClick={this.handleMenuTabClick}
        />
        <Form
          activeForm={state.activeTab}
          ccSubmitForm={this.handleCcSubmit}
          oxxoSubmitForm={this.handleOxxoSubmit}
        />
        <Loader />
      </div>
    );
  }
}

class MenuTabs extends Component {
  render() {
    return(
      <Tabs
        tabs={this.props.tabs}
        onTabClick={this.props.onTabClick}
      />
    );
  }
}

class Form extends Component {
  handleCcSubmit = () => {
    store.dispatch({
      type: 'FORM_ATTEMPT',
    });

    window.Conekta.setPublishableKey(ConektaPubKey);
    window.Conekta.token.create(document.forms[0], conektaSuccessResponseHandler, conektaErrorResponseHandler)

    this.props.ccSubmitForm();
  }

  handleOxxoSubmit = () => {
    window.Conekta.setPublishableKey(ConektaPubKey);
    store.dispatch({
      type: 'FORM_ATTEMPT',
    });

    this.props.oxxoSubmitForm();
  }

  render() {
    const state = store.getState();
    if (this.props.activeForm == 'cc-payment') {
      return (
        <CcForm
          onFormSubmit={this.handleCcSubmit}
          ccToken={state.ccToken}
          buttonDisabled={state.formAttempted}
        />
      );
    }
    else if  (this.props.activeForm == 'oxxo') {
      return (
        <OxxoForm
          onFormSubmit={this.handleOxxoSubmit}
          buttonDisabled={state.formAttempted}
        />
      );
    }
  }
}

class Loader extends Component {
  render() {
    const state = store.getState();
    if (state.formAttempted) {
      return (
        <LoadingAnimation />
      );
    }
    else {
      return (
        <div> </div>
      );
    }
  }
}

const store = createStore(Reducer);

//conekta//
var conektaSuccessResponseHandler = (function (token) {
  store.dispatch({type: 'TOKEN_GENERATED', token: token })
});

var conektaErrorResponseHandler = (function (response) {
  alert("Error: "+ response.message_to_purchaser);
  store.dispatch({type: 'TOKEN_ERROR'})
});


export default App;
