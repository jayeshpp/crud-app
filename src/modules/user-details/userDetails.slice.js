import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { services } from "services";
import { cleanUpFirestoreResponse } from "services/helpers"

const initialState = {
    userList: [],
    fetchStatus: "idle",
    fetchByIdStatus: "idle",
    deleteStatus: "idle",
    createStatus: "idle",
    updateStatus: "idle",
    error: null,
    userToEdit: null
};

export const getUserDetailsAsync = createAsyncThunk(
    "userList/getUserDetails",
    async (_, { rejectWithValue }) => {
        try {
            const response = await services.getUserDetails();
            return  cleanUpFirestoreResponse(response?.data?.documents)
        } catch (error) {
            return rejectWithValue({ error: true, message: error.message })
        }
    }
);

export const getUserDetailsByIdAsync = createAsyncThunk(
    "userList/getUserDetailsById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await services.getUserDetailsById(id);
            if (response?.error) {
                toast.error(response.message)
                return []
            } else {
                return cleanUpFirestoreResponse([response?.data])
            }
        } catch (error) {
            return rejectWithValue({ error: true, message: error.message })
        }
    }
);

export const addUserAsync = createAsyncThunk(
    "userList/addUser",
    async (payload) => {
        try {
            const response = await services.addUser(payload);
            return cleanUpFirestoreResponse([response?.data])
        } catch (error) {
            return { error: true, message: error.message }
        }
    }
);

export const deleteUserAsync = createAsyncThunk(
    "userList/deleteUser",
    async (id) => {
        try {
            await services.deleteUser(id);
            return id
        } catch (error) {
            return { error: true, message: error.message }
        }
    }
);

export const updateUserAsync = createAsyncThunk(
    "userList/updateUser",
    async ({values, id}) => {
        try {
            const response = await services.updateUser(values, id);
            return {...cleanUpFirestoreResponse([response?.data])[0], id}
        } catch (error) {
            return { error: true, message: error.message }
        }
    }
);

export const userDetailsSlice = createSlice({
    name: "userList",
    initialState,
    reducers: {
        updateUserToEdit: (state, payload) => {
            state.userToEdit = payload.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserDetailsAsync.pending, (state) => {
                state.fetchStatus = "loading";
            })
            .addCase(getUserDetailsAsync.fulfilled, (state, action) => {
                state.fetchStatus = "succeeded";
                state.userList = action.payload
            })
            .addCase(getUserDetailsAsync.rejected, (state, action) => {
                state.fetchStatus = "failed";
                state.error = action.payload
            })
            .addCase(getUserDetailsByIdAsync.pending, (state) => {
                state.fetchByIdStatus = "loading";
            })
            .addCase(getUserDetailsByIdAsync.fulfilled, (state, action) => {
                state.fetchByIdStatus = "succeeded";
                state.userToEdit = action.payload[0]
            })
            .addCase(getUserDetailsByIdAsync.rejected, (state) => {
                state.fetchByIdStatus = "failed";
            })
            .addCase(addUserAsync.pending, (state) => {
                state.createStatus = "loading";
            })
            .addCase(addUserAsync.fulfilled, (state, action) => {
                state.createStatus = "succeeded";
                state.userList.push(action.payload)
            })
            .addCase(addUserAsync.rejected, (state) => {
                state.createStatus = "failed";
            })
            .addCase(deleteUserAsync.pending, (state) => {
                state.deleteStatus = "loading";
            })
            .addCase(deleteUserAsync.fulfilled, (state, action) => {
                state.deleteStatus = "succeeded";
                state.userList = state.userList.filter((user) => user.id !== action.payload);

                // Show a toast notification on successful user deletion
                toast.success('User deleted successfully');
            })
            .addCase(deleteUserAsync.rejected, (state) => {
                state.deleteStatus = "failed";
            })
            .addCase(updateUserAsync.pending, (state) => {
                state.updateStatus = "loading";
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.updateStatus = "succeeded";
                console.log(state.userList, action.payload, '===rexu');
                // Find the index of the updated user in the state
                const updatedIndex = state.userList.findIndex(
                    (user) => user.id === action.payload.id
                );

                if (updatedIndex !== -1) {
                    // Update the user in the state
                    state.userList[updatedIndex] = {
                        ...state.userList[updatedIndex],
                        ...action.payload,
                    };
                }
            })
            .addCase(updateUserAsync.rejected, (state) => {
                state.updateStatus = "failed";
            })
    },
});

//actions
export const { updateUserToEdit } = userDetailsSlice.actions

//selectors
export const getUserList = (state) => state.userDetails.userList;
export const getUserListStatus = (state) => state.userDetails.fetchStatus;
export const getFetchByIdStatus = (state) => state.userDetails.fetchByIdStatus;
export const createUserStatus = (state) => state.userDetails.createStatus;
export const userToEdit = (state) => state.userDetails.userToEdit;

export default userDetailsSlice.reducer;
