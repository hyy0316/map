import React from 'react';
import {Button} from 'antd';
import * as echarts from 'echarts';
const continent = require('./json/continent.json'); //洲际地图的json数据
const country = require('./json/WorldCountry.json'); //国家城市地图的json数据
//聚合函数
let groupBy =(array, f)=> {
     var groupArr = [];
     const groups = {};
     array.forEach(function(o) {
         const group = JSON.stringify(f(o));
         groupArr.push(group);
         groups[group] = groups[group] || [];
         groups[group].push(o);
     });
     return groups;
}
let nameArray=[];
let chinaName = [

  "委内瑞拉",
  
  "哥伦比亚",
  
  "巴拿马",
  
  "厄瓜多尔",
  
  "秘鲁",
  
  "巴西",
  
  "玻利维亚",
  
  "巴拉圭",
  
  "乌拉圭",
  
  "阿根廷",
  
  "福克兰群岛",
  
  "智利",
  
  "特立尼达和多巴哥",
  
  "圭亚那",
  
  "苏里南",
  
  "法属圭亚那",
  
  "澳大利亚",
  
  "斐济",
  
  "新西兰",
  
  "所罗门群岛",
  
  "瓦努阿图",
  
  "巴布亚新几内亚",
  
  "新喀里多尼亚",
  
  "南非",
  
  "赞比亚",
  
  "津巴布韦",
  
  "摩洛哥",
  
  "马达加斯加",
  
  "马里",
  
  "埃及",
  
  "埃塞俄比亚",
  
  "加蓬",
  
  "加纳",
  
  "几内亚",
  
  "冈比亚",
  
  "赤道几内亚",
  
  "突尼斯",
  
  "阿尔及利亚",
  
  "厄立特里亚",
  
  "利比亚",
  
  "肯尼亚",
  
  "尼日利亚",
  
  "乌干达",
  
  "喀麦隆",
  
  "苏丹",
  
  "象牙海岸",
  
  "纳米比亚",
  
  "尼日尔",
  
  "多哥",
  
  "塞内加尔",
  
  "塞拉利昂",
  
  "索马里",
  
  "斯威士兰",
  
  "乍得",
  
  "莫桑比克",
  
  "毛里塔尼亚",
  
  "马拉维",
  
  "安哥拉",
  
  "刚果民主共和国",
  
  "刚果共和国",
  
  "博茨瓦纳",
  
  "中非共和国",
  
  "卢旺达",
  
  "吉布提",
  
  "莱索托",
  
  "利比里亚",
  
  "布隆迪",
  
  "坦桑尼亚联合共和国",
  
  "布基纳法索",
  
  "贝宁",
  
  "南苏丹",
  
  "几内亚比绍",
  
  "索马里兰",
  
  "西撒哈拉",
  
  "阿富汗",
  
  "阿拉伯联合酋长国",
  
  "亚美尼亚",
  
  "阿塞拜疆",
  
  "孟加拉国",
  
  "不丹",
  
  "中国",
  
  "北塞浦路斯",
  
  "塞浦路斯",
  
  "格鲁吉亚",
  
  "印度",
  
  "伊朗",
  
  "伊拉克",
  
  "以色列",
  
  "约旦",
  
  "日本",
  
  "哈萨克斯坦",
  
  "吉尔吉斯斯坦",
  
  "柬埔寨",
  
  "韩国",
  
  "科威特",
  
  "老挝",
  
  "黎巴嫩",
  
  "斯里兰卡",
  
  "缅甸",
  
  "蒙古",
  
  "马来西亚",
  
  "尼泊尔",
  
  "阿曼",
  
  "巴基斯坦",
  
  "菲律宾",
  
  "朝鲜",
  
  "卡塔尔",
  
  "沙特阿拉伯",
  
  "叙利亚",
  
  "泰国",
  
  "塔吉克斯坦",
  
  "土库曼斯坦",
  
  "东帝汶",
  
  "土耳其",
  
  "印度尼西亚",
  
  "文莱",
  
  "乌兹别克斯坦",
  
  "越南",
  
  "西岸",
  
  "也门",
  
  "俄罗斯",
  
  "法国",
  
  "意大利",
  
  "西班牙",
  
  "德国",
  
  "乌克兰",
  
  "比利时",
  
  "捷克共和国",
  
  "罗马尼亚",
  
  "瑞士",
  
  "葡萄牙",
  
  "瑞典",
  
  "奥地利",
  
  "匈牙利",
  
  "塞尔维亚共和国",
  
  "克罗地亚",
  
  "保加利亚",
  
  "白俄罗斯",
  
  "斯洛伐克",
  
  "摩尔多瓦",
  
  "丹麦",
  
  "希腊",
  
  "立陶宛",
  
  "卢森堡",
  
  "拉脱维亚",
  
  "斯洛文尼亚",
  
  "波斯尼亚和黑塞哥维那",
  
  "爱尔兰",
  
  "阿尔巴尼亚",
  
  "挪威",
  
  "芬兰",
  
  "爱沙尼亚",
  
  "冰岛",
  
  "马其顿",
  
  "黑山",
  
  "荷兰",
  
  "波兰",
  
  "英国",
  
  "科索沃",
  
  "美利坚合众国",
  
  "墨西哥",
  
  "加拿大",
  
  "巴拿马",
  
  "多米尼加共和国",
  
  "哥斯达黎加",
  
  "洪都拉斯",
  
  "萨尔瓦多",
  
  "牙买加",
  
  "古巴",
  
  "伯利兹",
  
  "海地",
  
  "巴哈马",
  
  "尼加拉瓜",
  
  "格陵兰",
  
  "危地马拉",
  
  "波多黎各",
  
  "百慕大"
  
]
groupBy(country.features,(item,index) =>{
  nameArray.push(item.properties?.name)
});
// 中英文键值对 数据处理
let name = {}
for(let i = 0;i<chinaName.length;i++){
  name[nameArray[i]] = chinaName[i];
}

