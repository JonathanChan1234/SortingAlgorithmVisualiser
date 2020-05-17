# Sorting Algorithm Visualiser

This project is a sorting algorithm visualizser based on React and TypeScript

Implemented 6 sorting algorithms (insertion, selection, bubble, quick, merge, heap)

This project is built using Create-Rect-App (CRA)

## Run the code

```bash
# Development
npm install
npm start
# Production
npm run build
```

## Demo

![demo-visualiser](https://github.com/JonathanChan1234/SortingAlgorithmVisualiser/blob/master/visualizer-demo.gif)

![demo-competition](https://github.com/JonathanChan1234/SortingAlgorithmVisualiser/blob/master/competition-demo.gif)

## Project Structure

    ├── src
    |   ├── components # UI Components
    |   ├── hook   # Debouncing and Throttling Hooks
    |   ├── sorting    # Implementation of the sorting visualisation
    |   ├── types  # TypeScript types
    |   ├── utils  # Utility functions
    |   └── App.tsx # App Wrapper
    |   └── index.tsx # Entry Point
    └──
    └── README.md
    └── demo.gif
    └── demo.png

## Known Issues

-   Current Implementation is to first finish sorting and store the immediate result into memory, which requires large amount of memory.
-   Re-rendering due to animation requires large amount of memory used (>500MB) and causes performance issue in low-end devices.

## Future Works

-   Using "callback-style" instead of storing result in memory for udpating UI (First issue)
-   Using HTML5 Canvas instead of React components for sorting models
