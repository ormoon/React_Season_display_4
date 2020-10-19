import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';


class App extends React.Component {

    state = { lat: null, errMsg: '' };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                //updating latitude i.e. state of the App component
                this.setState({
                    lat: position.coords.latitude
                });
            },
            (err) => {
                this.setState({
                    errMsg: err.message
                })
            }
        );
    }


    renderContent() {
        if (!this.state.lat && this.state.errMsg) {
            return <div>Error : {this.state.errMsg}</div>
        }
        if (this.state.lat && !this.state.errMsg) {
            return (<div>
                <SeasonDisplay lat={this.state.lat} />
            </div>)
        }
        return <Spinner msg="Please allow Location request" />
    }


    render() {
        return (
            <div className="border-red">
                {this.renderContent()}
            </div>
        )
    }
}


ReactDOM.render(
    <App />,
    document.querySelector('#root')
)