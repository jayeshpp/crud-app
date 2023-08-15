import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { setupStore } from 'store'
import AppRoutes from 'routes';
import 'styles/main.scss'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const store = setupStore()

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Provider store={store}>
        <AppRoutes />
        <ToastContainer />
      </Provider>
    </BrowserRouter>,
)
