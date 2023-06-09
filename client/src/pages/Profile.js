import React, {useState, useEffect } from "react";
import { GET_USER } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";
import { useQuery, useMutation } from '@apollo/client';
import AuthService from "../utils/auth";
import ReactModal from "../components/Modal";
import { Button } from 'semantic-ui-react'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';


const Profile = () => {

  //this count is used to change the chosen avatar image via avaSrc
  const [count, setCount] = useState(1);
  const avaSrc = `https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava${count}.webp`;
  const loggedIn = AuthService.loggedIn();

  const { data } = useQuery(GET_USER);
  const [ changePhoto ] = useMutation(UPDATE_USER, {
    variables: { avatar: avaSrc },
    refetchQueries: [{ query: GET_USER }],  
  });

  const user = data?.getUser || {};

  useEffect(() => {
    const savedCount = localStorage.getItem('count');
    if (savedCount) {
      setCount(parseInt(savedCount));
    }
  }, []);

  const handleClick = () => {
    if (count < 6) {
      const newCount = count + 1;
      setCount(newCount);
      localStorage.setItem('count', newCount);
    } else if (count=== 6){
      setCount(1);
    }
    console.log(count);
    changePhoto();
  };
  
  
    
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={user.avatar}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                  <hr/>
                <p className="text-muted mb-1">{user.name}</p>
                <p className="text-muted mb-4">{user.city}</p>
                
                <Button onClick={handleClick}>Change Avatar</Button>
              
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.address}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>City</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.city}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Zip</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.zipcode}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
                    <ReactModal />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
  
  
};

export default Profile;