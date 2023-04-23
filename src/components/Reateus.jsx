import {useState} from "react";

const reateus = () =>{
    const[rating,setRating] = useState(0);
    return(
        <div className='star-rating'>
            {[...Array(5)].map((star,index)=>{
                index+=1;
                return(
                    <button
                    type='button'
                    key={index}

                    >

                    </button>
                )
            })}
        </div>
    )
}
export default reateus();