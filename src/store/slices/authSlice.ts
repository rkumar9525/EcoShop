import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';
import { authService } from '../../api/authService';
import { storage, STORAGE_KEYS } from '../../utils/storage';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true, // true to prevent auth stack flash on app start
  error: null,
};

// --- Async Thunks ---

export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const data = await authService.login(credentials);
      const token = data.token;

      const user: User = {
        id: 1,
        username: credentials.username,
        email: `${credentials.username}@ecoshop.com`,
        token,
      };

      await storage.save(STORAGE_KEYS.AUTH_TOKEN, token);
      await storage.save(STORAGE_KEYS.USER_DATA, user);

      return { user, token };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Login failed';
      return rejectWithValue(message);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    userData: { email: string; username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const user = await authService.register(userData);
      return user;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Registration failed';
      return rejectWithValue(message);
    }
  },
);

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    try {
      const token = await storage.load<string>(STORAGE_KEYS.AUTH_TOKEN);
      const user = await storage.load<User>(STORAGE_KEYS.USER_DATA);

      if (token && user) {
        return { user, token };
      }
      return null;
    } catch (error) {
      return rejectWithValue('Failed to restore session');
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await storage.remove(STORAGE_KEYS.AUTH_TOKEN);
  await storage.remove(STORAGE_KEYS.USER_DATA);
});

// --- Slice ---

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Restore Session
    builder
      .addCase(restoreSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      })
      .addCase(restoreSession.rejected, (state) => {
        state.isLoading = false;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        // Force reset even if storage clear fails
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;