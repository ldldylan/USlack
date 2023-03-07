import video1 from "../../assests/videos/splash-1.mp4"
// import video2 from "../../assests/videos/splash-2"
// import video3 from "../../assests/videos/splash-3"
// import video4 from "../../assests/videos/splash-4"
// import video5 from "../../assests/videos/splash-5"
import "./Splash.css"
import Navigation from "../Navigation/Navigation"
import { NavLink } from "react-router-dom"


export default function SplashPage(){
    return (
        <>
            <section className="splash-page">
                <Navigation />
                <div className="splash-nav">

                </div>
            </section>
            <section className="splash-billboard">
                <h1>
                    Great teamwork starts with a{" "}
                    <span className="yellow-text">digital HQ</span>
                </h1>
                <p> With all your people, tools and communication in one place, you can work faster and more flexibly than ever before.</p>
                <div className="try-for-free"><NavLink className="try-for-free-button" to="/signup"/>TRY FOR FREE</div>
            </section>
        </>
    )
}