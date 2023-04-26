import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./Star.css";
import './Comment.css'

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
            <h1 id='parks'> Parks Review </h1>
            <div className='comment-box'>
                <h3 id='add-comment'>Add a comment: </h3>
                <div>
                    <RateUs onRatingChange={handleRatingChange} />
                    <textarea
                        id="comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </div>
            </div>
            <button id='comment-btn' onClick={handleAddComment}>Add Comment</button>
            <div>
                <h2 id='comment'> Your Comments: </h2>
                {comments.length > 0 ? (
                    <ul>
                        {comments.map((comment, index) => (
                            <li key={index}>
                                <div>Rating: {comment.rating}</div>
                                <div>Comment: {comment.comment}</div>
                                <RateUs onRatingChange={() => {}} rating={comment.rating} />
                                figur how to show the star number with stars
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
