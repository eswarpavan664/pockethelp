export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  isFirstLaunch: boolean;
  isLoading: boolean;
}

export interface RootState {
  auth: AuthState;
  app: AppState;
}

export type NavigationParamList = {
  Loading: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};
