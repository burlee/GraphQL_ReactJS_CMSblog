import React, { Component } from 'react'
import axios from 'axios'
import Chart from 'react-apexcharts'

export default class Async extends Component {

  state = {
    data: [],
    options : {
      chart: {
          height: 350,
          type: 'radialBar',
      },
      plotOptions: {
          radialBar: {
              hollow: {
                  size: '70%',
              }
          },
      },
      series: [70],
      labels: ['Cricket'],
    }
  }

  componentDidMount(){
      
      axios.get(`https://jsonplaceholder.typicode.com/posts`) // Zapytanie do serwera metodą get
        .then(({data}) => { // Destrukturyzacja danych
            this.setState({data})
        })
        .then(()=> console.log(this.state.data)) // [] - tablica w stanie komponentu wyświetla się poprawnie

        console.log(this.state.data) // [] - tablica w stanie komponentu wyświetla się jako pusta
  }

  changeData = () => {
    const dataUpdate = [1111,22,222,333,444,111];

    this.setState({ options : {xaxis : {categories : dataUpdate}} })
  }

  render() {
    return (
      <div>
        <Chart options={this.state.options} series={this.state.options.series} type="pie" width={500} height={320} />
        <Chart options={this.state.options} series={this.state.options.series} type="radialBar" width={500} height={320} />

        <button onClick={this.changeData}>:-)</button>
      
      </div>
    )
  }
}
