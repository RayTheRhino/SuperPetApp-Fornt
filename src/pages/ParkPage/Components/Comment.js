import React, {useEffect, useState, useContext} from "react";
import { FaStar } from "react-icons/fa";
import UserContext from "../../../context/UserContext";
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

const Comment = ({center}) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [selectedRating, setSelectedRating] = useState(0);
    const { loggedInUser } = useContext(UserContext);

    const alias ="asa"
    const type = 'park-review';

    const handleAddComment =  async (e) => {
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
                        "email": loggedInUser.email
                    }
                },
                objectDetails: {
                    stars: selectedRating,
                    username:loggedInUser.username,
                    comment: newComment
                }
            })
        }).then(response => {
           console.log(response);

        }).catch(error => {
            console.log(error);
        });
    };

    const getParkReviews =  async () => {
        const request = {
            command: "GetAllParkReviews",
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
                    email: loggedInUser.email,
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
                        username: item.objectDetails.username,
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
        getParkReviews();
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
            <h1 id='shops'> Parks Review </h1>
            <div className='comment-box'>
                <h3 id='add-comment'>Add A Review: </h3>
                <div>
                    <RateUs onRatingChange={handleRatingChange} selectedRating={selectedRating} />
                    <textarea
                        id="comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </div>
            </div>
            <button id='comment-btn' onClick={handleAddComment}> Comment </button>
            <div className='comment-section'>
                {isComment ? (
                    <ul id='review-ul'>
                        {comments.map((comment, index) => (
                            <li id='review-li' key={index}>
                                <div>Rating: {renderStars(comment.rating)}</div>
                                <div>Username: {comment.username}</div>
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

export default Comment;
