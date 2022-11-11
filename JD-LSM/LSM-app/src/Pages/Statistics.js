import React, { Component } from 'react';
import NavBar from '../components/navbar.js';
import DynamicChart from '../components/Chart.js';


//// GRAPH JS ////
class StatisticsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
    }
}
    
    componentDidMount() {
        document.title = 'Estadísticas'
        this.props.updateCurrentPage("estadisticas")
        this.setState(
            {data:this.props.data})

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) {
            this.setState({
                data: this.props.data
            })
        }
    }
    render() {
        
        return(
        

        <div className = "app--is-not-login">
            <div className='spacer'/> <div className='spacer'/>
            <section className = "sectionGlass container">
                <DynamicChart className="col-12" id={"example"} data={this.state.data}/>
            </section>
        </div>
        
        )
    }
}

export default StatisticsView;