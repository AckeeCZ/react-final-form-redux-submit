import { createFormActionTypes, createFormActions } from "../factories"
import type { FormActions } from "../types"

describe("factories", () => {
    describe("createFormActionTypes", () => {
        it("creates types with form prefix", () => {
            const types = createFormActionTypes("TEST_FORM")

            expect(types).toEqual({
                SUBMIT: "TEST_FORM_SUBMIT",
                SUCCESS: "TEST_FORM_SUCCESS",
                FAILURE: "TEST_FORM_FAILURE",
            })
        })
    })

    describe("createFormActions", () => {
        let actions: FormActions<{ name: string }>

        beforeEach(() => {
            actions = createFormActions<{ name: string }>("TEST_FORM")
        })

        it("creates submit action which returns correct object", () => {
            expect(actions.submit({ name: "John" }, { id: 4 })).toEqual({
                type: "TEST_FORM_SUBMIT",
                payload: { name: "John" },
                meta: { id: 4 },
            })
        })

        it("creates success action which returns correct object", () => {
            expect(actions.submitSuccess()).toEqual({
                type: "TEST_FORM_SUCCESS",
            })
        })

        it("create failure action which returns correct object", () => {
            expect(actions.submitFailure("error.api.400")).toEqual({
                type: "TEST_FORM_FAILURE",
                payload: {
                    error: "error.api.400",
                },
            })
        })

        it("has toString method which returns action type", () => {
            expect(actions.submit.toString()).toBe("TEST_FORM_SUBMIT")
            expect(actions.submitSuccess.toString()).toBe("TEST_FORM_SUCCESS")
            expect(actions.submitFailure.toString()).toBe("TEST_FORM_FAILURE")
        })
    })
})
