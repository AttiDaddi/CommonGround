// Smart recommendation engine that finds common ground between two people's preferences

// Database of movies with metadata for smart matching
const MOVIE_DATABASE = [
  {
    title: "Fight Club",
    year: 1999,
    genres: ["Drama", "Thriller", "Action"],
    keywords: ["psychological", "twist-ending", "violence", "identity", "mind-bending"],
    actors: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
    director: "David Fincher",
    description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club."
  },
  {
    title: "Inception",
    year: 2010,
    genres: ["Science Fiction", "Action", "Thriller"],
    keywords: ["dreams", "mind-bending", "heist", "psychological", "twist-ending"],
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy"],
    director: "Christopher Nolan",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea."
  },
  {
    title: "The Matrix",
    year: 1999,
    genres: ["Science Fiction", "Action"],
    keywords: ["virtual reality", "martial arts", "mind-bending", "philosophy", "chosen one"],
    actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    director: "The Wachowskis",
    description: "A computer hacker learns about the true nature of reality and his role in the war against its controllers."
  },
  {
    title: "Interstellar",
    year: 2014,
    genres: ["Science Fiction", "Drama", "Adventure"],
    keywords: ["space", "time", "family", "emotional", "mind-bending", "epic"],
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    director: "Christopher Nolan",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    title: "Parasite",
    year: 2019,
    genres: ["Thriller", "Drama", "Comedy"],
    keywords: ["class", "social commentary", "twist-ending", "dark humor", "psychological"],
    actors: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    director: "Bong Joon-ho",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between a wealthy family and a destitute clan."
  },
  {
    title: "The Shawshank Redemption",
    year: 1994,
    genres: ["Drama"],
    keywords: ["prison", "hope", "friendship", "redemption", "emotional"],
    actors: ["Tim Robbins", "Morgan Freeman"],
    director: "Frank Darabont",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption."
  },
  {
    title: "Pulp Fiction",
    year: 1994,
    genres: ["Crime", "Drama", "Comedy"],
    keywords: ["nonlinear", "violence", "dialogue", "dark humor", "cult classic"],
    actors: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    director: "Quentin Tarantino",
    description: "The lives of two mob hitmen, a boxer, and others intertwine in four tales of violence and redemption."
  },
  {
    title: "The Dark Knight",
    year: 2008,
    genres: ["Action", "Crime", "Drama", "Thriller"],
    keywords: ["superhero", "villain", "psychological", "dark", "moral dilemma"],
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    director: "Christopher Nolan",
    description: "Batman must accept one of the greatest psychological and physical tests to fight injustice."
  },
  {
    title: "Spirited Away",
    year: 2001,
    genres: ["Animation", "Fantasy", "Family", "Adventure"],
    keywords: ["magical", "coming of age", "spirits", "beautiful", "emotional"],
    actors: [],
    director: "Hayao Miyazaki",
    description: "A young girl becomes trapped in a strange new world of spirits and must find a way to free herself and her parents."
  },
  {
    title: "Get Out",
    year: 2017,
    genres: ["Horror", "Thriller", "Mystery"],
    keywords: ["psychological", "social commentary", "twist-ending", "suspense"],
    actors: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford"],
    director: "Jordan Peele",
    description: "A young African-American visits his white girlfriend's parents, uncovering a disturbing secret."
  },
  {
    title: "Mad Max: Fury Road",
    year: 2015,
    genres: ["Action", "Adventure", "Science Fiction"],
    keywords: ["post-apocalyptic", "chase", "feminist", "visual spectacle", "practical effects"],
    actors: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"],
    director: "George Miller",
    description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler with the help of a drifter."
  },
  {
    title: "Everything Everywhere All at Once",
    year: 2022,
    genres: ["Science Fiction", "Action", "Comedy", "Adventure"],
    keywords: ["multiverse", "family", "absurd", "emotional", "mind-bending", "martial arts"],
    actors: ["Michelle Yeoh", "Stephanie Hsu", "Ke Huy Quan"],
    director: "Daniels",
    description: "An aging Chinese immigrant must connect with parallel universe versions of herself to prevent destruction."
  },
  {
    title: "John Wick",
    year: 2014,
    genres: ["Action", "Thriller", "Crime"],
    keywords: ["revenge", "martial arts", "stylish", "violence", "assassin"],
    actors: ["Keanu Reeves", "Michael Nyqvist", "Alfie Allen"],
    director: "Chad Stahelski",
    description: "An ex-hitman comes out of retirement to track down the gangsters who killed his dog."
  },
  {
    title: "La La Land",
    year: 2016,
    genres: ["Romance", "Drama", "Music", "Comedy"],
    keywords: ["musical", "dreams", "love", "jazz", "bittersweet", "beautiful"],
    actors: ["Ryan Gosling", "Emma Stone"],
    director: "Damien Chazelle",
    description: "A jazz musician and an aspiring actress fall in love while pursuing their dreams in Los Angeles."
  },
  {
    title: "The Grand Budapest Hotel",
    year: 2014,
    genres: ["Comedy", "Drama", "Adventure"],
    keywords: ["quirky", "visual style", "murder mystery", "whimsical", "ensemble"],
    actors: ["Ralph Fiennes", "Tony Revolori", "Saoirse Ronan"],
    director: "Wes Anderson",
    description: "A legendary concierge and his protégé become entangled in a murder case at a famous hotel."
  },
  {
    title: "Knives Out",
    year: 2019,
    genres: ["Mystery", "Comedy", "Crime", "Thriller"],
    keywords: ["whodunit", "twist-ending", "ensemble", "clever", "dark humor"],
    actors: ["Daniel Craig", "Ana de Armas", "Chris Evans"],
    director: "Rian Johnson",
    description: "A detective investigates the death of a patriarch of an eccentric, combative family."
  },
  {
    title: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    genres: ["Animation", "Action", "Adventure", "Science Fiction"],
    keywords: ["superhero", "multiverse", "coming of age", "visual style", "family"],
    actors: [],
    director: "Peter Ramsey",
    description: "Teen Miles Morales becomes Spider-Man and must join others from different dimensions to save all realities."
  },
  {
    title: "Whiplash",
    year: 2014,
    genres: ["Drama", "Music"],
    keywords: ["intense", "jazz", "obsession", "psychological", "mentor"],
    actors: ["Miles Teller", "J.K. Simmons"],
    director: "Damien Chazelle",
    description: "A young drummer enrolls at a music conservatory where his teacher pushes students beyond their limits."
  },
  {
    title: "Dune",
    year: 2021,
    genres: ["Science Fiction", "Adventure", "Drama"],
    keywords: ["epic", "space", "political", "visual spectacle", "chosen one"],
    actors: ["Timothée Chalamet", "Rebecca Ferguson", "Zendaya", "Oscar Isaac"],
    director: "Denis Villeneuve",
    description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable resource."
  },
  {
    title: "The Social Network",
    year: 2010,
    genres: ["Drama", "History"],
    keywords: ["technology", "betrayal", "ambition", "dialogue", "fast-paced"],
    actors: ["Jesse Eisenberg", "Andrew Garfield", "Justin Timberlake"],
    director: "David Fincher",
    description: "The story of the founding of Facebook and the resulting lawsuits."
  }
];

