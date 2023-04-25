import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./Star.css";

const RateUs = ({ onRatingChange }) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const handleRatingChange = (ratingValue) => {
        setRating(ratingValue);
        onRatingChange(ratingValue);
    };

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label key={i}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => handleRatingChange(ratingValue)}
                        />
                        <FaStar
                            className="star"
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            size={35}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
};

const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(0);

    const handleAddComment = () => {
        const commentObj = { rating, comment: newComment };
        setComments([...comments, commentObj]);
        setNewComment("");
        setRating(0);
    };

    const handleRatingChange = (ratingValue) => {
        setRating(ratingValue);
    };

    return (
        <div>
            <h1>Comments</h1>
            <RateUs onRatingChange={handleRatingChange} />
            <div>
                <label htmlFor="comment">Comment: </label>
                <textarea
                    id="comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
            </div>
            <button onClick={handleAddComment}>Add Comment</button>
            <div>
                <h2>Comments:</h2>
                {comments.length > 0 ? (
                    <ul>
                        {comments.map((comment, index) => (
                            <li key={index}>
                                <div>Rating: {comment.rating}</div>
                                <div>Comment: {comment.comment}</div>
                                <RateUs onRatingChange={() => {}} rating={comment.rating} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
