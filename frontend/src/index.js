import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CoverPage from './CoverPage.js';
import ContentPage from './ContentPage.js';

const route = createBrowserRouter([
    {
        path : '/',
        element : <CoverPage />,
    },

    {
        path : '/contentpage',
        element : <ContentPage />
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

    <React.StrictMode>
        <RouterProvider router = {route} />
    </React.StrictMode>
);
