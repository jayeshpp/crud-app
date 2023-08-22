import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { describe, it, expect, vi } from "vitest";
import {
  userDetailsSlice,
  getUserDetailsAsync,
  getUserDetailsByIdAsync,
  addUserAsync,
  deleteUserAsync,
  updateUserAsync,
} from "./userDetails.slice";
import { services } from "services";
import { cleanUpFirestoreResponse } from "services/helpers";
import { rest } from "msw";
import { server } from "mocks/server";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("userDetailsSlice", () => {
  it("should handle getUserDetailsAsync", async () => {
    // Mock response data
    const mockResponse = {
      data: {
        documents: [
          { id: 1, name: "User 1" },
          { id: 2, name: "User 2" },
        ],
      },
    };

    services.getUserDetails = vi.fn(() => Promise.resolve(mockResponse));

    const initialState = { userDetails: userDetailsSlice.initialState };
    const store = mockStore(initialState);

    await store.dispatch(getUserDetailsAsync());

    const actions = store.getActions();
    expect(actions[0].type).toEqual(getUserDetailsAsync.pending.type);
    expect(actions[1].type).toEqual(getUserDetailsAsync.fulfilled.type);
    expect(actions[1].payload).toEqual(
      cleanUpFirestoreResponse(mockResponse.data.documents)
    );
  });

  it("should handle getUserDetailsByIdAsync", async () => {
    const mockResponse = {
      data: { id: 1, name: "User 1" },
    };

    services.getUserDetailsById = vi.fn(() => Promise.resolve(mockResponse));

    const initialState = { userDetails: userDetailsSlice.initialState };
    const store = mockStore(initialState);

    await store.dispatch(getUserDetailsByIdAsync(1));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(getUserDetailsByIdAsync.pending.type);
    expect(actions[1].type).toEqual(getUserDetailsByIdAsync.fulfilled.type);
    expect(actions[1].payload).toEqual(
      cleanUpFirestoreResponse([mockResponse.data])
    );
  });

  /* it('fetches user details by id and handles error', async () => {
    const store = mockStore({});
    server.use(
      rest.get('/getUserDetailsById/:id', (req, res, ctx) => {
        return res(ctx.json({ error: true, message: 'Some error message' }));
      })
    );

    await store.dispatch(getUserDetailsByIdAsync(1));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(getUserDetailsByIdAsync.pending.type);
    expect(actions[1].type).toEqual(getUserDetailsByIdAsync.rejected.type);
    expect(actions[1].payload).toEqual({ error: true, message: 'Some error message' });
  });

  it('handles rejection with correct payload', async () => {
    const store = mockStore({});
    const error = { message: 'An error occurred' };
    
    await store.dispatch(getUserDetailsByIdAsync(1, { rejectWithValue: error }));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(getUserDetailsByIdAsync.pending.type);
    expect(actions[1].type).toEqual(getUserDetailsByIdAsync.rejected.type);
    expect(actions[1].payload).toEqual(error);
  }); */

  it("should handle addUserAsync", async () => {
    const mockResponse = {
      data: { id: 3, name: "User 3" },
    };

    services.addUser = vi.fn(() => Promise.resolve(mockResponse));

    const initialState = { userDetails: userDetailsSlice.initialState };
    const store = mockStore(initialState);

    await store.dispatch(addUserAsync({ name: "User 3" }));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(addUserAsync.pending.type);
    expect(actions[1].type).toEqual(addUserAsync.fulfilled.type);
    expect(actions[1].payload).toEqual(
      cleanUpFirestoreResponse([mockResponse.data])
    );
  });

  it("should handle deleteUserAsync", async () => {
    services.deleteUser = vi.fn(() => Promise.resolve());

    const initialState = {
      userDetails: {
        ...userDetailsSlice.initialState,
        userList: [
          { id: 1, name: "User 1" },
          { id: 2, name: "User 2" },
        ],
      },
    };
    const store = mockStore(initialState);

    await store.dispatch(deleteUserAsync(1));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(deleteUserAsync.pending.type);
    expect(actions[1].type).toEqual(deleteUserAsync.fulfilled.type);
    expect(actions[1].payload).toEqual(1);
  });

  it("should handle updateUserAsync", async () => {
    const mockResponse = {
      data: { id: 2, name: "Updated User 2" },
    };

    services.updateUser = vi.fn(() => Promise.resolve(mockResponse));

    const initialState = {
      userDetails: {
        ...userDetailsSlice.initialState,
        userList: [
          { id: 1, name: "User 1" },
          { id: 2, name: "User 2" },
        ],
      },
    };
    const store = mockStore(initialState);

    await store.dispatch(
      updateUserAsync({ values: { name: "Updated User 2" }, id: 2 })
    );

    const actions = store.getActions();
    expect(actions[0].type).toEqual(updateUserAsync.pending.type);
    expect(actions[1].type).toEqual(updateUserAsync.fulfilled.type);
    expect(actions[1].payload).toEqual({
      ...cleanUpFirestoreResponse([mockResponse.data])[0],
      id: 2,
    });
  });

  // ... Add more tests for reducer cases if needed
});
