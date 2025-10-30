# JSON Tree Visualizer Frontend App
This repository contains details about the project overview, features, technologies used, and Application Architecture.

## Project Overview
 - This application aims for transforming the JSON data provided by the user input and convert and visualize this data in a Tree.


## Features
 - Provides a JSON input field for collecting user JSON data.
 - Implements JSON input validation to ensure proper format.
 - Allows users to generate a tree visualization of their JSON data in a hierarchical format.
 - Includes a Reset button to clear both the input field and the visualized tree.
 - Enables searching for JSON nodes using a path format (e.g., `root.user.address`).
 - Highlights the found node and automatically pans to its position when searched.
 - Provides an option to download the generated tree as a PNG image.
 - Supports Light and Dark theme toggling.
 - Fully responsive across multiple devices (desktop, tablet, and mobile).
 - Allows copying the full path of a node by clicking on it.
 - Displays node information such as path and value when hovering over any node.
 - Categorizes node types (object, array, primitive) by different background colors.
 - Includes Zoom In and Zoom Out functionality for better tree navigation.

 ## Technologies Used
 - **React** – Frontend library for building the UI.
 - **TailwindCSS** – Utility-first CSS framework for styling.
 - **React Flow** – Library used to visualize the JSON data as a tree.
 - **Redux** – For managing the global application state.
 - **React Context API** – For handling the application's Light/Dark theme.
 - **Sonner** – For success and error toast notifications.
 - **React Icons** – For consistent icon usage across the application.
 - **html-to-image** – For exporting the visualized tree as a PNG image.
 - **React Router DOM** – For handling application routing.

## Application Architecture
The application architecture and codebase are organized into components, common components, constants, contexts, layout, utils, and helper functions.
 
 - **components/** – Contains all the UI components of the application.
 - **common/** – Includes reusable UI elements such as buttons and alerts.
 - **constants/** – Stores hardcoded constants (e.g., placeholder text for JSON input).
 - **contexts/** – Contains React Context logic for controlling the UI theme.
 - **utils/** – Includes Redux store configuration and slice logic for managing state (e.g., JSON data storage for visualization).
 - **utils/helperFunctions/** – Contains reusable utility functions used across the application, implementing modular design and following the DRY principle. This includes recursive algorithms for converting JSON data into a React Flow tree.
 