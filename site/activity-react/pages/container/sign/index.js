import * as React from 'react';
import './style.scss'

import api from '../../../utils/api';
import Page from '../../../components/page'
import WxLoginDialog from '../../../components/wx-login-dialog'

export default class Sign extends React.Component{
    componentDidMount = async() => {
        console.log(INIT_DATA);
    }

    starHandle = async (id) => {
        const result = await api('/api/base/sys-time', {
            method: 'GET',
            body: {}
        })
        if(result) {
            const teamList = this.state.teamList
            teamList.map((item) => {
                if(item.id == id) {
                    item.marked = !item.marked
                }
            })
            this.setState({
                teamList: teamList
            })
        }
    }

    state = {
        showWxLogin: false,
        fromWx: false,

        username: '',
        password: '',
    }

    openWxLoginHandle = () => {
        this.setState({
            showWxLogin: true
        })
    }
    closeWxLoginHandle = () => {
        this.setState({
            showWxLogin: false
        })
    }

    userNameInputHandle = async (e) => {
        // todo 检查账号是否已经存在 
        this.setState({
            username: e.target.value
        })
    }

    passWordInputHandle = (e) => {
        // todo 检验密码有效性
        this.setState({
            password: e.target.value
        })
    }


    
    render() {
        let personInfo = this.state.personInfo
        return (
            <Page title={"注册"} className="person-edit-page page-wrap">

                {
                    this.state.fromWx && <div>请补充账户信息</div>
                }

                <input value={this.state.username} onChange={this.userNameInputHandle} type="text"/>
                <input value={this.state.password} onChange={this.passWordInputHandle} type="password"/>

                <div>确定</div>

                {
                    this.state.showWxLogin && <WxLoginDialog state="bind" closeHandle={this.closeWxLoginHandle}/>
                }
            </Page>
        )
    }
}

