import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class CustomerList extends Component {
  constructor(props) {
  super(props)
  this.handle = this.handle.bind(this)
}
  state = {
    customers: [
      { name: "dave", email: 'd@gmail.com', balance: 14},
      { name: "Bob", email: 'bob@gmail.com', balance: 10},
      { name: "Englebert", email: 'eng@gmail.com', balance: 5}
    ]
  }

  handle(item) {
    console.log(this.state);
    const result = this.state.customers.filter(function(customer) {
      return customer.name !== item.name
    })
    console.log(result);


     this.setState({
       customers: result
     });
  }

  componentDidMount() {
    fetch('/customers')
      .then(response => response.json())
      .then(function(data) {
        console.log(data);
    });
  }

  render() {
    const { customers } = this.state;
    console.log('', customers);
    return(
      <Container>
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={() => {
            const name = prompt('enter customer');
            if(name) {
              this.setState(state => ({
                customers: [...state.items]
              }));
            }
          }}
        >Add Customer</Button>

            {customers.map((item) => (
              <li onClick= {() => this.handle(item)}
              >{ item.name}</li>
            ))}


      </Container>
    );
  }
}

export default CustomerList;


// <CSSTransition key={name} timeput={500} classNames="fade">
//   <ListGroupItem>
//   <Button
//     className="remove=btn"
//     color="danger"
//     size="md"
//     onClick={() => {
//       this.setState(state => ({
//         customers: state.items.filter(customer => customer.name !== name)
//       }));
//     }}
//     >&times;
//   </Button>
//   {name}</ListGroupItem>
// </CSSTransition>
