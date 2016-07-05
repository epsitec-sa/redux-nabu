'use strict';

import {expect} from 'chai';
import {
  nabuReducer,
  translate,
  changeLocale,
  addLocale,
  addMessage,
  toggleMarker,
  toggleTranslatorPanel
} from '../src/index.js';


describe ('ReducerSpec -> actions', function () {
  it ('NABU_CHANGE_LOCALE', function () {
    const changeLocaleAction = changeLocale ('fr-CH');
    expect (changeLocaleAction).to.eql ({
      type: 'NABU_CHANGE_LOCALE',
      locale: 'fr-CH'
    });
  });

  it ('NABU_TRANSLATE', function () {
    const translateAction = translate (1, 2, 3);
    expect (translateAction).to.eql ({
      type: 'NABU_TRANSLATE',
      locale: 1,
      messageId: 2,
      value: 3
    });
  });

  it ('NABU_ADD_LOCALE', function () {
    const addLocaleAction = addLocale ('de-CH');
    expect (addLocaleAction).to.eql ({
      type: 'NABU_ADD_LOCALE',
      locale: 'de-CH'
    });
  });

  it ('NABU_ADD_MESSAGE', function () {
    const addMessageAction = addMessage (1, 2);
    expect (addMessageAction).to.eql ({
      type: 'NABU_ADD_MESSAGE',
      messageId: 1,
      description: 2
    });
  });
});

const initialState = nabuReducer ();

describe ('ReducerSpec -> reduce', function () {
  it ('NABU_CHANGE_LOCALE', function () {
    const state = nabuReducer (initialState, changeLocale ('de-CH'));
    expect (state.get ('locale')).to.eql ('de-CH');
  });

  it ('NABU_ADD_LOCALE', function () {
    const state = nabuReducer (initialState, addLocale ('de-CH'));
    expect (state.hasIn (['translations', 'de-CH'])).to.eql (true);
  });

  it ('NABU_ADD_MESSAGE', function () {
    const defLocale = initialState.get ('defaultLocale');
    const state = nabuReducer (initialState, addMessage ('my message'));
    expect (state.hasIn (['translations', defLocale, 'my message'])).to.eql (true);
  });

  it ('NABU_TRANSLATE', function () {
    let state = initialState;
    state = nabuReducer (state, addMessage ('my message'));
    state = nabuReducer (state, addLocale ('fr-CH'));

    expect (state.getIn ([
      'translations', 'fr-CH', 'my message', 'translated'
    ])).to.eql (false);

    state = nabuReducer (state, translate ('fr-CH', 'my message', 'mon message'));

    expect (state.getIn ([
      'translations', 'fr-CH', 'my message', 'defaultMessage'
    ])).to.eql ('mon message');
    expect (state.getIn ([
      'translations', 'fr-CH', 'my message', 'translated'
    ])).to.eql (true);
  });

  it ('NABU_TOGGLE_MARKS', function () {
    expect (initialState.get ('marker')).to.eql (false);
    const state = nabuReducer (initialState, toggleMarker ());
    expect (state.get ('marker')).to.eql (true);
  });

  it ('NABU_TOGGLE_TRANSLATOR', function () {
    expect (initialState.getIn (['translator', 'isOpen'])).to.eql (false);
    const state = nabuReducer (initialState, toggleTranslatorPanel ());
    expect (state.getIn (['translator', 'isOpen'])).to.eql (true);
  });
});
