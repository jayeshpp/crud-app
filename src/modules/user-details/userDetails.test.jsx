import ListUsers from "./ListUsers";
import { describe, it, expect } from "vitest";
import { render, screen } from "utils/test-utils";
import userEvent from "@testing-library/user-event";
import { userData } from "mocks/data";
import { waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { cleanUpFirestoreResponse } from "services/helpers";
import { rest } from "msw";
import { server } from "mocks/server";
import { MSW_BASE_URL } from "mocks/handlers";

describe("ListUserDetails", () => {
  it("renders loading state", async () => {
    render(<ListUsers />, {
      initialState: {
        userDetails: {
          userList: [],
          fetchStatus: "loading",
        },
      },
    });

    expect(screen.getByText("loading")).toBeInTheDocument();
  });

  it("renders user list", async () => {
    render(<ListUsers />, {
      preloadedState: {
        userDetails: {
          userList: cleanUpFirestoreResponse(userData.documents),
        },
      },
    });

    await waitFor(() => screen.getAllByTestId("user-table"));

    cleanUpFirestoreResponse(userData.documents).forEach((user) => {
      expect(
        screen.getByText([user.first_name, user.last_name].join(" "))
      ).toBeInTheDocument();
    });

    userEvent.click(screen.getByText("Add New"));
    userEvent.click(screen.getByTestId("edit-0"));
    userEvent.click(screen.getByTestId("delete-0"));
  });

  it("renders empty user list", async () => {
    server.use(
      rest.get(
        `${MSW_BASE_URL}/\\(default\\)/documents/users`,
        (req, res, ctx) => res(ctx.json())
      )
    );

    render(<ListUsers />);
    await waitFor(() => screen.getAllByTestId("user-table"));
    expect(screen.getByText(/No records found!/)).toBeInTheDocument();
  });

  it("renders error state", async () => {
    server.use(
      rest.get(
        `${MSW_BASE_URL}/\\(default\\)/documents/users`,
        (req, res, ctx) =>
          res(ctx.status(500), ctx.json({ error: true, message: "Error" }))
      )
    );

    render(<ListUsers />);
    await waitForElementToBeRemoved(() => screen.getByText("loading"));
    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
  });
});
