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





const CommentSection = ({center}) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [selectedRating, setSelectedRating] = useState(0);
    const type = 'shop-review';

    const handleAddComment = (e) => {
        const commentObj = { rating: selectedRating, comment: newComment };
        setComments([...comments, commentObj]);
        setNewComment("");
        setSelectedRating(0);

        e.preventDefault();
        fetch('http://localhost:3306/superapp/objects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: type,
                alias: " ",
                active: true,
                location: {
                    "lat": center[0],
                    "lng": center[1]
                },
                createdBy: {
                    "userId": {
                        "superapp": "asdfg",
                        "email": "sdggwgfd"
                    }
                },
                objectDetails: {
                    stars: selectedRating,
                    comment: newComment
                }
            })
        }).then(response => {
            //     check if brough something else this is not woek

        }).catch(error => {
            console.log(error);
        });
        console.log("after");
        console.log(center);

    };
    const isComment = comments.length > 0;

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
            <h1 id='shops'> Shops Review </h1>
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
                {isComment ? (
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