class Map extends React.Component{//地图

  constructor(props){
    super(props);
    this.state={};
  }
  map=()=> {
    let name=this.props.name 
    /* 获取业务数据 */
    const data= this.props?.data;
    const myChart = echarts.init(document.getElementById('main'));
    window.addEventListener('resize', function () {
      myChart.resize()
    });
    // 注册 洲际地图
    echarts.registerMap('continent', continent);
    
		const option = {
      title : {
        text: '\n投资地域统计',
        left: 'center',
        top: 'top',
        textStyle: {
          color: '#555'
        }
      },
      tooltip: {
            show: true,
            trigger: 'item',
            formatter:  (params)=>{
              const continental = Object.keys(name).find(key => name[key] === params.name);
              this.props.setContinent(continental);
             
              return "项目数量"+ ' : ' + params.value +'<br/>'+"总规模"+ ' : ' + params.data.sacle + '亿美元';
          }
      },
      toolbox: {
          show: true,
          orient: 'vertical',
          left: 'left',
          top: 'center',
          feature: {
              restore: {},
              saveAsImage: {}
          }
      },
      geo: {
        name: '',
        type: 'map',
        map: 'continent',
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#323c48',
            borderColor: '#111',
            borderWidth:'1px'
          },
          emphasis: {
            //areaColor: '#2a333d'
          }
        }
      },
      dataRange: {
        x: 'left',
        y: 'bottom',
        splitList: [
            {start: 30,color: '#1a6f99'},
            {start: 21, end: 29,color: '#45A5F8'},
            {start: 11, end: 20,color: '#8AC6FD'},
            {start: 6, end: 10,color: '#D2EAFF'},
            {start: 1, end: 5,color: '#B2CAE0'},
            {end: 1,color: '#eee'}
        ],
        color: ['#eee', '#bule']
    },
      series : [
        {
            type: 'map',
            mapType: 'continent',
            itemStyle:{
                normal:{
                  label:{
                    show:false
                  },
                  areaColor: '#B4CAE0',
                  borderColor: '#fff',
                  borderWidth: 1,
               },
                emphasis:{label:{
                  show:true,
                }}
            },
            nameMap:name,
            data:data
        }
    ]
    };

    myChart.setOption(option);
  }

  componentDidUpdate(){
    this.map()
  } 
  render(){
    return (<div id={"main"} style={{height:'700px',width:'700px'}}></div>)
  }
  
}
class Map2 extends React.Component{//地图

  constructor(props){
    super(props);
    this.state={
    }
  }
  map=()=> {
    /* 获取业务数据 */
    const data= this.props?.data;
    if(data.length < 1){
      return ;
    }
    const myChart = echarts.init(document.getElementById('main1'));
    window.addEventListener('resize', function () {
      myChart.resize()
    });
    // 注册 国家地图
    echarts.registerMap('country', this.props.countryGeoJson);
    

		const option = {
      title : {
        text: '\n投资地域统计',
        left: 'center',
        top: 'top',
        textStyle: {
          color: '#555'
        }
      },
      tooltip: {
        show: true,
        trigger: 'item',
        formatter:  (params)=>{
          return  params.name +'<br/>'+"总规模"+ ' : ' + params.value  ;
        }
      },
      toolbox: {
        show: false,
        orient: 'vertical',
        left: 'left',
        top: 'center',
        feature: {
            restore: {},
            saveAsImage: {}
        }
      },
      geo: {
        name: '',
        type: 'map',
        map: 'country',
        roam: false,
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#323c48',
            borderColor: '#111',
            borderWidth:'1px'
          },
          emphasis: {
            //areaColor: '#2a333d'
          }
        }
      },
      dataRange: {
        x: 'left',
        y: 'bottom',
        splitList: [
            {start: 30,color: '#1a6f99'},
            {start: 21, end: 29,color: '#45A5F8'},
            {start: 11, end: 20,color: '#8AC6FD'},
            {start: 6, end: 10,color: '#D2EAFF'},
            {start: 1, end: 5,color: '#B2CAE0'},
            {end: 1,color: '#eee'}
        ],
        color: ['#eee', '#bule']
    },
      series : [
        {
            type: 'map',
            mapType: 'country',
            itemStyle:{
                normal:{
                  label:{
                    show:false
                  },
                  areaColor: '#B4CAE0',
                  borderColor: '#fff',
                  borderWidth: 1,
               },
                emphasis:{label:{
                  show:true,
                }}
            },
            nameMap:name,
            data:data
        }
    ]
    };

    myChart.setOption(option);
  }

  componentDidUpdate(){
    this.map()
  } 
  render(){
    return (<div id={"main1"} style={{height:'700px',width:'700px'}}></div>)
  }
  
}

