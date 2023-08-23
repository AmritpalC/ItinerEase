import './HomePage.css'
import logo from '../../assets/plane.png'
import { Card, CardImg, Accordion, AccordionBody, AccordionHeader, AccordionItem, } from 'reactstrap'
import { useState } from 'react';
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

// export default function HomePage() {
//   return (
//     <>
//       <h1>ItinerEase</h1>
//       <img src={logo} alt="ItinerEase" className="img-fluid home-logo"/>
//       <h4>Holiday Planning Made Easy</h4>
//       <p>ItinerEase is your all-in-one travel planning companion. 
//         Effortlessly create, track, and manage itineraries for your trips. 
//         Stay organized, manage your budget, and discover exciting places 
//         and restaurants. Simplify your travel planning with ItinerEase.</p>
//     </>
//   )
// }

export default function HomePage({ user, setUser }) {

  const [showSignUp, setShowSignUp] = useState(false);
  const [open, setOpen] = useState(null)
  const toggle = (id) => {
    if (open === id ) {
      setOpen()
    } else {
      setOpen(id)
    }
  }

  return (
    <>
      <div className='row'>
        <div className='col-4 offset-4'>
          <img src={logo} alt="ItinerEase" className="img-fluid home-logo"/>
        </div>
      </div>
      <h1 className=''>ItinerEase</h1>
      <h4 className='app-summary'>Holiday Planning Made Easy</h4>
      <hr/>
      <div className='row my-4'>
        <Accordion open={open} toggle={toggle} className='col-10 offset-1'>
          <AccordionItem>
            <AccordionHeader targetId='1'>About ItinerEase</AccordionHeader>
            <AccordionBody accordionId='1'><strong>ItinerEase</strong> is your all-in-one travel planning companion. 
              Effortlessly create, track, and manage itineraries for your trips. 
              Stay organised, manage your budget, and discover exciting places 
              and restaurants. Simplify your travel planning with ItinerEase.
            </AccordionBody>  
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId='2'>About Me</AccordionHeader>
            <AccordionBody accordionId='2'>
              <h3>Amritpal Chahal</h3>
              <h5>Junior Software Engineer</h5>
              <div>
                I recently got in to programming thanks to a software engineering immersive with 
                General Assembly. I thoroughly enjoy travelling and usually make an itinerary for my
                holiday. I have built this app as part of my projects to showcase what I 
                have learned so far, to push myself and so that I can use an app instead of a spreadsheet! 
              </div>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>
      {/* <div className='row my-4'>
        <Accordion open={open} toggle={toggle} className='col-10 offset-1'>
          <AccordionHeader targetId='2'>About Me</AccordionHeader>
          <AccordionBody accordionId='2'>
            <h3>Amritpal Chahal</h3>
            <h5>Junior Software Engineer</h5>
            <div>
              I have recently got in to programming thanks to a software engineering immersive with 
              General Assembly. I thoroughly enjoy travelling and usually make an itinerary for my
              holiday on a spreadsheet. I have built this app as part of my projects to showcase what I 
              have learned so far, to push myself and so that I can use an app instead of a spreadsheet! 
            </div>
          </AccordionBody>
        </Accordion>
      </div> */}
      <div>
        { user && (
          <p><strong>Create a new itinerary to get started 😃</strong></p>
          // <h5>Create a new itinerary to get started 😃</h5>
          )
        }
      </div>
      
      {!user && (
        <>
          {/* <h5>Create an account or log in to ItinerEase</h5> */}
          <button onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? "Have an account already? Log In" : "Don't have an account? Sign Up"}</button>
          { showSignUp ?
            <SignUpForm setUser={setUser} />
            :
            <LoginForm setUser={setUser} />
          }
        </>
      )}
    </>
  )
}