// YouTube channel recommendations based on content type
const YOUTUBE_RECOMMENDATIONS = [
  { name: "Kurzgesagt", type: "educational", topics: ["science", "philosophy", "space"] },
  { name: "Veritasium", type: "educational", topics: ["science", "physics", "experiments"] },
  { name: "Corridor Crew", type: "entertainment", topics: ["vfx", "movies", "stunts"] },
  { name: "Red Letter Media", type: "entertainment", topics: ["movies", "reviews", "comedy"] },
  { name: "Every Frame a Painting", type: "educational", topics: ["film", "cinematography", "analysis"] },
  { name: "Nerdwriter1", type: "educational", topics: ["film", "art", "analysis"] },
  { name: "penguinz0", type: "entertainment", topics: ["gaming", "comedy", "reviews"] },
  { name: "Linus Tech Tips", type: "tech", topics: ["technology", "computers", "reviews"] }
];

function normalizeString(str) {
  return str.toLowerCase().trim();
}

function findDirectOverlaps(person1, person2) {
  const overlaps = {
    movies: [],
    actors: [],
    directors: [],
    genres: [],
    youtubers: [],
    streamers: [],
    musicians: []
  };

  // Check each category for direct matches
  const categories = ['movies', 'actors', 'directors', 'genres', 'youtubers', 'streamers', 'musicians'];

  categories.forEach(category => {
    const set1 = new Set(person1[category].map(normalizeString));
    person2[category].forEach(item => {
      if (set1.has(normalizeString(item))) {
        overlaps[category].push(item);
      }
    });
  });

  return overlaps;
}

function getGenreKeywords(genres) {
  const genreKeywords = {
    'action': ['action', 'fighting', 'martial arts', 'chase', 'violence'],
    'thriller': ['suspense', 'psychological', 'tension', 'twist-ending'],
    'science fiction': ['sci-fi', 'space', 'future', 'technology', 'mind-bending'],
    'comedy': ['funny', 'humor', 'dark humor', 'quirky'],
    'drama': ['emotional', 'character', 'relationships'],
    'horror': ['scary', 'suspense', 'psychological'],
    'romance': ['love', 'relationships', 'emotional'],
    'animation': ['animated', 'visual', 'family'],
    'adventure': ['epic', 'journey', 'quest'],
    'mystery': ['whodunit', 'investigation', 'twist-ending'],
    'crime': ['heist', 'gangster', 'violence'],
    'fantasy': ['magical', 'supernatural', 'epic']
  };

  const keywords = new Set();
  genres.forEach(genre => {
    const g = normalizeString(genre);
    if (genreKeywords[g]) {
      genreKeywords[g].forEach(kw => keywords.add(kw));
    }
  });
  return keywords;
}

