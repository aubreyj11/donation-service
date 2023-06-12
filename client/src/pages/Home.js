import { Image, Header, Button, Icon, Grid, Container } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'



function Home() {
  const navigate = useNavigate();

  return (
      <Grid columns={2} stackable padded='horizontally' centered>
        <Grid.Column width={6} verticalAlign='middle'>
          <Image src='assets/food-box.jpg' fluid />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header as={'h2'} style={{fontSize:'36px'}} textAlign="center">Our Mission & Vision</Header>
          <Container style={{fontSize:'32px'}} textAlign='justified' text fluid> 
            <p className='home-text'>
                Here at ChariTeam, our mission is to empower individuals and communities to make a positive impact in the world through 
                a convenient and transparent donation service program.
            </p> 
            <p className='home-text'>
               We aim to bridge the gap between those in need and those who want to help by providing a platform that facilitates meaningful and effective charitable giving. 
            </p>
            <p className='home-text'>
              By pursuing these goals, we aim to create a donation service program that empowers individuals to make a lasting and meaningful impact in their local communities.
            </p>
          </Container>
          <Grid>
            <Grid.Column style={{marginTop:'20px'}} textAlign='center'>
          <Button style={{marginBottom:'20px'}} animated color='blue' className='mx-auto' size='medium' type='button' onClick={()=>{navigate('/about')}}>
          <Button.Content visible>Learn More</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
          </Button>
          </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    

  )
}

export default Home
