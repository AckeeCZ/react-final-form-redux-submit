import type { FormActionTypes, FormActions, DefaultFormValues } from "./types"

export const createFormActionTypes = (formPrefix: string): FormActionTypes => ({
    SUBMIT: `${formPrefix}_SUBMIT`,
    SUCCESS: `${formPrefix}_SUCCESS`,
    FAILURE: `${formPrefix}_FAILURE`,
})

export const createFormActions = <FormValues extends DefaultFormValues>(
    formPrefix: string
): FormActions<FormValues> => {
    const types = createFormActionTypes(formPrefix)

    const actions: FormActions<FormValues> = {
        submit: function (values, meta) {
            return {
                type: types.SUBMIT,
                payload: values,
                meta,
            }
        },
        submitSuccess: function () {
            return {
                type: types.SUCCESS,
            }
        },
        submitFailure: function (error) {
            return {
                type: types.FAILURE,
                payload: {
                    error,
                },
            }
        },
    }

    actions.submit.toString = () => types.SUBMIT
    actions.submitSuccess.toString = () => types.SUCCESS
    actions.submitFailure.toString = () => types.FAILURE

    return actions
}
