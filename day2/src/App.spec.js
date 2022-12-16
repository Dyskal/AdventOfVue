import {cleanup, configure, fireEvent, render} from "@testing-library/vue";
import {afterAll, afterEach, beforeAll, expect, it} from "vitest";
import {setupServer} from "msw/node";
import {rest} from "msw";
import App from "./App.vue";

configure({testIdAttribute: "data-qa"});

afterEach(cleanup);

it("should show a joke question", async () => {
  const {findByTestId} = render(App);

  const question = await findByTestId("question");
  expect(question.innerHTML.length).toBeGreaterThan(0);
});

it("should show the response when clicking `Tell Me!`", async () => {
  const {findByRole, findByTestId} = render(App);

  await fireEvent.click(await findByRole("button", {name: "Tell Me!"}));

  const response = await findByTestId("response");
  expect(response.innerHTML.length).toBeGreaterThan(0);
});

it("should show a new joke question when clicking `Another` after seeing the response", async () => {
  const {findByRole, findByTestId} = render(App);

  const oldQuestion = (await findByTestId("question")).innerHTML;

  await fireEvent.click(await findByRole("button", {name: "Tell Me!"}));
  await fireEvent.click(await findByRole("button", {name: "Another"}));

  const question = await findByTestId("question");
  expect(question.innerHTML.length).toBeGreaterThan(0);
  expect(question.innerHTML).not.toBe(oldQuestion);
});

// https://github.com/Advent-Of-Vue/aov-joke-generator/blob/solution/test/setup.js
// https://github.com/Advent-Of-Vue/aov-joke-generator/blob/solution/src/App.spec.js
// https://vitest.dev/guide/mocking.html#requests

const {close, listen, resetHandlers} = setupServer();
beforeAll(() => listen({onUnhandledRequest: "error"}));
afterAll(() => close());
afterEach(() => resetHandlers());
