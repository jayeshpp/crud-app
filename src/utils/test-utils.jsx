import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from 'store'

// Create a custom render function that wraps components in Redux Provider and BrowserRouter
function render(
  ui,
  {
    initialState,
    store = configureStore({ reducer: rootReducer, preloadedState: initialState }), // Use configureStore
    route = '/',
    ...options
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter initialEntries={[route]}>{children}</BrowserRouter>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react'; // Export everything from @testing-library/react
export { render }; // Export the custom render function
