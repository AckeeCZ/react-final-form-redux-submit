import type { FormActionTypes, FormActions } from "./types"

export const createFormActionTypes = (
    formPrefix: string,
    modulePrefix = ""
): FormActionTypes => ({
    SUBMIT: `${modulePrefix}${modulePrefix ? "/" : ""}${formPrefix}_SUBMIT`,
    SUCCESS: `${modulePrefix}${modulePrefix ? "/" : ""}${formPrefix}_SUCCESS`,
    FAILURE: `${modulePrefix}${modulePrefix ? "/" : ""}${formPrefix}_FAILURE`,
})

export const createFormActions = <
    FormValues extends Record<string, string | number | boolean>
>(
    types: FormActionTypes
): FormActions<FormValues> => ({
    submit: (values, meta) => ({
        type: types.SUBMIT,
        payload: values,
        meta,
    }),
    submitSuccess: () => ({
        type: types.SUCCESS,
    }),
    submitFailure: (error) => ({
        type: types.FAILURE,
        payload: {
            error,
        },
    }),
})
