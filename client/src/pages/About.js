import React from 'react'
import { Grid, Image, Button } from 'semantic-ui-react'

const About = () => (
  <Grid celled>
    <Grid.Row>
      <Grid.Column width={4}>
        <Image src={require('../assets/images/Foodbank1.jpg')} alt="Foodbank, happy to give back"/>
      </Grid.Column>
      <Grid.Column width={12}>
        <h1> About ChariTeam</h1>
        <p style={{margin: "30px 0px 0px 0px"}}>We have a mission here at ChariTeam to direct preventable foodwaste in a way that is most helpful to our community (Orange County). Our goal is to take the inconvenience out of giving back to your community in anyway possible. A major hurdle in properly handling large amounts of food waste, is not the desire to give back, but the effort, time, and money it takes to direct your resources in the correct manner. We are a non-profit aimed at alleviating this issue. Do you not know where to take your foodwaste? Do you lack the methods or manpower to transport it to the correct place? That's where we come in! Our team of drivers will pick up your usable waste and get it into the proper hands and from there to the people who need it most. Simply sign up and schedule a pick up from us!</p>
        <Button color="blue" style={{margin: "30px 0px 0px 0px"}}>Schedule a Pickup</Button>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
            <Grid.Column width={12}>
        <h1>What is Food Waste?</h1>
        <p style={{margin: "30px 0px 0px 0px"}}>How do you know if ChariTeam is right for you? Sometimes it can be tricky to tell if your food waste is usable or not, or perhaps the amount of waste your produce isn't enought to donate, but you still want to know how to cut down. It's important to understand that environmental consequences to food are just as real and important to fix, as helping those in need. Remember you can always volunteer to help at your local foodbank as a good way to help those in need.</p>
        <p style={{margin: "30px 0px 0px 0px"}}>In the simplest terms there are two types of food waste: Preventable and Non-edible. Non-edible food waste cannot be prevented. Examples of non-edible foodwaste include peels, bones eggshells, etc. This kind of waste cannot be donated but that doesn't mean we can't handle it better than we currently do. When anytype of foodwaste finds itself in a landfill it produces a lot of methane gase which is contributing to climate change. If you want to help  see a change, consider composting.  When food ends up in a compost pile, methane is not produced. Instead, carbon dioxide (less potent than methane) is produced which is part of the natural process of decomposition that is occurring as organic material transforms into compost over time. if you are in southern california and would like to learn more about composting, start by looking <a href="https://calrecycle.ca.gov/organics/homecompost/" target="_blank" rel="noreferrer">here.</a></p>
        <p style={{margin: "30px 0px 0px 0px"}}>Now, preventable foodwaste is any once-edible food that should have been consumed, but for any variety of reasons, was not. When your bread goes moldy, your milk goes sour, your meat gets rotten in you refrigerator, or your cereal gets too stale to eat. These are all preventable and happen to all of us! Whether you operate at large scale such as grocery store, market, or returaunt or your concerned about your waste for your household, ChariTeam is here to help! </p>

      </Grid.Column>
      <Grid.Column width={4}>
        <a href="https://table2table.org/understand-the-types-of-food-waste/" target="_blank" rel="noreferrer">
            <Image src={require('../assets/images/foodwaste1.jpg')} alt="understanding food waste"/>
        </a>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)


export default About;