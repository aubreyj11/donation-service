import { Segment, Image, Button, Icon } from 'semantic-ui-react'

function Home() {
  return (
    <Segment basic padded="very">
      <div className='homePage-seg'>
      <h1 className='home-h1' textAlign="left">Our Mission & Vision</h1>
      <p className='home-text'>Here at CheriTeam, our mission is to empower individuals and communities to make a positive impact in the world through a convenient and transparent donation service program. We aim to bridge the gap between those in need and those who want to help by providing a platform that facilitates meaningful and effective charitable giving. By pursuing these goals, we aim to create a donation service program that empowers individuals to make a lasting and meaningful impact in their local communities.</p>
    <div className='homePage-img'>
      <Image style={{ marginTop: "-550px", height: "780px", width: "1100px" }} src='food-Box.jpg' size='big' floated='right' />
      </div>
      <Button animated color='blue' size='big' type='button' floated='center'>
      <Button.Content visible>Learn More</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>
      </div>
    </Segment>
  )
}

export default Home
