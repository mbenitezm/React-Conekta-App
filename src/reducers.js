export function tabReducer(state = 'cc-payment', action) {
  if (action.type === 'TAB_CLICKED') {
    return action.id;
  }
  else {
    return state;  
  }
}

export function formReducer(state= [
    {
      id: 'cc-payment',
      title: 'Pago con tarjeta de crédito',
    },
    {
      id: 'oxxo',
      title: 'Oxxo Pay',
    }
], action){
  return state;
}

export function tokenReducer(state = '', action) {
  if (action.type === 'TOKEN_GENERATED') {
    return action.token.id;
  }
  else {
    return state;
  }
}


export function formAttemptReducer(state=false, action) {
  if (action.type === 'ATTEMPT_END') {
    return false
  }
  else if (action.type === 'FORM_ATTEMPT'){
    return true
  }
  else {
    return state;
  }
}

export function formStateReducer(state='pending', action) {
  if (action.type === 'UPDATE_FORM_STATE') {
    return action.state
  }
  else {
    return state
  }
}
