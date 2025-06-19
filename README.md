# Brake Bias - Car Review Aggregator

Brake Bias is a Next.js web application designed to be your definitive source for aggregated car reviews. Instead of scouring countless forums and watching hours of reviews, Brake Bias does the hard work for you. It fetches data from professional review sites, analyzes owner sentiment from public forums like Reddit, and uses generative AI to provide a comprehensive, all-in-one summary for any vehicle you search.

Stop Guessing. Start Driving.

## Features

-   **AI-Powered Summaries**: Utilizes Google's Gemini AI to generate detailed JSON reports on vehicles.
-   **Reddit Sentiment Analysis**: Fetches and summarizes real-world owner opinions from Reddit.
-   **Dynamic Search**: Find any vehicle using a multi-step search form for year, make, and model.
-   **Themeable UI**: Includes a light and dark mode for comfortable viewing.
-   **Component-Based Architecture**: Built with React and Next.js for a modern, maintainable codebase.

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

-   Node.js (v18.17 or later)
-   npm, yarn, or pnpm

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/brake-bias-app.git](https://github.com/your-username/brake-bias-app.git)
    cd brake-bias-app
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of the project and add your API keys. You can get these from their respective platforms.
    ```env
    # .env.local

    # Google AI (for Gemini Pro)
    GEMINI_API_KEY="YOUR_GOOGLE_AI_API_KEY"

    # OpenAI (Optional, for the secondary AI endpoint)
    OPENAI_API_KEY="YOUR_OPENAI_API_KEY"

    # Reddit API (Optional, for fetching forum data)
    # Note: Using the Reddit API effectively requires OAuth2 setup.
    REDDIT_CLIENT_ID="YOUR_REDDIT_CLIENT_ID"
    REDDIT_CLIENT_SECRET="YOUR_REDDIT_CLIENT_SECRET"
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts a production server.
-   `npm run lint`: Runs the Next.js linter.