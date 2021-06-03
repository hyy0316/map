import React from 'react';
import { Select } from 'antd';
import * as echarts from 'echarts';
import 'antd/dist/antd.css';
var worldMap=[];
const { Option } = Select;
const data10 = [{value:10, name:'行业3'},{value:10, name:'材料'},{value:30, name:'工业'},{value:25, name:'能源'},{value:50, name:'金融'},{value:30, name:'电信'},{value:35, name:'技术'},{value:50, name:'行业1'},{value:20, name:'行业2'},{value:50, name:'行业4'},];
const data5 =[{value:2, name:'T1'},{value:2, name:'T2'},{value:8, name:'T3'},{value:8, name:'T4'},{value:50, name:'T5'},];
const color10=['#6c7bd3','#00293b','#c7d2ec','#5987da','#0070bc','#e44261','#f08900','#e8a92c','#67ba69','#00c4b3'];
const color5=['#6c7bd3','#1b86d9','#0060ba','#006187','#6998b8'];

class ContinentBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selctData:[{key:"1",name:'饼图-10'},{key:"2",name:'饼图-5'}],
      curccentData:'饼图1',
      data: data10,
      color: color10,
    };
  }
  componentDidMount(){
    this.setState({
        dataMap:worldMap,
      })
  }
  _selectData =(e)=>{
      const data = this.state.selctData.find(item=>item.name==e);
      if(data){
        if("1"===data.key){
          this.setState({
            data:data10,
            color:color10
          })
        }else{
          this.setState({
            data:data5,
            color:color5
          })
        }
        this.setState({
          curccentData:data.data
        })
      }
  }
  render() {
    const optiops = this.state.selctData.map((item,index)=>{
      return(<Option value={item.name} key={index}>{item.name}</Option>) 
    })
    return (
      <div className="main" >
        <div className="contain">
        <Select className="select" style={{position:'absolute',left:'500px',top:'150px', zIndex: '99999',width: 120}} defaultValue={this.state.selctData[0]?.name} allowClear onChange={this._selectData}>
          {optiops}
        </Select>
        <Bar className="map" data={this.state.data} {...this.state} ></Bar>
        </div>
      
      </div>
    );
  }
  
}
class Bar extends React.Component{

  constructor(props){
    super(props);
  }
  bar() {
    const myChart = echarts.init(document.getElementById('main'));
    window.addEventListener('resize', function () {
      myChart.resize()
    });
  
    const option = {
      color: this.props.color,
      tooltip : {
          trigger: 'item',
          formatter: "{b}<br/>项目数量:{c}"
      },
      toolbox: {
          show : true,
      },
        legend: {
          orient: 'vertical',
          right:'5%',
          align:'left',
          top:'middle',
          textStyle: {
              color:'#8C8C8C'
          },
          height:250
      },
      series : [
          {
              name:'行业',
              label:false,
              type:'pie',
              radius : [0, 150],
              data:this.props.data
          }
      ]
    };
  
    myChart.setOption(option);
  }
    componentDidUpdate(){
      this.bar()
    } 
  render(){
    return (<div id="main" style={{height:'700px',width:'700px'}}></div>)
  }
  
}
export default ContinentBar;