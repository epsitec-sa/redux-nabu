'use strict';

import {expect} from 'chai';
import {translate, changeLocale, addMessage} from '../src/index.js';


describe ('ReducerSpec -> actions', () => {
  it ('actions checkup', () => {
    const translateAction = translate (1, 2, 3);
    const changeLocaleAction = changeLocale ('fr-CH');
    const addMessageAction = addMessage (1, 2);

    expect (translateAction).to.eql ({
      type: 'NABU_TRANSLATE',
      locale: 1,
      messageId: 2,
      value: 3
    });

    expect (changeLocaleAction).to.eql ({
      type: 'NABU_CHANGE_LOCALE',
      locale: 'fr-CH'
    });

    expect (addMessageAction).to.eql ({
      type: 'NABU_ADD_MESSAGE',
      messageId: 1,
      description: 2
    });
  });
});
