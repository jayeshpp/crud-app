#!/bin/bash

# Build the React app using Vite
npm run build

# Copy the _redirects file to the dist folder
cp _redirects dist/
