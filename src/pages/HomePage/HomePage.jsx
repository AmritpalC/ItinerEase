import './HomePage.css'
import logo from '../../assets/tree.jpg'
import { Card, CardImg } from 'reactstrap'
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

  return (
    <>
      <h1>ItinerEase</h1>
      <h4>Holiday Planning Made Easy</h4>
      <div className='row my-4'>
        <div className='col-2'>
          <img src={logo} alt="ItinerEase" className="img-fluid home-logo"/>
        </div>
        <div className='col-10 w-75'>
          <p>ItinerEase is your all-in-one travel planning companion. 
            Effortlessly create, track, and manage itineraries for your trips. 
            Stay organised, manage your budget, and discover exciting places 
            and restaurants. Simplify your travel planning with ItinerEase.
          </p>
        </div>
          { user && (
            <h5>Create a new itinerary to get started 😃</h5>
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