import { Image, Header, Button, Icon, Grid, Container } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'



function Home() {
  const navigate = useNavigate();

  return (
      <Grid columns={2} relaxed='very' stackable padded='horizontally' centered>
        <Grid.Column width={8}>
          <Header as={'h2'} style={{fontSize:'36px'}} size='massive' textAlign="center">Our Mission & Vision</Header>
          <Container style={{fontSize:'24px'}} textAlign='justified' text > 
            Here at ChariTeam, our mission is to empower individuals and communities to make a positive impact in the world through 
            a convenient and transparent donation service program. 
            We aim to bridge the gap between those in need and those who want to help by providing a platform that facilitates meaningful and effective charitable giving. 
            By pursuing these goals, we aim to create a donation service program that empowers individuals to make a lasting and meaningful impact in their local communities.
          </Container>
          <Grid>
            <Grid.Column style={{marginTop:'20px'}} textAlign='center'>
          <Button animated color='blue' className='mx-auto' size='medium' type='button' onClick={()=>{navigate('/about')}}>
          <Button.Content visible>Learn More</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
          </Button>
          </Grid.Column>
          </Grid>
        </Grid.Column>
        <Grid.Column width={5} verticalAlign='middle'>
          <Image src='food-Box.jpg' fluid />
        </Grid.Column>
      </Grid>
    

  )
}

export default Home
