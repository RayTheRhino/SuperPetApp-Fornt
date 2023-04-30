import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./Star.css";
import './Comment.css'

const RateUs = ({ onRatingChange, selectedRating }) => {
    const [hover, setHover] = useState(null);

    const handleRatingChange = (ratingValue) => {
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
                            checked={ratingValue === selectedRating}
                            onClick={() => handleRatingChange(ratingValue)}
                        />
                        <FaStar
                            className="star"
                            color={ratingValue <= (hover || selectedRating) ? "#ffc107" : "#e4e5e9"}
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
    const [selectedRating, setSelectedRating] = useState(0);

    const handleAddComment = () => {
        const commentObj = { rating: selectedRating, comment: newComment };
        setComments([...comments, commentObj]);
        setNewComment("");
        setSelectedRating(0);
    };

    const handleRatingChange = (ratingValue) => {
        setSelectedRating(ratingValue);
    };

    const renderStars = (rating) => {
        return [...Array(rating)].map((_, i) => {
            return <FaStar key={i} className="star" color="#ffc107" size={35} />;
        });
    };

    return (
        <div>
            <h1 id='shops'> Parks Review </h1>
            <div className='comment-box'>
                <h3 id='add-comment'>Add a comment: </h3>
                <div>
                    <RateUs onRatingChange={handleRatingChange} selectedRating={selectedRating} />
                    <textarea
                        id="comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </div>
            </div>
            <button id='comment-btn' onClick={handleAddComment}>Add Comment</button>
            <div className='comment-section'>
                {comments.length > 0 ? (
                    <ul id='review-ul'>
                        {comments.map((comment, index) => (
                            <li id='review-li' key={index}>
                                <div>Rating: {renderStars(comment.rating)}</div>
                                <div>Comment: {comment.comment}</div>
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
