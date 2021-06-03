// import React from 'react';
// import './App.css';
// import {Table, Menu} from 'antd';
// import echarts from 'echarts';
// import $ from 'jquery';
// import '../node_modules/echarts/map/js/world.js';
// import '../node_modules/echarts/map/js/china.js';
// // import './json/ContinentalMap'
// let axios = require('axios');
// var worldData
// var rankList
// var chinaData
// var chinaList=[]
// var worldList=[]
// var chinaMap=[]
// var worldMap=[]
// var chinaHeader=[]
// var worldHeader=[]
// var promise1=new Promise((resolve, reject) => {//世界肺炎数据
//   axios.post('https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoGlobalStatis,FAutoContinentStatis,FAutoGlobalDailyList,FAutoCountryConfirmAdd').then((res) => {
// //    console.log(res.data.data.FAutoGlobalStatis)
//      worldData=res.data.data.FAutoGlobalStatis
//      resolve();
//  });
// });
// var promise2=new Promise((resolve, reject) => {//世界各国肺炎排行
//   axios.post('https://api.inews.qq.com/newsqa/v1/automation/foreign/country/ranklist').then((res) => {
// //    console.log(res.data.data)
//      rankList=res.data.data
//      resolve();
//  });
// });
// var promise3=new Promise((resolve, reject) => {//中国肺炎数据
//  $.ajax({
//    type: "get",
//    url: 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5',
//    dataType: 'jsonp', //【jsonp进行跨域请求 只支持get】
//    success: function(data) { //【成功回调】
//         chinaData=JSON.parse(data.data)
//         resolve();
//    },
//    });
// });


// class Map extends React.Component{//肺炎地图
    
//    map() {
//     //  const max=200000
//      const show=false
//      const text='世界地图'
//      const name={
//       "Asia": "亚洲",
//       "Oceania": "大洋洲",
//       "Europe": "欧洲",
//       "North America": "北美洲",
//       "South America": "南美洲",
//       "Africa": "非洲"
//     }
//     var myChart = echarts.init(document.getElementById('main'));
//     window.addEventListener('resize', function () {
//       myChart.resize()
//     });
//     const continent = require('./json/continent.json');
//     echarts.registerMap('continent', continent);

//     const option = {
//       title : {
//           text : text,
//           left: 'center'
//       },
//       tooltip : {
//           trigger: 'item',
//           formatter: function (params){
//               var value = params.value + '万人次 （' + (params.value/98.19).toFixed(2) + '%）';
//               return params.seriesName + '<br/>' + params.name + ' : ' + value;
//           }
//       },
//       toolbox: {
//           show : true,
//           orient : 'vertical',
//           x: 'right',
//           y: 'center',
//           feature : {
//               mark : {show: true},
//               dataView : {show: true, readOnly: false},
//               restore : {show: true},
//               saveAsImage : {show: true}
//           }
//       },
//       dataRange: {
//           min: 0,
//           max: 1000,
//           // text:['熱', '冷'],
//           // splitNumber:0,
//           color: ['orangered','yellow','lightskyblue']
//       },
//       series : [
//           {
//               name: '2013年出境目的地（洲际統計）',
//               type: 'map',
//               mapType: 'continent', // 自定義擴展圖表類型
//               itemStyle:{
//                   normal:{label:{show:true}},
//                   emphasis:{label:{show:true}}
//               },
//               nameMap:name,
//               data:[
//                   {name: '亚洲', value: 8967.69},
//                   {name: '大洋洲', value: 592.09},
//                   {name: '欧洲', value: 183.62},
//                   {name: '北美洲', value: 441.63},
//                   {name: '南美洲', value: 210.41},
//                   {name: '非洲', value: 22.5837}
//               ],
//               // geoCoord:{'大洋洲':[134.6484375,-22.593726063929296],'欧洲':[ 96.328125,64.77412531292873],
//               // },
//               // textFixed:{'大洋洲' : [300, 0]}
              
//               // 文本位置修正
//               // textFixed : {
//               //     'Oceania' : [3000, 0],
//               //     'Africa' : [10, -20],
//               //     'North America' : [20, 0],
//               //     'South America' : [0, -10],
//               //     'Asia' : [10, -30],
//               //     'Europe' : [20, -10],
//               // }
//           }
//       ]
//   };

//     myChart.setOption(option);
//   }
//     componentDidUpdate(){
//       this.map()
//     }
//   render(){
//     return (<div id="main"></div>)
//   }
  
// }

// class WorldMap extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       current: 'china',
//       dataSource:[],//列表数据
//       dataMap:[],//地图数据
//     };
//   }

//   componentDidMount(){
//     this.setState({
//         dataSource:worldList,
//         dataMap:worldMap,
//         header:worldHeader
//       })
      
//     Promise.all([promise1, promise2, promise3]).then((values) => {
    
//         rankList.forEach((item,i)=>{
//             // console.log(item);
//           //世界列表数据
//           worldList[i]={
//             area:item.name,
//             new:item.confirmAdd,
//             total:item.confirm,
//             death:item.dead,
//             cure:item.heal,
//           }
//           //世界地图数据
//           worldMap[i]={
//             name:item.name,
//             value:item.confirm,
//             continent:item.continent
//           }
//         })
//         worldMap.push({name:'中国',value:chinaData.chinaTotal.confirm,continent: "亚洲"})
        
//         this.setState({
//             rankList:rankList,
//             dataSource:worldList,
//             dataMap:worldMap,
//         })
//     });
 
//   }

//   groupBy(array, f) {
//     var _that = this;
//    _that.groupArr = [];
//    const groups = {};
//    array.forEach(function(o) {
//        const group = JSON.stringify(f(o));
//        _that.groupArr.push(group);
//        groups[group] = groups[group] || [];
//        groups[group].push(o);
//    });
//    console.log(groups);
//    return groups;
// }


//   render() {
      
//     return (
//       <div>
//         <div className='nav'>
//       {/* <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal"> */}
//         {/* <Menu.Item key="sevenContinentsWorld"> */}
//           七大洲地图
//         {/* </Menu.Item> */}
//       {/* </Menu> */}
//       </div>
//      {/* <Header header={this.state.header}></Header> */}
//       <Map data="world"dataMap={this.state.dataMap}></Map>
//       {/* <List dataSource={this.state.dataSource}></List> */}
//       </div>
//     );
//   }
  
// }

// export default WorldMap;
