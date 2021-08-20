import { createFormActionTypes, createFormActions } from "../factories"
import type { FormActions, FormActionTypes } from "../types"

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

        it("creates types with form and module prefix", () => {
            const types = createFormActionTypes("TEST_FORM", "TEST_MODULE")

            expect(types).toEqual({
                SUBMIT: "TEST_MODULE/TEST_FORM_SUBMIT",
                SUCCESS: "TEST_MODULE/TEST_FORM_SUCCESS",
                FAILURE: "TEST_MODULE/TEST_FORM_FAILURE",
            })
        })
    })

    describe("createFormActions", () => {
        let types: FormActionTypes
        let actions: FormActions<{ name: string }>

        beforeEach(() => {
            types = createFormActionTypes("TEST_FORM")
            actions = createFormActions<{ name: string }>(types)
        })

        it("creates submit action which returns correct object", () => {
            expect(actions.submit({ name: "John" }, { id: 4 })).toEqual({
                type: types.SUBMIT,
                payload: { name: "John" },
                meta: { id: 4 },
            })
        })

        it("creates success action which returns correct object", () => {
            expect(actions.submitSuccess()).toEqual({
                type: types.SUCCESS,
            })
        })

        it("create failure action which returns correct object", () => {
            expect(actions.submitFailure("error.api.400")).toEqual({
                type: types.FAILURE,
                payload: {
                    error: "error.api.400",
                },
            })
        })
    })
})
