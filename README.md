# NatureTrack — Biodiversity Explorer

## Project Overview

NatureTrack is a client-side React web application that uses the iNaturalist API to help users explore biodiversity around the world. Users can discover wildlife and plants, search for observations, filter by taxonomic groups, browse results through pagination, view observation details, and save favorite observations.

The application is built with React and Vite. It retrieves publicly available observation data from iNaturalist and stores favorite observations in the browser using LocalStorage.

## External API

- **API:** [iNaturalist API](https://api.inaturalist.org/v1/docs/)
- **API Base URL:** `https://api.inaturalist.org/v1`
- **Observation search:** `/observations`
- **Observation details:** `/observations/{id}`
- **Taxon search:** `/taxa/autocomplete`

The public API endpoints used by this project do not require an API key.

## Technologies

- React
- Vite
- JavaScript
- React Router
- CSS
- iNaturalist REST API
- Browser LocalStorage
- Git and GitHub

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/izrae27/NatureTrack.git
cd NatureTrack
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project's root directory:

```env
VITE_INATURALIST_API_URL=https://api.inaturalist.org/v1
```

The application uses this variable to configure the iNaturalist API base URL. No API key is required for the public endpoints used in this project.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### 5. Build the application

```bash
npm run build
```

## Main Features

- Search for species and biodiversity observations.
- Filter observations by taxonomic group.
- Browse observation results using pagination.
- View individual observation details.
- Save and manage favorite observations.
- Display loading, error, and empty-result states.

## Project Routes

| Route | Description |
|---|---|
| `/` | Discover and search observations |
| `/observation/:id` | View observation details |
| `/favorites` | View saved observations |

## Team Contributions

**Member 1 — izrae27**
- iNaturalist API integration.
- Homepage and observation discovery.
- Search functionality.
- Taxonomic category filtering.
- Pagination.

**Member 2 — ysrae27**
- Observation details page.
- Favorites page.
- LocalStorage and favorites management.
- Details and favorites error and empty states.

**Shared Responsibilities**
- Interface design and styling.
- Testing and debugging.
- Code reviews and pull requests.
- Documentation and final presentation.

Both members should review and understand the overall application, not only their assigned features.

## Git Collaboration Guidelines

- Work on dedicated feature branches.
- Do not commit directly to `main`.
- Use Pull Requests to merge completed work into `main`.
- Follow Conventional Commit message formats, such as:
  - `feat: add observation search`
  - `fix: correct favorites storage`
  - `style: improve observation cards`
  - `docs: update project README`

## Project Purpose

NatureTrack aims to make biodiversity information easier to discover and explore through a simple, interactive, and user-friendly web application.