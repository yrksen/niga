import { Movie } from "./MovieCard";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";

interface RecentMoviesCarouselProps {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

export function RecentMoviesCarousel({ movies, onMovieClick }: RecentMoviesCarouselProps) {
  // Get the 12 most recently added movies
  const recentMovies = movies.slice(0, 12);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds for both mobile and desktop
  useEffect(() => {
    if (!recentMovies.length) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        // Desktop: if we're at the last position (showing movies 9-12), go back to start
        // Mobile: if we're at the last position (showing movies 5-8), go back to start
        const maxIndex = window.innerWidth >= 768 ? recentMovies.length - 8 : recentMovies.length - 4;
        if (prev >= maxIndex) {
          return 0;
        }
        // Otherwise, advance by 1
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [recentMovies.length]);

  if (!recentMovies.length) return null;

  return (
    <div className="w-full">
      {/* Desktop: Show 8 movies with horizontal sliding */}
      <div className="hidden md:block px-4 py-2">
        <div className="relative overflow-hidden">
          <div 
            className="flex gap-4 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(calc(-${currentIndex} * (100% + 16px) / 8))`
            }}
          >
            {recentMovies.map((movie) => (
              <div
                key={movie.id}
                className="flex-shrink-0 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                style={{ width: 'calc((100% - 112px) / 8)' }}
                onClick={() => onMovieClick?.(movie)}
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-[240px] object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Show 4 movies with horizontal sliding */}
      <div className="md:hidden px-3 py-2">
        <div className="relative overflow-hidden">
          <div 
            className="flex gap-3 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(calc(-${currentIndex} * (25% + 3px)))`
            }}
          >
            {recentMovies.map((movie) => (
              <div
                key={movie.id}
                className="flex-shrink-0 rounded-lg shadow overflow-hidden cursor-pointer"
                style={{ width: 'calc(25% - 9px)' }}
                onClick={() => onMovieClick?.(movie)}
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-[140px] object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}