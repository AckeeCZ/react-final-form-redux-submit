export interface FormActionTypes {
    SUBMIT: string
    SUCCESS: string
    FAILURE: string
}

export interface Action {
    type: string
}

export type DefaultFormValues = Record<string, any>

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
    ? // eslint-disable-next-line @typescript-eslint/ban-types
      {}
    : {
          meta: M
      }) &
    ([E] extends [never]
        ? // eslint-disable-next-line @typescript-eslint/ban-types
          {}
        : {
              error: E
          })

export interface FormActions<FormValues extends DefaultFormValues> {
    submit: (
        values: FormValues,
        meta?: Record<string, any>
    ) => PayloadAction<FormValues, string, Record<string, any> | undefined>
    submitSuccess: () => Action
    submitFailure: (
        error: string | Record<string, unknown>
    ) => PayloadAction<{ error?: string | Record<string, unknown> }>
}
