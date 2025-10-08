import "./MoviePoster.css";

interface MoviePosterProps {
  posterUrl?: string | null;
  title?: string;
  size?: "small" | "medium" | "large" | "mobile" | "search";
  className?: string;
}

const MoviePoster: React.FC<MoviePosterProps> = ({
  posterUrl,
  title,
  size = "medium",
  className = "",
}) => {
  const sizeClass = {
    small: "poster__small",
    medium: "poster__medium",
    large: "poster__large",
    mobile: "poster__mobile",
    search: "poster__mobile-search",
  };

  return (
    <div className={`movie__poster ${sizeClass[size]} ${className}`}>
      <img
        src={posterUrl || "/poster-holder.jpg"}
        alt={title || "Movie poster"}
        onError={(e) => {
          e.currentTarget.src = "src/assets/poster-placeholder.jpg";
        }}
      />
    </div>
  );
};

export default MoviePoster;
