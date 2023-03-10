import video1 from "../../assests/videos/splash-1.mp4"
// import video2 from "../../assests/videos/splash-2"
// import video3 from "../../assests/videos/splash-3"
// import video4 from "../../assests/videos/splash-4"
// import video5 from "../../assests/videos/splash-5"
import "./Splash.css"
import Navigation from "../Navigation/Navigation"
import { NavLink } from "react-router-dom"
import splashLogo from "../../assests/images/splash-logo.svg"
import splashBillboardVideo from "../../assests/videos/splash-billboard-video.mp4"
import airbnb from "../../assests/images/airbnb-logo.png"
import nasa from "../../assests/images/nasa-logo.png"
import uber from "../../assests/images/uber-logo.png"
import target from "../../assests/images/target-logo.png"
import nyt from "../../assests/images/nyt-logo.png"
import etsy from "../../assests/images/etsy-logo.png"
import splashVideo1 from "../../assests/videos/splash-1.mp4"
import splashVideo2 from "../../assests/videos/splash-2.mp4"
import splashVideo3 from "../../assests/videos/splash-3.mp4"
import { useRef } from "react"


export default function SplashPage(){
    const topRef = useRef(null);

    const handleScrollToTop = () => {
        topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <>
            <section className="splash-page">
                <section className="section-1">
                    {/* <Navigation /> */}
                    <div className="splash-nav">
                        <NavLink to='/' className="splash-logo">
                            <img src={splashLogo} alt="logo" style={{ height:'35px' }}></img>
                            <h2>USlack</h2>
                        </NavLink>
                        {/* <div className="author-links-container"> */}
                            <a id="github-link" href="https://github.com/ldldylan/USlack" target="_blank">Github-Repo</a>
                            <a id="linkedin-link" href="https://github.com/ldldylan/USlack" target="_blank">LinkedIn</a>
                        {/* </div> */}
                        <NavLink to="/login" className="splash-login-button">Sign In</NavLink>
                        <NavLink to="/signup" className="splash-signup-button">Sign Up</NavLink>
                    </div>
                    <section className="splash-billboard">
                        <div className="splash-billboard-left">
                            <h1>
                                Great teamwork starts with a{" "}
                                <span className="yellow-text">digital HQ</span>
                            </h1>
                            <p> With all your people, tools and communication in one place, 
                                you can work faster and more flexibly than ever before.</p>
                            <div className="try-for-free"><a className="try-for-free-button" href="/signup">TRY FOR FREE</a></div>
                        </div>
                        <video className="video" src={splashBillboardVideo} autoPlay loop muted />
                    </section>
                </section>
                <section className="seciton-2">
                    <p>TRUSTED BY COMPANIES ALL OVER THE WORLD</p>
                    <div className="company-list">
                        <div className="airbnb">
                            <img
                                alt="Airbnb"
                                height="35"
                                width="112"
                                loading="lazy"
                                src={airbnb}
                            />
                        </div>
                        <div className="nasa">
                            <img
                                alt="Nasa"
                                height="60"
                                width="67"
                                loading="lazy"
                                src={nasa}
                            />
                        </div>
                        <div className="uber">
                            <img
                                alt="Uber"
                                height="26"
                                width="75"
                                loading="lazy"
                                src={uber}
                            />
                        </div>
                        <div className="target">
                            <img
                                alt="Target"
                                height="48"
                                width="48"
                                loading="lazy"
                                src={target}
                            />
                        </div>
                        <div className="nyt">
                            <img
                                alt="NYT"
                                height="32"
                                width="230"
                                loading="lazy"
                                src={nyt}
                            />
                        </div>
                        <div className="etsy">
                            <img
                                alt="Etsy"
                                height="36"
                                width="74"
                                loading="lazy"
                                src={etsy}
                            />
                        </div>
                    </div>
                </section>
                <section className="section-3">
                    <div className="section-3-1">
                        <video src={splashVideo1} autoPlay loop muted />
                        <div className="section-3-text">
                            <h2>Bring your team together</h2>
                            <p>At the heart of USlack are channels: 
                                organized spaces for everyone and everything you need for work. 
                                In channels, it's easier to connect across departments, offices, 
                                time zones and even other companies.</p>
                        </div>
                    </div>
                    <div className="section-3-2">
                        <div className="section-3-text">
                            <h2>Choose how you want to work</h2>
                            <p>In USlack, you've got all the flexibility to work when, 
                                where and how it's best for you. You can easily chat, 
                                send audio and video clips, or hop on a huddle to talk things out live.</p>
                        </div>
                        <video id="section-3-2-video" src={splashVideo2} autoPlay loop muted />
                    </div>
                    <div className="section-3-3">
                        <video src={splashVideo3} autoPlay loop muted />
                        <div className="section-3-text">
                            <h2>Move faster with your tools in one place</h2>
                            <p>With your other work apps connected to USlack, 
                                you can work faster by switching tabs less. 
                                And with powerful tools like Workflow Builder, 
                                you can automate away routine tasks.</p>
                        </div>
                    </div>
                </section>

                <section className="section-4">
                    <div className="section-4-content">
                        <h2>Welcome to your new digital HQ</h2>
                        <div className="section-4-buttons">
                            <NavLink
                                to={"/login"}
                                style={{
                                    textDecoration: "none",
                                    color: "#fff",
                                    
                                }}
                                className="section-4-login"
                            >
                                Sign In
                            </NavLink>
                            <NavLink
                                to={"/signup"}
                                style={{ textDecoration: "none", color: "#fff", marginLeft: "1.25rem" }}
                                className="section-4-sign-up"
                            >
                                Sign Up
                            </NavLink>
                            
                        </div>
                    </div>
                </section>
                <section className="section-5">
                    <div className="section-5-content">
                        <div onClick={handleScrollToTop} ref={topRef} style={{ cursor: "pointer" }}>
                            <img src={splashLogo} alt="logo" />
                        </div>
                        <a
                            href="https://github.com/ldldylan/USlack"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="fa-brands fa-github" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/dilanglin/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                    </div>
                </section>
            </section>
        </>
    )
}