import React from "react";
import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import App from "./App";
// The real content file, so this test also fails if its shape drifts away
// from what the components expect.
import resumeData from "../public/resumeData.json";

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(resumeData),
      })
    )
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

it("renders the page once resume data has loaded", async () => {
  render(<App />);

  expect(
    await screen.findAllByText(new RegExp(resumeData.main.name))
  ).toBeDefined();
  expect(fetch).toHaveBeenCalledWith("/resumeData.json", { cache: "no-cache" });
});
