
    import React, { useState } from 'react'
    import '../App.css';
import { HashLink } from 'react-router-hash-link';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import AOS from 'aos';
import 'aos/dist/aos.css';


//darkmode light mode top right corner use icons
//hero image that randomizes hero images on load
// floating login button and about button


    const Home = () => {
      const [signLog, setSignLog] = useState(false)
      const [showLogin, setShowLogin] = useState(true)
      const openSignLog = () => {
        setSignLog(true)
        document.getElementById('sign-log').showModal();
      }
      AOS.init({
        once: true, // whether animation should happen only once - while scrolling down
        useClassNames: true, // if true, will add content of `data-aos` as classes on scroll
        initClassName: false, // disable initialization classes
        animatedClassName: 'animated', // class applied on animation
      });



      return (
        <>
          <div className="hero min-h-screen bg-yell bg-fixed bg-center bg-no-repeat bg-cover h-full" >
          <label className="absolute top-0 right-2   swap swap-rotate">
  
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" className=" theme-controller" value="coffee" />
            
            {/* sun icon */}
            <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
            
            {/* moon icon */}
            <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
            
          </label>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Greetings!</h1>
                <p className="mb-8">🪄 Step into a world of creativity and camaraderie! <br/> 🎨

Join our enchanting cosplay community today and unleash your inner artist.<br/> ✨

Connect with fellow wizards of the craft, showcase your masterpieces, and embark on magical adventures together. 🌟

Welcome to the realm of imagination and endless possibilities! 🚀</p>
                <div className='flex justify-evenly'>
                <button onClick={()=>openSignLog()} className="btn btn-primary">Get Started</button>
                <HashLink smooth to='#about'>
                  <div className=" btn btn-secondary">Learn More</div>
                </HashLink>
                </div>
              </div>
            </div>
          </div>
          <div  className='h-screen'>

          <div id='about' className="bg-base overflow-x-clip overflow-hidden">
            <div data-aos="fade-right" data-aos-duration="800" >
            <span  className='text-6xl pl-3 leading-loose'>Imagine!</span>
            </div>
            <div data-aos="fade-left"
                  data-aos-duration="1200">
            <p   className='leading-8 px-8 pb-5'>&emsp;Cosplay, an art form that transcends boundaries and eras, invites everyone to explore worlds beyond imagination. From its humble beginnings to its global explosion, cosplay has always been about expression, creativity, and most importantly, inclusivity. Whether you&apos;re channeling your inner ninja or embodying a knight from tales of old, the essence of cosplay is bound only by the limits of your imagination. CozShare celebrates this art, offering a canvas where every stitch, color, and character comes to life, reminding us that in the universe of cosplay, you&apos;re only as limited as your dreams.
            </p></div>
          </div>
          <div className=" h-3/4 bg-imagineWiz bg-fixed bg-bottom bg-no-repeat bg-cover"></div>


          <div  className="bg-base overflow-x-clip overflow-hidden">
          <div data-aos="fade-down-right" data-aos-duration="1200" >
          <span  className='text-6xl pl-3 leading-loose'>Connect!</span>
          </div>
            <div data-aos="fade-up-left"
                  data-aos-duration="1800">
            <p className='leading-8 px-8 pb-5'>&emsp;At its core, cosplay thrives on community. It&apos;s not just about crafting a costume; it&apos;s about the connections made and the shared passion for bringing fantasies to life. CozShare aims to be more than just a platform; it&apos;s a meeting ground for creativity, where artists and enthusiasts alike can share, credit, and draw inspiration from each other. By fostering a network of support and idea exchange, we&apos;re not just sharing costumes; we&apos;re weaving a tapestry of friendships and collaborative artistry. Join us in creating a space where every cosplayer, from beginners to veterans, can connect and grow together.
            </p></div>
          </div>
          <div className=" h-3/4 bg-elfgirl bg-fixed bg-top bg-no-repeat bg-cover"></div>


          <div  className="bg-base overflow-x-clip overflow-hidden">
          <div data-aos="fade-down" data-aos-duration="1100" >
            <span  className='text-6xl pl-3 leading-loose'>Create!</span>
            </div>
            <div data-aos="fade-up"
                  data-aos-duration="800">
            <p className='leading-8 px-8 pb-5'>&emsp;The world of cosplay is as diverse in its materials as it is in its characters. Foam, leather, paint, electronics, 3D printing, wood – the list goes on. CozShare isn&apos;t just a showcase; it&apos;s a hub of creation and inspiration. Our goal is to connect cosplayers globally, allowing you to buy, sell, and be inspired. Share your costume photos and videos, instructional content, discuss events, and explore prop and costume tutorials. Patterns, downloadable resources, and artist shop links are just a click away. CozShare is more than a platform; it&apos;s a community that echoes the mantra: "Let&apso;s all work together to keep a community that creates!"</p>
            </div>
          </div>

          <div className=" h-3/4  bg-workspace bg-fixed bg-center bg-no-repeat bg-cover">
            <button onClick={()=>openSignLog()} className=' pulsate  btn btn-accent relative flex mx-auto top-3/4 lg:scale-125 lg:hover:scale-200'>Interested?</button>
          </div>

          </div>
            <dialog id="sign-log" className={`modal md:mx-0 ${signLog ? 'animate-slideDown' : 'animate-slideUp'}`}>
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button onClick={()=>{setSignLog(false)}} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">WELCOME!</h3>
                <div className="py-4">
                  {showLogin ? (
                    <>
                     <SignupForm/>
                     <small >Already have an account? <span className='text-blue-400 cursor-pointer' onClick={()=>setShowLogin(false)}>Log-In</span></small>
                    </>
                  ):(

                    <>
                    <LoginForm/>
                    <small >Don&apos;t have an account? <span className='text-blue-400 cursor-pointer' onClick={()=>setShowLogin(true)} to ='/signup'>Sign Up</span></small>
                    </>
                  )

                }
                </div>
              </div>
            </dialog>
        </>
      )
    }
    
    export default Home
    