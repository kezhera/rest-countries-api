import React, { Component } from 'react';
import { withRouter  } from 'react-router-dom';
import CountryInner from './CountryInner';
import CountryList from './CountryList';
import Region from './Region';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            regionType : 'all'
         }
    }

    render() {
        return ( 
            <React.Fragment>        
                <Region />
                {
                    this.props.location.region == undefined
                    ? <CountryList regionType={this.state.regionType} />
                    : <CountryList regionType={this.props.location.region} />
                }
            </React.Fragment>
         );
    }
}

export default withRouter(Content); 