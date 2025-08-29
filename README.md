# Metal Price 
Metal Price Tracker – A React to view live prices of Gold, Silver, Platinum, and Palladium with search functionality. Uses MetalPriceAPI and environment variables to securely manage API keys


---

## Features

* View live prices of metals: Gold, Silver, Platinum, Palladium.
* Search metals by **name** (e.g., Gold, Silver) for detailed information.
* Display includes:

  * Current price
  * Base currency
  * Last updated time
* Responsive and visually appealing UI with metal cards and search results.
* Built with modern **React** and **Vite**.
* Environment variables used to protect API keys.

---

## Tech Stack

* **Frontend:** React, Vite
* **Styling:** CSS (inline styles)
* **Routing:** React Router
* **API:** [Metal Price API](https://metalpriceapi.com/)
* **Deployment:** Netlify / Vercel / any static hosting

---


## Getting Started

### Prerequisites

* Node.js >= 18
* npm or yarn
* Metal Price API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/bsandeepreddy27/metal-price.git
cd metal-price
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root:

```
VITE_METAL_API_KEY=your_api_key_here
VITE_BASE_CURRENCY=INR
```

> **Note:** Do **not** commit `.env` to GitHub.

---

## Running Locally

```bash
npm run dev
```

* Open in browser: `http://localhost:5173/`
Vite will automatically assign an available port. If 5173 is occupied, it might use http://localhost:5170/ or another free port.
You can also change the port manually by running:
```bash
npm run dev -- --port 3000
```
Replace 3000 with any port number you prefer.

---

## Building for Production

```bash
npm run build
```

* This generates the `dist` folder which can be deployed to **Netlify**, **Vercel**, or any static hosting.

---

## Deploying to Netlify

1. Sign in to [Netlify](https://www.netlify.com/) and create a new site from Git.
2. Connect your repository.
3. Set build command and publish directory:

```
Build command: npm run build
Publish directory: dist
```

4. Add environment variables in Netlify dashboard:

```
VITE_METAL_API_KEY=your_api_key_here
VITE_BASE_CURRENCY=INR
```

5. Deploy the site. Live URL will be provided by Netlify.

---

## Folder Structure

```
metal-price/
├─ src/
│  ├─ assets/           # Images for metals
│     ├─ gold.png
│     ├─ silver.png
│     ├─ platinum.png
│     └─ palladium.png
│  ├─ hooks/            # Custom hooks (if any)
│  │  └─ useMetalPrices.js
│  ├─ pages/            # App pages
│  │  ├─ Home.jsx
│  │  └─ MetalPage.jsx
│  ├─ App.jsx
│  └─ main.jsx           # App entry point
├─ .env                  # API keys (local only)
├─ index.html
├─ .gitignore
├─ package.json
└─ README.md

```

---

## Contribution

1. Fork the repository
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

---


