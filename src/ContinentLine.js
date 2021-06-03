import React from 'react';
import { Select } from 'antd';
import * as echarts from 'echarts';
import 'antd/dist/antd.css';
const { Option } = Select;

class Line extends React.Component{//现

  constructor(props){
    super(props);
  }
  line() {
     const show=false
     const text='洲际地图'
     const name={
      "Asia": "亚洲",
      "Oceania": "大洋洲",
      "Europe": "欧洲",
      "North America": "北美洲",
      "South America": "南美洲",
      "Africa": "非洲"
    }
    const myChart = echarts.init(document.getElementById('main'));
    window.addEventListener('resize', function () {
      myChart.resize()
    });
    const option = {
      title: {
          text: '',
          textStyle: {
              align: 'center',
              color: '#fff',
              fontSize: 20,
          },
          top: '5%',
          left: 'center',
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              lineStyle: {
                  color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                          offset: 0,
                          color: 'rgba(0, 255, 233,0)'
                      }, {
                          offset: 0.5,
                          color: 'rgba(255, 255, 255,1)',
                      }, {
                          offset: 1,
                          color: 'rgba(0, 255, 233,0)'
                      }],
                      global: false
                  }
              },
          },
      },
      grid: {
          top: '15%',
          left: '5%',
          right: '5%',
          bottom: '15%',
          // containLabel: true
      },
      xAxis: [{
          type: 'category',
          axisLine: {
              show: true
          },
          splitArea: {
              // show: true,
              color: '#f00',
              lineStyle: {
                  color: '#f00'
              },
          },
          axisLabel: {
              color: '#fff'
          },
          splitLine: {
              show: false
          },
          boundaryGap: false,
          data: ['A', 'B', 'C', 'D', 'E', 'F'],
  
      }],
  
      yAxis: [{
          type: 'value',
          min: 0,
          // max: 140,
          splitNumber: 4,
          splitLine: {
              show: true,
              lineStyle: {
                  color: 'rgba(255,255,255,0.1)'
              }
          },
          axisLine: {
              show: false,
          },
          axisLabel: {
              show: false,
              margin: 20,
              textStyle: {
                  color: '#d1e6eb',
  
              },
          },
          axisTick: {
              show: false,
          },
      }],
      series: [{
              name: '注册总量',
              type: 'line',
              // smooth: true, //是否平滑
              showAllSymbol: true,
              // symbol: 'image://./static/images/guang-circle.png',
              symbol: 'circle',
              symbolSize: 25,
              lineStyle: {
                  normal: {
                      color: "#6c50f3",
                      shadowColor: 'rgba(0, 0, 0, .3)',
                      shadowBlur: 0,
                      shadowOffsetY: 5,
                      shadowOffsetX: 5,
                  },
              },
              label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                      color: '#6c50f3',
                  }
              },
              itemStyle: {
                  color: "#6c50f3",
                  borderColor: "#fff",
                  borderWidth: 3,
                  shadowColor: 'rgba(0, 0, 0, .3)',
                  shadowBlur: 0,
                  shadowOffsetY: 2,
                  shadowOffsetX: 2,
              },
              tooltip: {
                  show: false
              },
              data: this.props.data
          },
      ]
  };
    myChart.setOption(option);
  }
    componentDidUpdate(){
      this.line()
    } 
  render(){
    return (<div id="main" style={{height:'700px',width:'700px'}}></div>)
  }
  
}

class ContinentLine extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data : [{name: '亚洲', value: "Asia",data: [281.55, 398.35, 24.02, 179.55, 89.57, 35.14, ]},
      {name: '大洋洲', value: "Oceania" ,data:[502.84, 205.97, 332.79, 281.55, 398.35, 214.02, ]},
      {name: '欧洲', value: "Europe",data: [21.55, 39835, 242, 19.55, 289.57, 56.14, ]},
      {name: '北美洲', value: "North",data: [1.55, 398.35, 2102, 179.55, 29.57, 36.14, ]},
      {name: '南美洲', value: "South",data: [81.55, 398.35, 214.2, 179.55, 29.7, 356.14, ]},
      {name: '非洲', value: "Africa",data: [1.55, 398.35, 214.02, 17.55, 28957, 356.4, ]}],
      curccentData:[281.55, 398.35, 24.02, 179.55, 89.57, 35.14, ]
    };
  }
  componentDidMount(){
  }
  _selectData =(e)=>{
      const data = this.state.data.find(item=>item.name==e);
      if(data){
        this.setState({
          curccentData:data.data
        })
      }
  }
  render() {
    const optiops = this.state.data.map((item,index)=>{
      return(<Option value={item.name} key={index}>{item.name}</Option>) 
    })
    return (
      <div className="main" >
        <div className="contain">
        <Select className="select" style={{position:'absolute',left:'995px',top:'150px', zIndex: '99999',width: 120}} defaultValue={this.state.data[0]?.name} allowClear onChange={this._selectData}>
          {optiops}
        </Select>
        <Line className="map" data={this.state.curccentData} ></Line>
        </div>
      
      </div>
    );
  }
  
}

export default ContinentLine;