import React  from 'react'
import ReactModal from  '../Modal'
import { Header } from 'semantic-ui-react';


const UserPickupTable= (props) => {
    return(
        <>
        <ReactModal style={{marginTop:"15px"}}></ReactModal>
        <Header as={'h2'} style={{marginTop:"15px", borderBottom:'solid #2E9CEF'}} content='Scheduled Pickups' />
        <table className='ui table' style={{marginTop: "15px", borderRadius: "10px"}}>
        <thead>
          <tr>
            <th>Pickup Date</th>
            <th>Pickup Time</th>
            <th>Location</th>
            <th>Additional Comments</th>
          </tr>
        </thead>
        <tbody>
            {props.pickups.map((item, index) => (
                <tr key={index}>
                    <td>
                        {item.date}
                    </td>
                    <td>
                        {item.time}
                    </td>
                    <td>
                        {item.address}, {item.city}, CA, {item.zip}
                    </td>
                    <td>
                        {item.comment}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </>
    )
}

export default UserPickupTable;