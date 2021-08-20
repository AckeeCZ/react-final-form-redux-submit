import { FORM_ERROR } from "final-form"
import type { FormApi } from "final-form"

const submitFormFactory =
    <FormValues extends Record<string, any> = Record<string, any>>(
        reduxAsyncHandler: (
            values: FormValues,
            form?: FormApi
        ) => Promise<unknown>
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

export default submitFormFactory
