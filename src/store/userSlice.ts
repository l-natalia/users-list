import { User } from "@/utils/interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ApiState {
  users: User[];
  isLoading: boolean;
  error: boolean;
  currentUser: User | null;
  showModal: boolean;
  modalData: any;
}

const initialState: ApiState = {
  users: [],
  isLoading: false,
  error: false,
  currentUser: null,
  showModal: false,
  modalData: null,
};

export const fetchUsers = createAsyncThunk("users", async () => {
  try {
    const response = await axios.get("/api/users");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users.");
  }
});

export const fetchUser = createAsyncThunk("user", async (userId: string) => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    openModal(state, action) {
      state.showModal = true;
      state.modalData = action.payload;
    },
    closeModal(state) {
      state.showModal = false;
    },
    clearCurrentUser(state) {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export const { openModal, closeModal, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
