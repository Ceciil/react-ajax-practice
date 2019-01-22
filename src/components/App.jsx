import React from 'react';
import $ from 'jquery';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleRequest = this.handleRequest.bind(this);

        this.state = {
            name: '',
            message: '',
            response: ''
        };
    }

    //state change
    handleInput(event) {
        event.preventDefault();

        this.setState({
            name: event.target.name.value,
            message: event.target.message.value
        });
    }

    //AJAX request
    handleRequest(event) {
        event.preventDefault();

        $.ajax({
            url: "http://ec2-13-57-25-101.us-west-1.compute.amazonaws.com:3000/api/hrsf110/greeting",
            type: "POST",
            data: JSON.stringify(this.state),
            contentType: 'application/json',
            success: (data) => {
                this.setState({ response: data })
            },
            error: (data) => { "Error!" }
        });
    }

    //render method
    render() {
        return (
            <div>
                <form onSubmit={this.handleInput}>
                    Name: <input id="name" type="text" placeholder="Your name here" />
                    <br></br>
                    Message: <input id="message" type="text" placeholder="Your message here" />
                    <br></br>
                    <button type="submit">Submit info</button>
                    <button onClick={this.handleRequest} type="submit">Show response</button>
                </form>
                <div>
                    <h4>{this.state.response}</h4>
                </div>
            </div>
        );
    }
}

//export App.jsx
export default App;