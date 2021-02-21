import React, { Component } from 'react';
import { Link , withRouter   } from 'react-router-dom';

class CountryInner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : [], 
            obj : {
                languages : [] , 
                topLevelDomain : [] , 
                currencies : [] , 
                borders : []
            },
            borderNameList : [] , 
            borderList : []
        }
    }
    
    componentDidUpdate(prevProps ) {
        if( prevProps.location.pathname != this.props.location.pathname ) {
            this.setState({
                items : [], 
                obj : {
                    languages : [] , 
                    topLevelDomain : [] , 
                    currencies : [] , 
                    borders : []
                },
                borderNameList : [] , 
                borderList : []
            });
            fetch(`https://restcountries.eu/rest/v2/name/${this.props.location.pathname.replace('/inner/' , '')}`)
            .then(res => res.json())
            .then(
              (result) => {
                  this.setState({
                      items: result,
                      obj : JSON.parse(JSON.stringify(result[0]))
                    });       
                  this.state.obj.borders.map( item => 
                  fetch(`https://restcountries.eu/rest/v2/alpha/${item}`)
                  .then(res => res.json())
                  .then(
                      (result) => {
                          this.setState(prevState => ({
                              borderNameList: this.state.borderNameList.concat(result.name),
                              borderList: this.state.borderList.concat(item)
                          }))
                      },
                  )
                  )
              },
            )
        }
      }
    componentDidMount() {
        fetch(`https://restcountries.eu/rest/v2/name/${this.props.location.pathname.replace('/inner/' , '')}`)
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                    items: result,
                    obj : JSON.parse(JSON.stringify(result[0]))
                  });       
                this.state.obj.borders.map( item => 
                fetch(`https://restcountries.eu/rest/v2/alpha/${item}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState(prevState => ({
                            borderNameList: this.state.borderNameList.concat(result.name),
                            borderList: this.state.borderList.concat(item)
                        }))
                    },
                )
                )
            },
          )    
      }
    render() {
        const { obj } = this.state;
        const { borderNameList } = this.state;
        const { borderList } = this.state;
        const languagesList = obj.languages;
        const topLevelDomainList = obj.topLevelDomain;
        const currenciessList = obj.currencies;

        const infoOBG = {
            "Native Name" : obj.nativeName ,
            "Population" : obj.population ,
            "Region" : obj.region , 
            "Subregion" : obj.subregion , 
            "Capital" : obj.capital 
        }
        const borderMap  =  borderList.map( (item , i) => {
           return (
            <li className="inner-btn" key={i}>
                <Link to={{
                    pathname: `/inner/${borderNameList[i]}`,
                    name: borderNameList[i]
                    }} >
                    {item}
                </Link>
            </li>
           )
        })
        const countryList = Object.keys(infoOBG).map((key ) => {
            return (
             <li className="inner-box" key={ key}>
                 <span className="selection">{ key } :</span>
                 <span className="result">
                     {infoOBG[key]}
                 </span>
             </li>
            );
         }) 
        return ( 
            <>
                <div className="w-100">
                    <button onClick={this.props.history.goBack} className="back-link inner-btn">
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        Back
                    </button>
                </div>

                <div className="w-50">
                    <div className="inner-img">
                        <img src={obj.flag} alt=""/>
                    </div>
                </div>
                <div className="w-50 pl-5">
                    <h2 className="inner-title">{obj.name}</h2>
                    <ul className="inner-list"> 
                        { countryList }

                        <li className="inner-box" >
                            <span className="selection">Top Level Domain: </span>
                            <span className="result">  
                                { topLevelDomainList.map( (item , i)  => (
                                    <React.Fragment key={i}> 
                                        {item}
                                        {i < (topLevelDomainList.length - 1) ? ' , ' : ''}
                                    </React.Fragment>
                                )) }
                            </span>
                        </li>
                        <li className="inner-box" >
                            <span className="selection">Currencies: </span>
                            <span className="result">  
                                { currenciessList.map( (item , i)  => (
                                    <React.Fragment key={i}> 
                                        {item.name }
                                        {i < (currenciessList.length - 1) ? ' , ' : ''}
                                    </React.Fragment>
                                )) }
                            </span>
                        </li>
                        <li className="inner-box" >
                            <span className="selection">Languages: </span>
                            <span className="result">  
                                { languagesList.map( (item , i)  => (
                                    <React.Fragment key={i}> 
                                        {item.name }
                                        {i < (languagesList.length - 1) ? ' , ' : ''}
                                    </React.Fragment>
                                )) }
                            </span>
                        </li>
                    </ul>
                    <div className="inner-border">
                        <span className="inner-border-title">Border Countries:</span>
                        <ul className="inner-border-list">
                            { borderMap }
                        </ul>
                    </div>
                </div>
                    
            </>
         );
    }
}
export default withRouter(CountryInner);

