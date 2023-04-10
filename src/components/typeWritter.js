import Typewriter from 'react-ts-typewriter';
import './typeWritter.css'
export default function Type() {
    return (
        <div className="title">
            <Typewriter text='Pet-App' speed={500} delay={200} loop={true} cursor={true}/>
        </div>
    )
}