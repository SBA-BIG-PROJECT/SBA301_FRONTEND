import React from 'react'
import ratingIcon from '../assets/Rating.svg'
import noPoster from '../assets/No-Poster.svg'

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'

const MovieCard = ({ movie }) => {
  const { title } = movie;
  const rating_val = movie.vote_average ?? movie.rating ?? movie.voteAverage;
  const poster_val = movie.poster_path ?? movie.posterPath;
  const release_val = movie.release_date ?? movie.releaseDate ?? movie.releaseYear;
  const language_val = movie.original_language ?? movie.originalLanguage;

  const rating = rating_val != null ? Number(rating_val) : null;
  const year = release_val
    ? (String(release_val).includes('-') ? String(release_val).split('-')[0] : String(release_val))
    : 'N/A';

  const posterSrc = poster_val
    ? (String(poster_val).startsWith('http') ? poster_val : `${IMAGE_BASE}${String(poster_val).startsWith('/') ? '' : '/'}${poster_val}`)
    : noPoster;

  const isPremium_val = movie.isPremium || movie.is_premium;

  return (
    <div className="movie-card">
      <div style={{ position: 'relative' }}>
        <img src={posterSrc} alt={title} />
        {isPremium_val && (
          <div style={{
            position: 'absolute',
            top: 8,
            left: 8,
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            padding: '3px 8px',
            borderRadius: '4px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#fff',
            fontSize: '10px',
            fontWeight: '700',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            zIndex: 5,
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
          }}>
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 11, height: 11 }}>
              <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm0 2h14v2H5v-2z"/>
            </svg>
            Premium
          </div>
        )}
      </div>

      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src={ratingIcon} alt="Star Icon" />
            <p>{rating != null && !isNaN(rating) ? (rating / 2).toFixed(1) : 'N/A'}</p>
          </div>

          {language_val && (
            <>
              <span>•</span>
              <p className="lang">{language_val}</p>
            </>
          )}

          <span>•</span>
          <p className="year">{year}</p>
        </div>
      </div>
    </div>
  )
}
export default MovieCard