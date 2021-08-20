import { FORM_ERROR } from "final-form"
import type { FormApi } from "final-form"

export type ReduxAsyncHandler<
    FormValues extends unknown = Record<string, any>
> = (values: FormValues, form?: FormApi) => Promise<unknown>

export const submitFormFactory =
    <FormValues extends unknown = Record<string, any>>(
        reduxAsyncHandler: ReduxAsyncHandler<FormValues>
    ) =>
    async (
        values: FormValues,
        form?: FormApi
    ): Promise<undefined | Record<string, string>> => {
        try {
            await reduxAsyncHandler(values, form)
        } catch (payload) {
            const error: Record<string, string> | string =
                payload?.error ?? payload

            if (typeof error === "string") {
                return {
                    [FORM_ERROR]: error,
                }
            }

            return error
        }
    }
