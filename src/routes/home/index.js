import React, { PureComponent } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import routerPush from 'utils/routerPush'
import { Input, Icon } from 'antd'
import { namesMap } from 'routerForm'
import ReactEcharts from 'echarts-for-react'
import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmap'
// import {Map, Marker} from '../../../src'
import {simpleMapStyle} from './mapstyle'
import './index.css'


var markers = [
  {
    lng: 116.402544,
    lat: 39.928216
  },
  {
    lng: 119.0874,
    lat: 36.665582
  },
  {
    lng: 112.538537,
    lat: 37.874899
  },
  {
    lng: 114.501011,
    lat: 33.920864
  },
  {
    lng: 109.210063,
    lat: 34.339622
  },
  {
    lng: 99.430831,
    lat: 38.211366
  },
  {
    lng: 89.430831,
    lat: 33.311366
  },
  {
    lng: 99.430831,
    lat: 32.511366
  },
  {
    lng: 79.430831,
    lat: 35.611366
  },
  {
    lng: 83.430831,
    lat: 39.711366
  },
];

const CustomControl = (props) => {
  let map = props.map;
  return <div onClick={()=>{map.setZoom(map.getZoom() + 2)}} style={{position: 'absolute', right: '10px', top: '10px',  color: 'white', background: 'blue'}}>放大2级</div>
}
@routerPush
@immutableRenderDecorator
export default class HomePage extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      value: 0
    }
  }

  getOption = () => ({
    title: {
      text: '项目服务'
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ['总需求', '未完成', '进行中', '已完成']
    },
    yAxis: {},
    series: [{
      // name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10]
    }]
  })
  getOption2 = () => ({
    title: {
      text: '项目完成度',
      // subtext: '纯属虚构',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          {value: 335, name: '未完成的服务项目'},
          {value: 310, name: '正在进行中的服务项目'},
          {value: 234, name: '以完成的服务项目'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
  getOption3 = () => {
    return {
      title: {
        text: '新增志愿活动次数'
      },
      tooltip: {
        trigger: 'axis'
      },
      // legend: {
      //   data: ['邮件营销', '联盟广告', '视频广告']
      // },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: [150, 232, 201, 154, 190, 330, 410]
        }
      ]
    }
  }
  onChartClick = (param, echarts) => {
    console.log(param, echarts)
    alert('chart click')
    this.setState({
      cnt: this.state.cnt + 1,
    })
  }

  onChartLegendselectchanged = (param, echart) => {
    console.log(param, echart)
    alert('chart legendselectchanged')
  }

  onChartReady = (echarts) => {
    console.log('echart is ready', echarts)
  }

  render () {

    return (
      <div>
        <div className="first-title">
          <Icon type="caret-right" style={{fontSize: 16, color: '#a4b7cc'}} /> 系统消息
        </div>
        <div className="page-content"> 通知公告<Input placeholder="value" style={{width: 400, marginLeft: 20}} />
        </div>
        <div className="page-content"> 暂无消息<Input placeholder="default size" style={{width: 400, marginLeft: 20}} />
        </div>
        <div className="page-content"> 暂无消息<Input placeholder="default size" style={{width: 400, marginLeft: 20}} />
        </div>
        <div className="page-content"> 暂无消息<Input placeholder="default size" style={{width: 400, marginLeft: 20}} />
        </div>
        <div className="page-content"> 暂无消息<Input placeholder="default size" style={{width: 400, marginLeft: 20}} />
        </div>
        <div className="page-content"> 暂无消息<Input placeholder="default size" style={{width: 400, marginLeft: 20}} />
        </div>
        <div className="page-content"> 暂无消息<Input placeholder="default size" style={{width: 400, marginLeft: 20}} />
        </div>
        <div className="page-content"> 暂无消息<Input placeholder="default size" style={{width: 400, marginLeft: 20}} />
        </div>

        <div className="first-title">
          <Icon type="caret-right" style={{fontSize: 16, color: '#a4b7cc'}} /> 服务网点概况
        </div>
        <div className="map-show">
          <Map center={{lng: 113.279814, lat: 26.053599}} zoom="11"
               mapStyle={simpleMapStyle}>
            <Marker position={{lng: 113.279814, lat: 26.053599}}
                    icon="simple_red"
                    events={{
                      click: () => {
                        console.log('marker click event');
                      }
                    }}/>
            <Marker position={{lng: 113.279810, lat: 26.053580}} icon="simple_blue" />
            <Marker position={{lng: 113.279820, lat: 26.053583}} icon="loc_blue" />
            <Marker position={{lng: 113.279830, lat: 26.053587}} icon="loc_red" />
            <Marker position={{lng: 113.279840, lat: 26.053593}} icon="start" />
            <Marker position={{lng: 113.279850, lat: 26.053596}} icon="end" />
            <NavigationControl />
            <InfoWindow position={{lng: 113.279814, lat: 26.053599}}
                        text="志愿活动" title="正在进行" />
          </Map>

        </div>
        <div className="depart-server">
          <div className="first-title">
            <Icon type="caret-right" style={{fontSize: 16, color: '#a4b7cc'}} /> 项目服务概况
            <div>
              <div className="four-part-echarts">
                <ReactEcharts
                  option={this.getOption3()}
                  style={{height: '350px', width: '40%', float: 'left'}}
                  className='react_for_echarts' />

              </div>
              <div className="four-part-echarts">
                <ReactEcharts
                  option={this.getOption3()}
                  style={{height: '350px', width: '40%', float: 'left'}}
                  className='react_for_echarts' />
              </div>
              <div className="four-part-echarts">
                <ReactEcharts
                  option={this.getOption()}
                  style={{height: '400px', width: '30%', float: 'left'}}
                  opts={{renderer: 'svg'}}
                  className='react_for_echarts' />
              </div>
              <div className="four-part">
                <ReactEcharts
                  option={this.getOption2()}
                  style={{height: 300, width: '50%', float: 'right'}}
                  onChartReady={this.onChartReady}
                />
              </div>
            </div>
          </div>

        </div>
        <div className="first-title" style={{clear: 'both'}}>
          > 风云榜
        </div>
        <div className="echarts-showlist">
          <div className="index-show-left">
            <ReactEcharts
              option={this.getOption()}
              style={{height: '400px', width: '30%', float: 'left', clear: 'both'}}
              opts={{renderer: 'svg'}}
              className='react_for_echarts' />
          </div>
          <div className="index-show-left">
            <ReactEcharts
              option={this.getOption()}
              style={{height: '400px', width: '30%', float: 'left'}}
              opts={{renderer: 'svg'}}
              className='react_for_echarts' />
          </div>
          <div className="index-show-left">
            <ReactEcharts
              option={this.getOption()}
              style={{height: '400px', width: '28%', float: 'left'}}
              opts={{renderer: 'svg'}}
              className='react_for_echarts' />
          </div>
        </div>
      </div>

    )
  }
}
