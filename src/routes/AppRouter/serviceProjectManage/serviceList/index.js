import React, { Component } from 'react'
// import {BrowserRouter as Router,Link} from 'react-router-dom'
import Choose from '../../component/choose/index'
import SearchDate from '../../component/searchWithDate/index'
import {Input, Menu, Dropdown, Button, Icon, message, Table} from 'antd'
import {Link} from 'dva/router'
import axios from 'axios'

const stateName = ['发布成功', '报名中', '报名结束活动未开始', '活动进行中', '活动结束']

class ServiceList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vpList: {
        Servers: [
          {
            key: '1',
            id: '1',
            title: '敬老爱老',
            user_name: 'cxy',
            start_at: '2015年3月21日',
            status: '发布成功',
            people_num: 3,
            has_people_num: 1
          }
        ],
        dataRange: []
      }
    }
    this.getServer = this.getServer.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentWillMount() {
    this.getServer()
  }

  handleMenuClick(e) {
    let value = e.key
    let status
    if (value === '0') {
      status = 1
    }
    else if (value === '1') {
      status = 3
    }
    else {
      status = 4
    }
    let url = 'http://volunteer.andyhui.xin/vps/list/' + status
    axios.get(url)
      .then(res => {
        console.log(res)
        if (res.data.code === 2000){
          const Servers = (res.data.vpList.data || []).map((item, index) => {
            let State = stateName[item.status]
            return {
              key:index,
              id: item.id,
              name: item.title,
              time: item.start_at,
              state: State,
              people_num: item.people_num,
              has_people_num: item.has_people_num,
              writer: item.user_name
            }
          })
          this.setState({Servers: Servers})
        }
        else {
          message.error('请重新登录')
          this.props.history.push('/')
        }
      })
   // message.info('暂时无法搜索.')
    // console.log('click', e.key)
  }

  handleSearch(e) {
    let value = e
    this.getServer("keyWords", value)
  }

  handleSearchDate(e) {
    this.setState({
      Servers: e
    })
  }

  getServer(order, string) {
    if (!order) {
      axios.defaults.headers.common['token'] = localStorage.getItem('token') || ''
      axios.get(`http://volunteer.andyhui.xin/vps`)
        .then(res => {
          if (res.data.code === 2000) {
            // console.log(res)
            const Servers = (res.data.vpList.data || []).map((item, index) => {
              let State
              if (item.apply_status === 0) {
                if (item.apply_res === 0) {
                  State = '未审核'
                }
              } else if (item.apply_status === 1) {
                if (item.apply_res === 0) {
                  State = '已拒绝'
                } else {
                  State = stateName[item.status]
                }
              }
              return {
                key:index,
                id: item.id,
                name: item.title,
                time: item.start_at,
                state: State,
                people_num: item.people_num,
                has_people_num: item.has_people_num,
                writer: item.user_name
              }
            })
            this.setState({Servers: Servers})
          }
          else {
            message.error("请重新登录")
            this.props.history.push('/')
          }
        })
    }
    else if (order === "status") {

    } else if (order === "keyWords") {
      let keyWords = string
      let i = 0
      axios.defaults.headers.common['token'] = localStorage.getItem('token') || ''
      axios.get(`http://volunteer.andyhui.xin/vps`)
        .then(res => {
          if (res.data.code === 2000) {
            let Servers = (res.data.vpList.data || []).map((item, index) => {
              let str = new RegExp(keyWords)
              if (str.test(item.title)) {
                i = 1
                return {
                  key: index,
                  id: item.id,
                  name: item.title,
                  time: item.start_at,
                  state: item.status
                }
              } else {
              }
            })
            if (i) {
              let Ans = []
              for (let i = 0; i < Servers.length; i++) {
                if (typeof(Servers[i]) === "undefined") {
                }
                else {
                  Ans.push(Servers[i])
                }
              }
              Servers = Ans
              this.setState({Servers: Servers})
            } else {
              this.setState({
                Servers: [{
                  key: 1,
                  id: 1,
                  name: '没有找到',
                  time: '没有找到',
                  state: '没有找到',
                }]
              })
            }
          }
          else {
            message.error("请重新登录")
            this.props.history.push('/')

          }
        })
    }
  }

  render() {
    const searchContent = ['正在报名', '正在进行', '已结束']
    const Search = Input.Search;
    let searchMenu = []
    for (let i = 0; i < searchContent.length; i++) {
      searchMenu.push(<Menu.Item key={i}>{searchContent[i]}</Menu.Item>)
    }
    const menu = (
      <Menu onClick={this.handleMenuClick.bind(this)}>
        {searchMenu}
      </Menu>
    );

    let styleButton = {marginLeft: 8, position: 'relative', top: 2 + 'px'}

    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '活动名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '发布人',
        dataIndex: 'writer',
        key: 'writer',
      },
      {
        title: '发布时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '活动状态',
        dataIndex: 'state',
        key: 'state'
      },
      {
        title: '人数',
        dataIndex: 'people_num',
        key: 'people_num'
      },
      {
        title: '已参加人数',
        dataIndex: 'has_people_num',
        key: 'has_people_num'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
             <Link to={`/activity/${record.id}`} className="ant-dropdown-link">
               详情 <Icon type="down"/>
      </Link>
    </span>
        ),
      }]

    return (
      <div>

        <Choose/>
        <SearchDate handleSearchDate={this.handleSearchDate.bind(this)} Url="http://volunteer.andyhui.xin/vps"/>

        <Dropdown overlay={menu}>
          <Button style={styleButton}>
            活动状态 <Icon type="down"/>
          </Button>

        </Dropdown>

        <Search
          placeholder="input search text"
          style={{width: 200, top: -1}}
          onSearch={this.handleSearch}
          enterButton
        />

        <div className="show">
          <Table columns={columns} dataSource={this.state.Servers}/>
        </div>
      </div>

    )
  }
}

export default ServiceList
