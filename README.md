API Project: Jokes for workers
This project is an interactive web application that uses multiple APIs to display jokes and the weather in Barcelona. Users can check the weather before starting their workday and enjoy a couple of randomly selected jokes, which they can rate to measure the overall mood.

## Introduction
The app is designed for workers who want to start the day with a smile and check the weather in Barcelona. Three APIs are used to fetch the data:

- [icanhazdadjoke](https://icanhazdadjoke.com/) for dad jokes.
- [Chuck Norris Jokes](https://api.chucknorris.io/jokes/random) for Chuck Norris jokes.
- [Wttr.in](https://wttr.in/Barcelona?format=j1) to display real-time weather in Barcelona.
Users can rate the jokes, allowing the app to track workers' mood based on the scores given.

## Requirements
Before starting, ensure you have the following tools installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Sass** (to compile .scss files)
- **TypeScript** (to compile .ts files)
- A modern web browser (Google Chrome, Firefox, etc.)

## Installation
Follow these steps to install and run the project locally:

### 1. Clone the repository
Clone the repository to your local machine using Git:

```bash
 git clone https://github.com/Naomigarcia99/API.git
```
This command downloads the project repository from GitHub to your local machine.

### 2. Navigate into the project directory
After cloning, navigate into the project directory:

```bash
 cd API
```

This command changes your working directory to the project folder.

### 3. Install the dependencies

Install the required dependencies, including TypeScript and Sass:

```bash
 npm install
```
This command installs all necessary packages listed in package.json.

### 4. Install TypeScript

If TypeScript is not listed as a dependency in your package.json, you can install it globally or as a development dependency:

```bash
 npm install typescript --save-dev
```

### 5. Compile TypeScript

Compile the TypeScript files to JavaScript:

```bash
 npx tsc
```

Alternatively, you can use npx tsc --watch to automatically recompile TypeScript files when changes are made.

### 6. Compile Sass

If you have .scss files, compile them to .css:

```bash
 npx sass src/styles.scss dist/styles.css
```

Adjust the command according to your project structure.

### 7. Run the project

Open the index.html file in your web browser to see the app in action.
