# Final form submission binding to redux

[![Tests](https://github.com/AckeeCZ/react-final-form-redux-submit/actions/workflows/test.yml/badge.svg)](https://github.com/AckeeCZ/react-final-form-redux-submit/actions/workflows/test.yml)

This package binds form submission into a Redux action and then waits for the submission resolution (success or error) using [Redux Promise Listener](https://github.com/erikras/redux-promise-listener) package.

 - [Why](why)
 - [Uage](usage)
 - [API](api)

## Why?

Final Form uses promises for submission. In case you use e.g. Redux Saga middleware for async / business logic you have no way to be informed about the form submission since Final Form doesn't use Redux.

## Usage

### 1. Setup Redux Promise Listener

First, you need to setup [Redux Promise Listener](https://github.com/erikras/redux-promise-listener#usage) and export its `promiseListener` object.

### 2. Create action creators

Then you create Redux action creators that are dispatched when a form is submitted. The package exports convenient helpers `createFormActions` for that. Action creator functions have `toString` method that returns the action type (similar to Redux Toolkit API).

```ts
import { createFormActions } from 'react-final-form-redux-submit'

const formActions = createFormActions('MY_FORM');
```

### 3. Create submit hook and use it in a form

First, you need to create a hook for form submission with a factory function. Then you use the hook in your form.

> Tip: Create the `useSubmitForm` hook just once in a project and export it.

```ts
import { Form } from 'react-final-form'
import { createSubmitFormHook } from 'react-final-form-redux-submit'

import { promiseListener } from './store'
import { formActions } from './types'

const useSubmitForm = createSubmitFormHook(promiseListener)

const MyForm = () => {
    const onSubmit = useFormSubmit(formActions);

    return (
        <Form name="myform" onSubmit={onSubmit}>
            {(formProps) => <>...</>}
        </Form>
    );
};
```

### 4. React in a saga

Now when the form is submitted `FORM_SUBMIT` action is dispatched with form values in `payload` and Redux saga can react to it with e.g. `takeEvery` effect. The form submit handler won't resolve until `SUCCESS` or `FAILURE` action is dispatched. Final form handles the form state like `submitting` flag or `errors`.

```ts
import * as formActions from '../actions';

function* handleFormSubmit(action: Action<FormValues>) {
    try {
        // Make API call or any other logic
        yield call(apiRequest, config.api.login, action.payload); 
        yield put(formActions.submitSuccess());
    } catch (error: Error) {
        const errorMessage = constructMessage(error);
        yield put(formActions.submitFailure(errorMessage));
    }
}

export default function* form() {
    yield takeEvery(formActions.submit.toString(), handleFormSubmit);
}
```

## API

### `createSubmitFormHook: (listener: ReduxPromiseListener) => (actions: FormActions) => Function`

A factory function for creating the hook that accepts `FormActionTypes` and returns `onSubmit` handler that can be passed to `Form`.

### `createFormActions(formPrefix: string): FormActions`

An utility for creating `FormActions`.
