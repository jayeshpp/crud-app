import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userDetailsReducer from 'modules/user-details/userDetails.slice';
import { IS_PRODUCTION_ENV } from 'constants/app';

// Create the root reducer separately so we can extract the RootState type
export const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
})

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: !IS_PRODUCTION_ENV, // Enable in non-production environments
  })
}
