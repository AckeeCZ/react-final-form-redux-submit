export interface FormActionTypes {
    SUBMIT: string
    SUCCESS: string
    FAILURE: string
}

export interface Action {
    type: string
}

// Copied from redux-toolkit
export type PayloadAction<
    P = void,
    T extends string = string,
    M = never,
    E = never
> = {
    payload: P
    type: T
} & ([M] extends [never]
    ? {}
    : {
          meta: M
      }) &
    ([E] extends [never]
        ? {}
        : {
              error: E
          })

export interface FormActions<
    FormValues extends Record<string, string | number | boolean>
> {
    submit: (
        values: FormValues,
        meta?: Record<string, any>
    ) => PayloadAction<FormValues, string, Record<string, any> | undefined>
    submitSuccess: () => Action
    submitFailure: (
        error: string | object
    ) => PayloadAction<{ error?: string | object }>
}
