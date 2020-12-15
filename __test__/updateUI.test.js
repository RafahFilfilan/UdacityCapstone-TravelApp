//Function with no return will return 'undefined' so you can test for that using not.toBeUndefined();
//Reference: https://stackoverflow.com/questions/52571319/how-do-i-test-jest-to-expect-return

import { updateUI } from "../src/client/js/app"

describe("Testing that the function is working", () => {
	test("Testing updateUI function", () => {
		expect(updateUI).toBeUndefined();
	})
});