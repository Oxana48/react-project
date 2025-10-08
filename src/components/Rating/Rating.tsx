import './Rating.css';

interface RatingBadgeProps {
  rating: number;
  showIcon?: boolean;
  className?: string;
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({
  rating,
  showIcon = true,
  className = ''
}) => {
  const getRatingColor = (rating: number): string => {
    if (rating >= 8.0) return '#A59400'
    if (rating >= 7.0) return '#308E21'; 
    if (rating >= 5.0) return '#777777';
    return '#FF647C';
  };

  const getTextColor = (rating: number): string => {
    return rating >= 5.0 ? '#000' : '#FFF';
  };

  return (
    <div 
      className={`rating ${className}`}
      style={{
        backgroundColor: getRatingColor(rating),
        color: getTextColor(rating)
      }}
    >
      {showIcon && (
        <svg className="rating__icon" width="10" height="10" viewBox="0 0 24 24">
          <path 
            fill="currentColor" 
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      )}
      <span className="rating__value">{rating.toFixed(1)}</span>
    </div>
  );
};