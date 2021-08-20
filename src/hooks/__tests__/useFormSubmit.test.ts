import { renderHook, act } from "@testing-library/react-hooks"

import { FormActionTypes } from "../../services/actions"
import { createSubmitFormHook } from "../createSubmitFormHook"

const reduxPromiseListener = {
    createAsyncFunction: jest.fn(),
    unsubscribe: jest.fn(),
}

const formSubmitTypes: FormActionTypes = {
    SUBMIT: "SUBMIT",
    SUCCESS: "SUBMIT_SUCCESS",
    FAILURE: "SUBMIT_FAILURE",
}

const useFormSubmit = createSubmitFormHook(reduxPromiseListener)

describe("useFormSubmit", () => {
    const onSubmit = {
        asyncFunction: jest.fn(),
        unsubscribe: jest.fn(),
    }
    const reset = jest.fn()

    beforeEach(() => {
        jest.resetAllMocks()
        reduxPromiseListener.createAsyncFunction.mockReturnValue(onSubmit)
    })

    it("returns submit form handler", () => {
        const { result } = renderHook<any, any>(() =>
            useFormSubmit(formSubmitTypes)
        )

        act(() => {
            result.current({ email: "john@doe.cz" }, { reset })
        })

        expect(reduxPromiseListener.createAsyncFunction).toHaveBeenCalled()
        expect(onSubmit.asyncFunction).toHaveBeenCalledWith(
            { email: "john@doe.cz" },
            { reset }
        )
    })

    it("unsubscribes the handler on unmount", () => {
        const { unmount } = renderHook<any, any>(() =>
            useFormSubmit(formSubmitTypes)
        )

        act(() => {
            unmount()
        })

        expect(onSubmit.unsubscribe).toHaveBeenCalled()
    })
})
