import React, { Component } from 'react';
import { Link , withRouter } from 'react-router-dom';

class CountryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {        }
    }
    render() { 
        return ( 
            <div className="country-item">
                <div className="country-item__head">
                    <Link  to={{
                        pathname: `/inner/${this.props.title}`,
                        name: this.props.title
                        }} >
                        <img src={this.props.img} alt={this.props.title}/>   
                    </Link >   
                </div>
                <div className="country-item__content">
                    <h2 className="country-item__title">{this.props.title}</h2>
                    <div className="country-item__box">
                        <span>Population:</span>
                        <span>{this.props.population}</span>
                    </div>
                    <div className="country-item__box">
                        <span>Region:</span>
                        <span>{this.props.region}</span>
                    </div>
                    <div className="country-item__box">
                        <span>Capital:</span>
                        <span>{this.props.capital}</span>
                    </div>
                </div>
            </div>
         );
    }
}
export default withRouter(CountryItem)
