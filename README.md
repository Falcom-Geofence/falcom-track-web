# Falcom Track Web Admin

This folder contains a simple Next.js application that serves as the admin dashboard for the Falcom geofencing attendance system.

## Cloning this repository

The source for this dashboard lives in a public GitHub repository.  To download it to your computer, run:

````bash
git clone https://github.com/Falcom-Geofence/falcom-track-web.git
```

This will create a `falcom-track-web` folder containing the Next.js project.

## Features

* **Login placeholder** — the home page displays username/password inputs and a login button.  No authentication logic is implemented in week 1.
* **Health check button** — a button fetches the `/health` endpoint from the backend API and displays the JSON result.
* **Environment configuration** — the dashboard reads the `NEXT_PUBLIC_API_URL` environment variable to determine where to send requests.  It defaults to `http://localhost:8000` when not set.

## Local development

To run the dashboard without Docker:

````bash
cd falcom-track-web
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.  The login placeholder should appear.  Click the “Check /health” button to verify the API, which must be running separately on port 8000.

## Running inside Docker

The dashboard is defined as the `web` service in the root `docker-compose.yml`.  When you run `docker-compose up --build` from the repository root it will:

1. Install dependencies and build the Next.js app.
2. Expose it on port 3000.
3. Use the `NEXT_PUBLIC_API_URL` environment variable so that the health check requests `http://api:8000/health` inside the Docker network.

## Future work

In upcoming weeks this dashboard will be extended to support authentication, management screens, maps for geofences and user attendance reporting.
