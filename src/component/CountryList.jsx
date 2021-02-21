import React, { Component } from 'react';
import {  withRouter  } from 'react-router-dom';
import CountryItem from './CountryItem';

class CountryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            regionType : this.props.regionType
          };
        }
        componentDidUpdate(prevProps,prevState) {
          if(prevProps.regionType != this.props.regionType && this.props.regionType != 'all' ){
            fetch(`https://restcountries.eu/rest/v2/region/${this.props.regionType}`)
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  isLoaded: true,
                  items: result
                });
              },
            )
          }else if( prevProps.regionType != 'all' && this.props.regionType == 'all' ){
            fetch(`https://restcountries.eu/rest/v2/${this.props.regionType}`)
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  isLoaded: true,
                  items: result
                });
              },
            )
          }
        }
        componentDidMount() {
          if( this.state.regionType == "all"){
            fetch(`https://restcountries.eu/rest/v2/${this.props.regionType}`)
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  isLoaded: true,
                  items: result
                });
              },
            )
          }else{
            fetch(`https://restcountries.eu/rest/v2/region/${this.props.regionType}`)
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  isLoaded: true,
                  items: result
                });
              },
            )
          }
        }
    render() { 
        const { items } = this.state; 

        return ( 
          <>
            <div className="d-none w-100" id="notFound">
              <h2 className="text-danger text-centert">Data Not Found</h2>
            </div>
            <div className="country-list">
                {items.map(item => (
                    <CountryItem key={item.numericCode} title={item.name} capital={item.capital} region={item.region} population={item.population} img={item.flag}/>
                ))}
            </div>
          </>
         );
    }
}

export default withRouter(CountryList); 