class ContinentMap extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dataMap:[],//大洲数据
      dataMap2:[],//城市数据
      continental:"",//选中的洲
      isInitialMap:true,//初始地图
      countryGeoJson:{...country,features:[]},
      name:{
        "Asia": "亚洲",
        "Oceania": "大洋洲",
        "Europe": "欧洲",
        "North America": "北美洲",
        "South America": "南美洲",
        "Africa": "非洲"
      }
    };
    this.dataMap2 = [
      {name: '亚洲',code:"Asia" },
      {name: '大洋洲', code:"Oceania"},
      {name: '欧洲', code:"Europe" },
      {name: '北美洲',code:"North America" },
      {name: '南美洲', code:"South America" },
      {name: '非洲', code:"Africa" }
    ]
  }
  componentDidMount(){
    // 加载数据,value:项目数量;sacle:规模
    const worldMap=[
      {name: '亚洲',code:"Asia" ,value: '35' ,sacle:'2'},
      {name: '大洋洲', code:"Oceania" ,value: '10' ,sacle:'2'},
      {name: '欧洲', code:"Europe" ,value: '1',sacle:'2'},
      {name: '北美洲',code:"North America" , value: '6',sacle:'2'},
      {name: '南美洲', code:"South America" ,value: '25',sacle:'2'},
      {name: '非洲', code:"Africa" ,value: '0',sacle:'2'}
    ];
    this.setState({
        dataMap:worldMap
    });

  }
  

  
  //获取鼠标移入的洲
  _setContinent =(continental)=>{
    if(continental === this.state.continental){
      return;
    }else{
      //获取 当前选中洲,具体国家的地图geojson
      let countryGeoJson = this.state.countryGeoJson;
      let ContinentCountry = groupBy(country.features,function(item) {
        return item.continent;
      });
      countryGeoJson.features = ContinentCountry[JSON.stringify(continental)] ? ContinentCountry[JSON.stringify(continental)] : [];
      //设置国家的数据
      this._setCountryData(ContinentCountry);
      let countryData = this.dataMap2.filter(item=>item.code == continental)[0];
      this.setState({
        continental:continental,
        continentalMap:continental,
        countryGeoJson:countryGeoJson,
        dataMap2:countryData && countryData?.data
      })
    }
    
  }

  _setCountryData = (ContinentCountry)=>{
    for(const i in ContinentCountry){
      let newArray = [];
      ContinentCountry[i].forEach((item)=>{
        newArray.push({
          "name":name[item.properties.name],
          "value":parseInt(Math.random()*100), //替换/添加 实际业务数据
        })
      });
      this.dataMap2.map((item)=>{
        if(i == JSON.stringify(item.code)){
          item.data = newArray
        }
      })
    }

  }
  showDesignatedState =(states)=>{
    let {name,dataMap,isInitialMap}= this.state;
    let newName ={},newdataMap =[];
    if(isInitialMap){
      states.map(state=>{
        if(name[state]){
          newName[state] = name[state];
          newdataMap.push(dataMap.filter(item=>item.code == state)[0]);
        }
      })
      console.log(newdataMap);
      for(let key in name){
        name[key] = '其他';
      }
      dataMap.map((item,index)=>{
        let result = states.find(e=>e == item.code);
        console.log(result);
        if(!result){
          item.name='其他';
        }
      })
      name= {...name,...newName};
      this.setState({
        name:name,
        dataMap,
      })
    }else{
      window.location.reload();
    }
    this.setState({
      isInitialMap:!isInitialMap
    })
    
  }

  render() {
    return (
      <div style={{display:'flex'}}>
        <div style={{height:'700px',width:'700px'}}>
        <Button type='primary'onClick={() => this.showDesignatedState(['Europe','South America'])}> { this.state.isInitialMap ? "显示欧美洲" : "显示初始地图"}</Button>
          <Map data={this.state.dataMap} setContinent={this._setContinent} name={this.state.name} ></Map>
        </div>
        <div style={{height:'700px',width:'700px'}}>
            <Map2  data={this.state.dataMap2}  countryGeoJson={this.state.countryGeoJson} ></Map2>
        </div>
        
      </div>
    );
  }
  
}

export default ContinentMap;
