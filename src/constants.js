import React, { Component } from 'react';
import uuid from 'uuid';
import { tabReducer, formReducer, tokenReducer, formAttemptReducer } from './reducers'
import { createStore, combineReducers } from 'redux';

export const CcForm = (props) => (
  <div className='ui centered card'>
    <div className='content'>
      <div className='ui form'>
        <form>
          <div className='field'>
            <label>Nombre del tarjetahabiente</label>
            <input
              type='text'
              size='20'
              data-conekta='card[name]'
              name='card_holder_name'
              required={true}
            />
          </div>
          <div className='field'>
            <label>Número de tarjeta de crédito</label>
            <input
              type='text'
              size='20'
              data-conekta='card[number]'
              required={true}
            />
          </div>
          <div className='field'>
            <label>CVC</label>
            <input
              type='text'
              size='4'
              data-conekta='card[cvc]'
              required={true}
            />
          </div>
          <div className='field'>
            <label>Mes de Expiración</label>
            <input
              type='text'
              size='4'
              data-conekta='card[exp_month]'
              required={true}
            />
          </div>
          <div className='field'>
            <label>Año de Expiración</label>
            <input
              type='text'
              size='2'
              data-conekta='card[exp_year]'
            />
          </div>
          <input type='hidden' id='payment_engine' value="conekta" name='payment_engine'/>
          <input type='hidden' id='payment_type' value="credit_card" name='payment_type'/>
          <input type='hidden' id='conekta_credit_card_token' name='conekta_credit_card_token' value={props.ccToken} />
        </form>
        <div className='ui two bottom attached buttons'>
          <button
            className='ui basic blue button'
            disabled={props.buttonDisabled}
            onClick={props.onFormSubmit}
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const OxxoForm = (props) => (
  <div className='ui centered card'>
    <div className='content'>
      <div className='ui form'>
        <input type='hidden' id='payment_engine' value="conekta" name='payment_engine'/>
        <input type='hidden' id='payment_type' value="store" name='payment_type'/>
        <div className='ui two bottom attached buttons'>
          <button
            className='ui basic blue button'
            disabled={props.buttonDisabled}
            onClick={props.onFormSubmit}
          >
            Generar pago
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const Tabs = (props) => (
  <div className='ui top attached tabular menu'>
    {
      props.tabs.map((tab, index) => (
        <div
          key={index}
          className={tab.active ? 'active item' : 'item'}
          onClick={()=> { props.onTabClick(tab.id) }}
        >
          {tab.title}
        </div>
      ))
    }
  </div>
);

export const LoadingAnimation = () => (
  <div className="ui active inverted dimmer">
    <div className="ui massive text loader">Por favor espere</div>
  </div>
);

export const ConektaPubKey = 'key_Nw1zYq3q7m82RoeL8FqKWrw';

export const Reducer = combineReducers ({
  activeTab: tabReducer,
  forms: formReducer,
  ccToken: tokenReducer,
  formAttempted: formAttemptReducer,
});
