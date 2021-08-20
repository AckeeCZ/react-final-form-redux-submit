# Final form submit binding to redux

[![Tests](https://github.com/AckeeCZ/react-final-form-redux-submit/actions/workflows/test.yml/badge.svg)](https://github.com/AckeeCZ/react-final-form-redux-submit/actions/workflows/test.yml)

This package binds form submission into a Redux action and then waits for the submission resolution (success or error) using [Redux Promise Listener](https://github.com/erikras/redux-promise-listener) package.

 - [Why](why)
 - [Uage](usage)
 - [API](api)

## Why?

Final Form uses promises for submission. In case you use e.g. Redux Saga middleware for async / business logic you have no way to be informed about the form submission since Final Form doesn't use Redux.

## Usage

### Setup Redux Promise Listener

First, you need to setup [Redux Promise Listener](https://github.com/erikras/redux-promise-listener#usage) and export its `promiseListener` object.

### Create action types

Then you create Redux action types that are called if a form is submitted. The package exports convenient helpers `createFormActionTypes` and `createFormActions` for that.

```ts

const formTypes: FormActionTypes = {
    SUBMIT: 'MY_FORM_SUBMIT',
    SUCCESS: 'MY_FORM_SUBMIT_SUCCESS',
    FAILURE: 'MY_FORM_SUBMIT_FAILURE',
};

// or

import { createFormActionTypes } from 'react-final-form-redux-submit'

const formTypes = createFormActionTypes('MY_FORM');

```

You can also optionally create Redux actions e.g. to call from a saga on success / error

```ts
import { createFormActions } from 'react-final-form-redux-submit'

const formActions = createFormActions(types);
```

### Create submit hook and use it in a form

First, you need to create a hook for form submission with a factory function. Then you use the hook in your form.

> Tip: Create the `useSubmitForm` hook just once in a project and export it.

```ts
import { Form } from 'react-final-form'
import { createSubmitFormHook } from 'react-final-form-redux-submit'

import { promiseListener } from './store'
import { formTypes } from './types'

const useSubmitForm = createSubmitFormHook(promiseListener)

const MyForm: FunctionComponent<MyFormProps> = () => {
    const onSubmit = useFormSubmit(formTypes);

    return (
        <Form name="myform" onSubmit={onSubmit}>
            {(formProps) => <>...</>}
        </Form>
    );
};
```

### React in a saga

Now when the form is submitted `FORM_SUBMIT` action is dispatched with form values in `payload` and Redux saga can react to it with e.g. `takeEvery` effect. The form submit handler won't resolve until `SUCCESS` or `FAILURE` action is dispatched. Final form handles the form state like `submitting` flag or `errors`.

```ts
import { formTypes, formSubmitSuccess, formSubmitFailure } from '../actions';

function* handleFormSubmit(action: Action<FormValues>) {
    try {
        // Make API call or any other logic
        yield call(apiRequest, config.api.login, action.payload); 
        yield put(formSubmitSuccess());
    } catch (error: Error) {
        const errorMessage = constructMessage(error);
        yield put(formSubmitError(errorMessage));
    }
}

export default function* form() {
    yield takeEvery(formTypes.SUBMIT, handleFormSubmit);
}

## API

TODO 
