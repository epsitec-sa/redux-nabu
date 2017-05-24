'use strict';

import {expect} from 'chai';
import {
  nabuReducer,
  translate,
  changeSelectedLocale,
  addLocale,
  addMessage,
  toggleMarker,
  toggleTranslatorPanel,
} from '../src/index.js';

describe ('ReducerSpec -> actions', function () {
  it ('NABU_CHANGE_SELECTED_LOCALE', function () {
    const changeSelectedLocaleAction = changeSelectedLocale ('fr-CH');
    expect (changeSelectedLocaleAction).to.eql ({
      type: 'NABU_CHANGE_SELECTED_LOCALE',
      locale: 'fr-CH',
    });
  });

  it ('NABU_TRANSLATE', function () {
    const translateAction = translate (1, 2, 3);
    expect (translateAction).to.eql ({
      type: 'NABU_TRANSLATE',
      locale: 1,
      messageId: 2,
      value: 3,
    });
  });

  it ('NABU_ADD_LOCALE', function () {
    const addLocaleAction = addLocale ('de-CH');
    expect (addLocaleAction).to.eql ({
      type: 'NABU_ADD_LOCALE',
      locale: 'de-CH',
    });
  });

  it ('NABU_ADD_MESSAGE', function () {
    const addMessageAction = addMessage (1, 2);
    expect (addMessageAction).to.eql ({
      type: 'NABU_ADD_MESSAGE',
      messageId: 1,
      description: 2,
    });
  });
});

const initialState = nabuReducer ();

describe ('ReducerSpec -> reduce', function () {
  it ('NABU_CHANGE_LOCALE', function () {
    const state = nabuReducer (initialState, changeSelectedLocale ('de-CH'));
    expect (state.get ('selectedLocale')).to.eql ('de-CH');
  });

  it ('NABU_ADD_LOCALE', function () {
    const state = nabuReducer (initialState, addLocale ('de-CH'));
    expect (state.get ('locales').includes ('de-CH')).to.eql (true);
  });

  it ('NABU_ADD_MESSAGE', function () {
    const state = nabuReducer (initialState, addMessage ('my message'));
    expect (state.hasIn (['messages', 'my message'])).to.eql (true);
    expect (state.hasIn (['messages', 'my message', 'translations'])).to.eql (
      true
    );
  });

  it ('NABU_TRANSLATE', function () {
    let state = initialState;
    state = nabuReducer (state, addMessage ('my message'));
    state = nabuReducer (state, addLocale ('fr-CH'));

    expect (
      state.getIn (['messages', 'my message', 'translations', 'fr-CH'])
    ).to.eql (undefined);

    state = nabuReducer (
      state,
      translate ('fr-CH', 'my message', 'mon message')
    );

    expect (
      state.getIn ([
        'messages',
        'my message',
        'translations',
        'fr-CH',
        'message',
      ])
    ).to.eql ('mon message');
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

describe ('ReducerSpec -> scenario', function () {
  it ('translate and addMessage', function () {
    let state = initialState;
    // locale without translation
    state = nabuReducer (state, translate ('fr-CH', 'my message', null));

    expect (
      state.getIn (['messages', 'my message', 'translations', 'fr-CH'])
    ).to.eql (undefined);

    state = nabuReducer (state, addMessage ('my message', 'my description'));

    expect (state.getIn (['messages', 'my message', 'description'])).to.eql (
      'my description'
    );

    state = nabuReducer (
      state,
      translate ('fr-CH', 'my message', 'mon message')
    );

    // should remain the same
    state = nabuReducer (state, addMessage ('my message'));

    expect (
      state.getIn ([
        'messages',
        'my message',
        'translations',
        'fr-CH',
        'message',
      ])
    ).to.eql ('mon message');
    expect (state.getIn (['messages', 'my message', 'description'])).to.eql (
      'my description'
    );
  });
});
