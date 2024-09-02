import './App.css'
import Accordion from './components/accordion'
import RandomColor from './components/random-color'
import StarRating from './components/star-rating'

function App() {

  return (
    <>
      <Accordion />
      <RandomColor/>
      <StarRating noOfStars={10}/>
    </>
  )
}

export default App
