import { Segment, Image, Button, Icon } from 'semantic-ui-react'

function Home() {
  return (
    <Segment basic padded="very">
      <div className='homePage-seg'>
      <h1 className='home-h1' textAlign="left">Our Mission & Vision</h1>
      <p className='home-text'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
      <Button animated color='blue' size='big' type='button' floated='center'>
      <Button.Content visible>Learn More</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>
      <Image style={{ marginTop: "-450px", height: "980px", width: "1025px" }} src='food-Box.jpg' size='big' floated='right' />
      </div>
    </Segment>
  )
}

export default Home
