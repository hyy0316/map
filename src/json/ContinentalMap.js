/**
 * Created by jkwu on 2019-05-29.
 */
import React, { Component } from 'react';
import { Charts, propsCompose } from '../../../../../src/components';
const {Chart, Geom, Tooltip, Guide } = Charts;
import DataSet from "@antv/data-set";
import worldData from './worldChinese.json';

const cols = {
    longitude: {
        sync: true,
        range: [0, 1]
    },
    latitude: {
        sync: true,
        range: [0, 1]
    }
};

const constructGeoJSON = (features) => {
    if (!features) return false;
    if (Array.isArray(features)) {
        return {
            type: 'FeatureCollection',
            features: [...features],
        };
    }
    return features;
};

@propsCompose
export default class ContinentalMap extends Component {
    constructor(props) {
        super(props);
        const continentChineseMap = new Map();
        continentChineseMap.set('North America', '北美洲');
        continentChineseMap.set('South America', '南美洲');
        continentChineseMap.set('Asia', '亚洲');
        continentChineseMap.set('Africa', '非洲');
        continentChineseMap.set('Europe', '欧洲');
        continentChineseMap.set('Oceania', '大洋洲');
        continentChineseMap.set('Antarctica', '南极洲');
        this.continentChineseMap = continentChineseMap;
        this.state = { chinaGeo: null };
    }

    _onPolygonClick = (ev) => {
        if (ev.data && ev.data._origin) {
            //改变值
            const name = ev.data._origin.CONTINENT;
            const { changeContinental } = this.props;
            changeContinental && changeContinental(name);
        }
    };

    componentDidMount() {
        this.setState({
            chinaGeo: worldData,
        });
    }

    processGeoData = (geoData) => {
        const formattedFeas = geoData && geoData.features.map((v, i) => {
            const values = [1999, 2000, 3000, 8000, 900, 10000, 55555];
            let value = values[0];
            const CONTINENT = v.properties.CONTINENT;
            if (CONTINENT === 'North America') { // 北美洲
                value = values[0];
            } else if (CONTINENT === 'South America') { // 南美洲
                value = values[1];
            } else if (CONTINENT=== 'Asia') { // 亚洲
                value = values[2];
            } else if (CONTINENT=== 'Africa') { // 非洲
                value = values[3];
            } else if (CONTINENT === 'Europe') { // 欧洲
                value = values[4];
            } else if (CONTINENT === 'Oceania') { // 大洋洲
                value = values[5];
            } else if (CONTINENT === 'Antarctica') { // 南极洲
                value = values[6];
            }
            return {
                ...v,
                NAME: v.properties.NAME,
                VALUE: value,
                CONTINENT: v.properties.CONTINENT,
                CHINESECONTINENT: this.continentChineseMap.get(v.properties.CONTINENT),
            };
        })
          .filter(item => item.CONTINENT !== 'Antarctica');

        const geoDv = new DataSet.View().source(constructGeoJSON(formattedFeas), {
            type: 'GeoJSON',
        });
        return geoDv;
    };

  render() {
    const { chinaGeo } = this.state;
    if(!chinaGeo) {
      return '数据加载中...'
    }
    const data = this.processGeoData(chinaGeo);
    return (
      <Chart
        scale={cols}
        forceFit
        height={380}
        data={data}
        padding='auto'
        onGetG2Instance={g2Chart => {this.chartIns = g2Chart;}}
        onPlotClick={this._onPolygonClick}
        onPolygonClick={this._onPolygonClick}
      >
          <Tooltip showTitle={false} />
          <Geom
            type="polygon"
            position="longitude*latitude"
            color={["CONTINENT*VALUE", (CONTINENT, value) => {
                if (CONTINENT === 'North America') { // 北美洲
                    return '#ed8391';
                } else if (CONTINENT === 'South America') { // 南美洲
                    return '#ffdeb9';
                } else if (CONTINENT=== 'Asia') { // 亚洲
                    return '#C97D83';
                } else if (CONTINENT=== 'Africa') { // 非洲
                    return '#c98e60';
                } else if (CONTINENT === 'Europe') { // 欧洲
                    return '#ee968e';
                } else if (CONTINENT === 'Oceania') { // 大洋洲
                    return '#ffb114';
                } else if (CONTINENT === 'Antarctica') { // 南极洲
                    return 'transparent';
                }
            }]}
            shape="stroke"
            style={{
                stroke: 'transparent',
                lineWidth: .5
            }}
            tooltip={["CHINESECONTINENT*VALUE", (CHINESECONTINENT, VALUE) => {
                return {
                    name: CHINESECONTINENT,
                    value: VALUE,
                }
            }]}>
              <Guide>
                  {
                      ["北美洲","南美洲","亚洲","非洲","欧洲","大洋洲"].map((item, index) => {
                          const values = [1999, 2000, 3000, 8000, 900, 10000, 55555];
                          const position = [
                              {longitude: -115.346275737027085, latitude: 45.436414563674157},
                              {longitude: -75, latitude: -10},
                              {longitude: 80.59321584129384, latitude: 35.28764558844343},
                              {longitude: 16.47586331488153, latitude: 6.575266967230023},
                              {longitude: 30.030162386095647, latitude: 53.52227823415808},
                              {longitude: 120.48183163529364, latitude: -25.734306190383034},
                          ];
                          return (<Guide.Text
                            top
                            position={position[index]}
                            content={`${item} ${values[index]}`} // {string} 文本的内容
                            style= {{
                                fill: '#fff', // 文本颜色
                                // fill: '#eeeeee', // 文本颜色
                                fontSize: '10', // 文本大小
                            }} // 文本的图形样式属性
                          />);
                      })
                  }
              </Guide>
          </Geom>
      </Chart>
    );
  }
}
