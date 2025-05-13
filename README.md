# ApriloBot Common

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and integrates with the [Ollama](https://ollama.com/) server using the **LLaMA 3.2 LLM model**. It provides a plugin-style chat interface that can be easily embedded into any website using the generated JS and CSS build files.

---

## 🚀 Getting Started

### Step 1: Install and Set Up Ollama

1. Download and install **Ollama** from the [official website](https://ollama.com/).
2. Open your terminal and pull the Aprilo model:

   ```bash
   ollama pull aprilo:latest
   ```
3. Start the Ollama server:

   ```bash
   ollama serve
   ```

This will run a local server that this React plugin can communicate with to process chat requests via the LLaMA 3.2 model.

---

### Step 2: Use This Plugin in Your Website

1. Run the following command to generate the production build:

   ```bash
   npm run build
   ```

2. Copy the generated `build/static/js/*.js` and `build/static/css/*.css` files to a common place in your website.

3. Include them in your HTML:

   ```html
   <link rel="stylesheet" href="path-to-your-css-file.css" />
   <script src="path-to-your-js-file.js" defer></script>
   ```

This will initialize the ApriloBot interface on your website.

---

## 💠 Modify the Plugin

Since this is a [React](https://reactjs.org/) app, you can easily customize it to your needs:

1. Clone the repo:

   ```bash
   git clone https://github.com/cstp55/apriloBot-common.git
   cd apriloBot-common
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development mode:

   ```bash
   npm start
   ```

4. Modify components and logic as needed.

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode on [http://localhost:3000](http://localhost:3000).

### `npm run build`

Builds the app for production and outputs to the `build/` folder.

### `npm test`

Launches the test runner in watch mode.

### `npm run eject`

**Note:** This is a one-way operation. Use only if you need full control of the config.

---

## 📚 Learn More

* [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
* [Ollama Documentation](https://ollama.com/)
* [LLaMA 3.2 Model Details](https://ollama.com/library/aprilo)

---

Let me know if you'd like a **minimal integration example** (HTML snippet with embedded ApriloBot) or instructions for **Dockerizing** the Ollama + React setup.
