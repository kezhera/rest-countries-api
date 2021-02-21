import React, { Component } from 'react';
import { Link , withRouter  } from 'react-router-dom';

class Region extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            countrys : document.getElementsByClassName('country-item'),
            searchValue : ''
         }
    } 
     
    handleClick = e => {
        let dropdown = e.target.parentNode
        let dropdownMenu = dropdown.getElementsByClassName('dropdown-content') ; 
        dropdown.classList.toggle('active');
        dropdownMenu[0].classList.toggle('active');
    }

    searchFocus = e => {
        this.setState({
            searchValue : e.target.value.toUpperCase()
        }) 
        const countrys = this.state.countrys;
        for( let i=0; i<countrys.length; i++) { 
            var txt = countrys[i].getElementsByClassName('country-item__title')[0].innerText.toUpperCase();
            if( e.target.value.toUpperCase() == '' ){
                countrys[i].classList.remove('d-none')
            }else if( txt.includes(e.target.value.toUpperCase()) ){
                countrys[i].classList.remove('d-none')
            }else{
                countrys[i].classList.add('d-none')
            }
        }
        if( document.getElementsByClassName('country-item d-none').length == 250 ){
            document.getElementById('notFound').classList.add('d-block')
        }else{
            document.getElementById('notFound').classList.remove('d-block')
        }
    }
 
    render() { 
        const regionList = [ 'Africa' , 'Americas', 'Asia' , 'Europe' , 'Oceania' ];
        return ( 
            <div className="region-head w-100 my-5">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="search">
                            <button className="search-btn">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                            <input type="text" className="search-input" placeholder="Search for a country..." onFocus={this.searchFocus} onChange={this.searchFocus} />
                        </div>

                        <div className="dropdown">
                            <div className="dropdown-head" onClick={this.handleClick} >
                                <span className="dropdown-title" onClick = {(event) => event.stopPropagation()}>Filter by Region</span>
                                <i className="fa fa-caret-down" aria-hidden="false" onClick = {(event) => event.stopPropagation()} ></i>
                            </div>
                            <div className="dropdown-content">
                                <ul className="dropdown-list">
                                    {
                                        regionList.map( (item , i ) => (
                                            <li key={i} >
                                                <Link  to={{
                                                    pathname: `/region/${item}`,
                                                    region: `${item}`
                                                    }} >
                                                        {item} 
                                                </Link >   
                                            </li> 
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default withRouter(Region)