import { FORM_ERROR } from "final-form"
import { submitFormFactory } from "../submitFormFactory"

describe("submitForm handler", () => {
    const asyncHandler = jest.fn()

    beforeEach(() => {
        jest.resetAllMocks()
    })

    it("returns undefined if submit succeeds", async () => {
        asyncHandler.mockReturnValue(Promise.resolve())

        const handleSubmit = submitFormFactory(asyncHandler)
        const result = await handleSubmit({ name: "John Doe" })

        expect(asyncHandler).toHaveBeenCalledWith(
            { name: "John Doe" },
            undefined
        )
        expect(result).toBe(undefined)
    })

    it("returns object of submission errors with form values shape", async () => {
        asyncHandler.mockReturnValue(
            Promise.reject({
                error: { name: "error.invalidName" },
            })
        )

        const handleSubmit = submitFormFactory(asyncHandler)
        const result = await handleSubmit({ name: "John Doe" })

        expect(asyncHandler).toHaveBeenCalledWith(
            { name: "John Doe" },
            undefined
        )
        expect(result).toEqual({
            name: "error.invalidName",
        })
    })

    it("returns object with FORM_ERROR key for generic submission error", async () => {
        asyncHandler.mockReturnValue(
            Promise.reject({
                error: "error.login",
            })
        )

        const handleSubmit = submitFormFactory(asyncHandler)
        const result = await handleSubmit({ name: "John Doe" })

        expect(asyncHandler).toHaveBeenCalledWith(
            { name: "John Doe" },
            undefined
        )
        expect(result).toEqual({
            [FORM_ERROR]: "error.login",
        })
    })
})