function scoreMovie(movie, person1, person2) {
  let score = 0;
  let reasons = [];

  const allGenres1 = new Set(person1.genres.map(normalizeString));
  const allGenres2 = new Set(person2.genres.map(normalizeString));

  // Check genre matches
  movie.genres.forEach(genre => {
    const g = normalizeString(genre);
    if (allGenres1.has(g)) {
      score += 2;
      reasons.push({ person: person1.name, reason: `loves ${genre}` });
    }
    if (allGenres2.has(g)) {
      score += 2;
      reasons.push({ person: person2.name, reason: `loves ${genre}` });
    }
  });

  // Check actor matches
  const allActors1 = new Set(person1.actors.map(normalizeString));
  const allActors2 = new Set(person2.actors.map(normalizeString));

  movie.actors.forEach(actor => {
    const a = normalizeString(actor);
    if (allActors1.has(a)) {
      score += 3;
      reasons.push({ person: person1.name, reason: `loves ${actor}` });
    }
    if (allActors2.has(a)) {
      score += 3;
      reasons.push({ person: person2.name, reason: `loves ${actor}` });
    }
  });

  // Check director matches
  const allDirectors1 = new Set(person1.directors.map(normalizeString));
  const allDirectors2 = new Set(person2.directors.map(normalizeString));

  if (allDirectors1.has(normalizeString(movie.director))) {
    score += 4;
    reasons.push({ person: person1.name, reason: `loves ${movie.director}` });
  }
  if (allDirectors2.has(normalizeString(movie.director))) {
    score += 4;
    reasons.push({ person: person2.name, reason: `loves ${movie.director}` });
  }

  // Check keyword matches based on genre preferences
  const keywords1 = getGenreKeywords(person1.genres);
  const keywords2 = getGenreKeywords(person2.genres);

  movie.keywords.forEach(keyword => {
    if (keywords1.has(keyword) && keywords2.has(keyword)) {
      score += 1;
    }
  });

  // Bonus if the movie wasn't already listed by either person (it's a new discovery)
  const allMovies1 = new Set(person1.movies.map(normalizeString));
  const allMovies2 = new Set(person2.movies.map(normalizeString));
  const movieTitle = normalizeString(movie.title);

  if (!allMovies1.has(movieTitle) && !allMovies2.has(movieTitle)) {
    score += 1; // Small bonus for being a new discovery
  }

  // Both people must have at least one matching criterion
  const person1Reasons = reasons.filter(r => r.person === person1.name);
  const person2Reasons = reasons.filter(r => r.person === person2.name);

  if (person1Reasons.length === 0 || person2Reasons.length === 0) {
    return { score: 0, reasons: [], movie };
  }

  return { score, reasons, movie };
}

function generateRecommendations(person1, person2) {
  const overlaps = findDirectOverlaps(person1, person2);

  // Score all movies in our database
  const scoredMovies = MOVIE_DATABASE.map(movie => scoreMovie(movie, person1, person2))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score);

  // Get top 5 recommendations
  const recommendations = scoredMovies.slice(0, 5).map(result => {
    // Create explanation
    const person1Reasons = result.reasons
      .filter(r => r.person === person1.name)
      .map(r => r.reason);
    const person2Reasons = result.reasons
      .filter(r => r.person === person2.name)
      .map(r => r.reason);

    // Remove duplicates
    const uniquePerson1Reasons = [...new Set(person1Reasons)];
    const uniquePerson2Reasons = [...new Set(person2Reasons)];

    let explanation = `Perfect for both of you! `;
    if (uniquePerson1Reasons.length > 0) {
      explanation += `${person1.name} ${uniquePerson1Reasons.slice(0, 2).join(' and ')}. `;
    }
    if (uniquePerson2Reasons.length > 0) {
      explanation += `${person2.name} ${uniquePerson2Reasons.slice(0, 2).join(' and ')}.`;
    }

    return {
      type: 'movie',
      title: result.movie.title,
      year: result.movie.year,
      genres: result.movie.genres,
      description: result.movie.description,
      explanation: explanation.trim(),
      matchScore: Math.min(100, Math.round((result.score / 10) * 100))
    };
  });

  // Add some variety with other media types if we found overlapping interests
  if (overlaps.youtubers.length > 0) {
    recommendations.push({
      type: 'youtube',
      title: `Shared Interest: ${overlaps.youtubers[0]}`,
      description: `You both enjoy ${overlaps.youtubers[0]}! Consider watching their content together.`,
      explanation: `Direct overlap - you both listed this creator!`,
      matchScore: 100
    });
  }

  if (overlaps.musicians.length > 0) {
    recommendations.push({
      type: 'music',
      title: `Shared Music: ${overlaps.musicians[0]}`,
      description: `You both love ${overlaps.musicians[0]}! Perfect for background music or a concert.`,
      explanation: `Direct overlap - you both listed this artist!`,
      matchScore: 100
    });
  }

  // Sort by match score and return top 5
  return {
    recommendations: recommendations.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5),
    overlaps,
    stats: {
      totalOverlaps: Object.values(overlaps).flat().length,
      moviesAnalyzed: MOVIE_DATABASE.length,
      perfectMatches: recommendations.filter(r => r.matchScore === 100).length
    }
  };
}

export { generateRecommendations, findDirectOverlaps };
