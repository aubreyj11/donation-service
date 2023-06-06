import { Link } from 'react-router-dom'
import { Segment, Image, Button, Icon } from 'semantic-ui-react'
import { useState } from 'react'

function Home() {
const toggleVisibility = () => setVisible(!visible)

const [visible, setVisible] = useState(false)


  return (
    <Segment basic padded="very">
      <div className='homePage-seg'>
      <h1 className='home-h1' textAlign="left">Our Mission & Vision</h1>
      <p className='home-text'>Here at ChariTeam, our mission is to empower individuals and communities to make a positive impact in the world through a convenient and transparent donation service program. We aim to bridge the gap between those in need and those who want to help by providing a platform that facilitates meaningful and effective charitable giving.By pursuing these goals, we aim to create a donation service program that empowers individuals to make a lasting and meaningful impact in their local communities.</p>
    <div className="home-img">
      <Image style={{ marginTop: "-560px", height: "880px", width: "1300px" }} src='food-Box.jpg' size='big' floated='right'/>
      </div>
      <Button animated color='blue' size='big' type='button' floated='center'>
      <Button.Content visible>Learn More</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right'/>
        <Link to='/learnmore'>Learn More</Link>
      </Button.Content>
    </Button>
      </div>
    </Segment>
  )
}

export default Home
