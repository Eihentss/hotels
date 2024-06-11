import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const AverageRating = ({ reviews }) => {
    const calculateAverageRating = (reviews) => {
        if (!reviews || reviews.length === 0) return "Nav vērtējumu";

        const totalRating = reviews.reduce((accumulator, currentReview) => accumulator + currentReview.rating, 0);
        const averageRating = totalRating / reviews.length;

        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < averageRating) {
                stars.push(<FontAwesomeIcon icon={faStar} key={i} className="text-yellow-500" />);
            } else {
                stars.push(<FontAwesomeIcon icon={faStar} key={i} className="text-gray-300" />);
            }
        }
        return <>{stars}</>;
    };

    return (
        <div className="flex items-center">
            <span className="font-semibold mr-1">Vērtējums:</span>
            {calculateAverageRating(reviews)}
        </div>
    );
};

export default AverageRating;
