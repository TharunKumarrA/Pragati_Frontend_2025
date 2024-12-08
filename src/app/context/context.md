# Context Directory

The `context` directory contains React Context providers and related hooks used for state management across the app.

## Purpose
- Provide a way to manage and share state across multiple components without prop drilling.
- Centralize data that needs to be accessed globally within the app.

## Usage
- Create context files and export the provider and any hooks needed for state access.
- Wrap your app in the context provider at a high level (e.g., in `layout.js`) to enable access to the context in all components.
