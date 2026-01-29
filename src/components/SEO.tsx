import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
}

export function SEOHead({
    title = "MovieSite - Discover Movies & TV Shows",
    description = "Explore trending movies and TV shows, create watchlists, and bookmark your favorites. Get detailed information about cast, crew, and recommendations.",
    image = "/og-image.jpg",
    type = "website"
}: SEOProps) {
    const location = useLocation();
    const url = `${window.location.origin}${location.pathname}`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Additional SEO */}
            <link rel="canonical" href={url} />
        </Helmet>
    );
}

export { HelmetProvider };
