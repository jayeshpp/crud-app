import { setupStore, rootReducer } from "./"; // Update the path to your store file
import { describe, expect, it } from "vitest";
import { getUserDetailsAsync } from "../modules/user-details/userDetails.slice";

describe("Redux Store Setup", () => {
  it("should create a store with initial state", () => {
    const preloadedState = {
      userDetails: {
        userList: [
          { id: 1, name: "User 1" },
          { id: 2, name: "User 2" },
        ],
        fetchStatus: "succeeded",
      },
    };

    const store = setupStore(preloadedState);

    // Check if the store's initial state matches the preloaded state
    expect(store.getState()).toEqual(preloadedState);
  });

  it("should update the state when reducers are dispatched", () => {
    const store = setupStore();

    // Dispatch an action to update the state
    store.dispatch(
      getUserDetailsAsync.fulfilled([
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
      ])
    );

    // Check if the state is updated as expected
    expect(store.getState().userDetails.userList.length).toBe(2);
  });
});

describe("Root Reducer", () => {
  it("should combine reducers correctly", () => {
    const rootReducerKeys = Object.keys(rootReducer(undefined, { type: "TEST_ACTION" }));
    
    // Check if the combined reducer keys match the keys of your individual reducers
    expect(rootReducerKeys).toEqual(["userDetails"]);
  });
});
