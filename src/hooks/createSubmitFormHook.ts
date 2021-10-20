import { useMemo, useEffect } from "react"

import type { FormActions, PayloadAction } from "../services/actions"
import { submitFormFactory, ReduxAsyncHandler } from "../services/utils"

interface ReduxPromiseListener {
    createAsyncFunction: <FormValues>(config: Record<string, unknown>) => {
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
    <FormValues>(
        actions: FormActions<FormValues>,
        meta?: Record<string, any>
    ) => {
        const onSubmit = useMemo(
            () =>
                reduxPromiseListener.createAsyncFunction<FormValues>({
                    start: actions.submit.toString(),
                    resolve: actions.submitSuccess.toString(),
                    reject: actions.submitFailure.toString(),
                    setPayload: (
                        action: PayloadAction,
                        payload: PayloadAction["payload"]
                    ) => ({
                        ...action,
                        payload,
                        meta,
                    }),
                }),
            [actions, meta]
        )

        useEffect(() => {
            return () => onSubmit.unsubscribe()
        }, [onSubmit])

        return submitFormFactory<FormValues>(onSubmit.asyncFunction)
    }
