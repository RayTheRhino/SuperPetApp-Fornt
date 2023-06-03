import React, {useEffect, useState} from "react";
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





const CommentSection =  ({center}) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [selectedRating, setSelectedRating] = useState(0);
    const alias = "bla";
    const type = 'shop-review';

    const handleAddComment = async (e) => {
        const commentObj = { rating: selectedRating, comment: newComment };
        setComments([...comments, commentObj]);
        setNewComment("");
        setSelectedRating(0);

        e.preventDefault();
         await fetch('http://localhost:3306/superapp/objects?userSuper=SuperPetApp&&userEmail=test_super@email.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: type,
                alias: alias,
                active: true,
                location: {
                    "lat": center[0],
                    "lng": center[1]
                },
                createdBy: {
                    "userId": {
                        "superapp": "SuperPetApp",
                        "email": "test_super@email.com"
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

    };

    const getShopReviews = async () => {
        const request = {
            command: "GetAllShopReviews",
            targetObject: {
                objectId: {
                    superapp: "SuperPetApp",
                    internalObjectId: "1",
                },
            },
            invocationTimestamp: "2023-05-05T16:10:04.018+00:00",
            invokedBy: {
                userId: {
                    superapp: "SuperPetApp",
                    email: "hdudtototo@gmail.com",
                },
            },
            commandAttributes: {
                size:10,
                page:0,
            },
        };

         await fetch("http://localhost:3306/superapp/miniapp/miniAppName", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        })
            .then((response) => response.json())
            .then((data) => {
                const commentsArray = data.map((item) => {
                    return {
                        rating: item.objectDetails.stars,
                        comment: item.objectDetails.comment,
                    };
                });
                setComments(commentsArray);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getShopReviews();
    }, []);


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