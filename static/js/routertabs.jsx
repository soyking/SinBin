import React from "react"
import { Box, Item } from "react-polymer-layout"
import { Link } from "react-router"
import { Button } from "antd"
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane

const RouterTabs = React.createClass({
    propTypes: {
        titles: React.PropTypes.array,
        links: React.PropTypes.array
    },

    getInitilaState(){
        return { links: this.props.links }
    },

    componentDidMount(){
        this.setState({ links: this.props.links })
    },

    switchTab(key){
        let link = this.state.links[key] || ""
        console.log(window.location.hash)
        window.location.hash = "#" + link
    },

    render() {
        let titles = this.props.titles
        let tabs = []

        for (let i=0;i<titles.length;i++){
            let t=titles[i]
            tabs.push(
                <TabPane tab={t} key={i}></TabPane>
            )
        }

        return(
            <Tabs defaultActiveKey="0" onChange={this.switchTab} style={{width:"100%"}}>
                {tabs}
            </Tabs>
        )
    }
})

module.exports = RouterTabs