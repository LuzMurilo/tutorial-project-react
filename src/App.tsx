import './App.css'
import Accordion from './components/accordion'
import ImageSlider from './components/image-slider'
import RandomColor from './components/random-color'
import StarRating from './components/star-rating'

function App() {

  return (
    <>
      <Accordion />
      <RandomColor/>
      <StarRating noOfStars={10}/>
      <ImageSlider url='https://picsum.photos/v2/list' page={1} limit={5}/>
    </>
  )
}

export default App
