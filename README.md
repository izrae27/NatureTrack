
# NatureTrack — Biodiversity Explorer

## Project Overview

NatureTrack is a client-side Single-Page Application (SPA) built with React. It uses the public iNaturalist REST API to help users discover and explore biodiversity observations, including plants, animals, fungi, and other organisms.

Users can search for species, filter observations by taxonomic category, sort results by observation date, browse paginated results, view individual observation details, and save their favorite observations.

The application stores saved favorites in the browser using LocalStorage, allowing them to remain available after the page is refreshed.

## External API

**iNaturalist API**

- Documentation: https://api.inaturalist.org/v1/docs/
- Base URL: https://api.inaturalist.org/v1

### API Endpoints Used

| Endpoint | Purpose |
|---|---|
| `/observations` | Retrieve biodiversity observations |
| `/taxa/autocomplete` | Search for species and taxa |
| `/observations/{id}` | Retrieve an individual observation |

The public API endpoints used by NatureTrack do not require an API key.

## Technologies Used

- React
- JavaScript
- Vite
- React Router
- HTML and CSS
- iNaturalist REST API
- Fetch API
- Browser LocalStorage
- Git and GitHub

## Main Features

1. **Species Search** — Search for species using their common or scientific names.
2. **Category Filtering** — Filter observations by taxonomic groups, including plants, birds, mammals, insects, amphibians, reptiles, and fungi.
3. **Observation Date Sorting** — Arrange observations by newest first or oldest first, based on their observation dates.
4. **Pagination** — Navigate through observation results using Previous and Next controls.
5. **Observation Details** — View information about an observation, including its species, location, observation date, and observer.
6. **Favorites** — Save and remove favorite observations.
7. **LocalStorage Persistence** — Keep saved favorites available after refreshing the browser.
8. **Loading and Error Handling** — Display loading indicators, error messages, retry controls, and empty-result messages.
9. **Photo Attribution** — Display available photo credits, license information, and links to original observations.

## Project Routes

| Route | Description |
|---|---|
| `/` | Homepage for discovering and searching observations |
| `/observation/:id` | Individual observation details |
| `/favorites` | Collection of saved observations |

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/izrae27/NatureTrack.git
```

Navigate to the project folder:

```bash
cd NatureTrack
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project's root directory.

Add the following configuration:

```env
VITE_INATURALIST_API_URL=https://api.inaturalist.org/v1
```

You can also use the committed `.env.example` file as a reference.

No API key is required for the public iNaturalist endpoints used by this application.

**Important:** Do not commit your personal `.env` file to GitHub.

### 4. Run the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### 5. Run ESLint

```bash
npm run lint
```

### 6. Build the Application

```bash
npm run build
```

## Project Structure

```text
NatureTrack/
├── public/
├── src/
│   ├── components/
│   │   ├── CategoryFilter.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── Header.jsx
│   │   ├── Loading.jsx
│   │   ├── ObservationCard.jsx
│   │   ├── ObservationGrid.jsx
│   │   ├── Pagination.jsx
│   │   ├── PhotoCredit.jsx
│   │   └── SearchBar.jsx
│   ├── context/
│   │   └── FavoritesContext.jsx
│   ├── pages/
│   │   ├── Favorites.jsx
│   │   ├── Home.jsx
│   │   └── ObservationDetails.jsx
│   ├── services/
│   │   └── inatApi.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## Team Contributions

### Member 1 — izrae27

- iNaturalist API integration.
- Homepage and observation discovery.
- Species search functionality.
- Taxonomic category filtering.
- Pagination.
- Observation date sorting.

### Member 2 — ysrae27

- Observation details page.
- Favorites page.
- LocalStorage persistence.
- Favorites management.
- Details and favorites empty states and error handling.

### Shared Responsibilities

- User interface design and styling.
- Testing and debugging.
- Code reviews and Pull Requests.
- README documentation.
- Project presentation.

Both members are expected to understand the overall application and its implementation.

## Git and GitHub Collaboration

The project is maintained in a public GitHub repository:

https://github.com/izrae27/NatureTrack

The team follows these collaboration practices:

- Work on dedicated feature branches.
- Avoid committing directly to the `main` branch.
- Submit completed work through Pull Requests.
- Review changes before merging.
- Use descriptive Conventional Commit messages.

### Conventional Commit Examples

```text
feat: add observation search
fix: correct favorites storage
style: improve observation cards
docs: update project README
```

## Testing Checklist

The following checks can be performed before the final project demonstration:

- [ ] Homepage loads biodiversity observations.
- [ ] Species search returns relevant observations.
- [ ] Category filtering displays the selected taxonomic group.
- [ ] Newest First and Oldest First sorting work.
- [ ] Pagination navigates between result pages.
- [ ] Observation cards open their corresponding details pages.
- [ ] Favorites can be added and removed.
- [ ] Favorites remain saved after refreshing the page.
- [ ] Loading indicators appear while data is being retrieved.
- [ ] Error messages and retry controls work when requests fail.
- [ ] Empty states appear when no matching results are available.
- [ ] Photo attribution is displayed when information is available.
- [ ] All application routes work correctly.

## Project Purpose

NatureTrack aims to make biodiversity information easier to discover and explore through an interactive and user-friendly web application powered by the iNaturalist API.
