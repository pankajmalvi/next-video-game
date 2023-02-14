const options: RequestInit = {
  method: "GET",
};

var currentGamesUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/games?key=${process.env.NEXT_PUBLIC_API_KEY}`;

export const fetchGames = async () => {
  currentGamesUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/games?key=${process.env.NEXT_PUBLIC_API_KEY}`;
  return await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/games?key=${process.env.NEXT_PUBLIC_API_KEY}`,
  ).then((response) => response.json());
};
export const fetchGamesByPage = async (pageNumber: number) => {
  currentGamesUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/games?key=${process.env.NEXT_PUBLIC_API_KEY}&page=${pageNumber}`;
  return await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/games?key=${process.env.NEXT_PUBLIC_API_KEY}&page=${pageNumber}`,
  ).then((response) => response.json());
};

export const fetchGamesBySearch = async (searchTerm: string) => {
  currentGamesUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/games?key=${process.env.NEXT_PUBLIC_API_KEY}&search=${searchTerm}`;
  return await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/games?key=${process.env.NEXT_PUBLIC_API_KEY}&search=${searchTerm}`,
  ).then((response) => response.json());
};

export const sortAndFetchGamesBy = async (sortBy: string) => {
  return await fetch(`${currentGamesUrl}&ordering=${sortBy}`, options).then(
    (response) => response.json(),
  );
};

export const fetchGameById = async (id: string) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/games/${id}?key=${process.env.NEXT_PUBLIC_API_KEY}`,
    options,
  ).then((response) => response.json());
};

export const fetchGameScreenshotsById = async (id: string) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/games/${id}/screenshots?key=${process.env.NEXT_PUBLIC_API_KEY}`,
    options,
  ).then((response) => response.json());
};

export const fetchGameTrailersById = async (id: string) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/games/${id}/movies?key=${process.env.NEXT_PUBLIC_API_KEY}`,
    options,
  ).then((response) => response.json());
};

// https://api.rawg.io/api/games?key=2835443a3d3148cb8fcc5f1845c43843&metacritic=80,100
