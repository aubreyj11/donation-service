import React, {useState, useEffect} from "react";
import { GET_USER } from "../utils/queries";
import { useQuery } from '@apollo/client';
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
  const { data } = useQuery(GET_USER);

  const user = data?.user || {};

  const [count, setCount] = useState(1);

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
  };
  
  const avaSrc = `https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava${count}.webp`;
    
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={avaSrc}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                  <hr/>
                <p className="text-muted mb-1">{user.name}</p>
                <p className="text-muted mb-4">{user.city}</p>
                <button className="avaBtn" onClick={handleClick}>Change Avatar</button>
              
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
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
  
  
};

export default Profile;