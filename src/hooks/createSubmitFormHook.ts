import { useMemo, useEffect } from "react"

import type { FormActionTypes, PayloadAction } from "../services/actions"
import { submitFormFactory, ReduxAsyncHandler } from "../services/utils"

interface ReduxPromiseListener {
    createAsyncFunction: <FormValues extends unknown = Record<string, any>>(
        config: Record<string, unknown>
    ) => {
        unsubscribe: () => void
        asyncFunction: ReduxAsyncHandler<FormValues>
    }
}

/**
 * Creates useFormSubmit hook connected to a Redux through middleware function specified in reduxPromiseListener object
 */
export const createSubmitFormHook =
    (reduxPromiseListener: ReduxPromiseListener) =>
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    <FormValues extends unknown = Record<string, any>>(
        types: FormActionTypes,
        meta?: Record<string, any>
    ) => {
        const { SUBMIT, SUCCESS, FAILURE } = types
        const onSubmit = useMemo(
            () =>
                reduxPromiseListener.createAsyncFunction<FormValues>({
                    start: SUBMIT,
                    resolve: SUCCESS,
                    reject: FAILURE,
                    setPayload: (
                        action: PayloadAction,
                        payload: PayloadAction["payload"]
                    ) => ({
                        ...action,
                        payload,
                        meta,
                    }),
                }),
            [SUBMIT, SUCCESS, FAILURE, meta]
        )

        useEffect(() => {
            return () => onSubmit.unsubscribe()
        }, [onSubmit])

        return submitFormFactory<FormValues>(onSubmit.asyncFunction)
    }
