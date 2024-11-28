import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CoverPage from './CoverPage.js';
import ContentPage from './ContentPage.js';
import HomePage from './HomePage.js';
import Documentation from './Documentation.js';

const route = createBrowserRouter([
    {
        path : '/',
        element : <CoverPage />,
    },

    {
        path : '/contentpage',
        element : <ContentPage />
    },

    {
        path : '/home',
        element : <HomePage />
    },

    {
        path : 'read',
        element : <Documentation />
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

    <React.StrictMode>
        <RouterProvider router = {route} />
    </React.StrictMode>
);
