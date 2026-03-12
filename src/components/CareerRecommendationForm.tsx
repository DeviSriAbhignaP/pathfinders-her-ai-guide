import React, { useEffect, useState } from 'react';
import { getCareerRecommendations } from '../services/careerService';

const CareerRecommendationForm = () => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            const data = await getCareerRecommendations();
            setRecommendations(data);
        };
        fetchRecommendations();
    }, []);

    return (
        <div>
            <h1>Career Recommendations</h1>
            <ul>
                {recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                ))}
            </ul>
        </div>
    );
};

export default CareerRecommendationForm;