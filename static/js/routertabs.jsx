let React = window.React
let { Link } = window.ReactRouter
let { Button, Tabs } = window.antd
let { Box, Item } = window.ReactLayout

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
        console.log("switch");
        window.location.hash = "#" + key
    },

    render() {
        let titles = this.props.titles
        let links = this.props.links
        let tabs = []
        let currentLink = window.location.hash.split("/")[1].split("?")[0]

        for (let i=0;i<titles.length;i++){
            let t = titles[i]
            let k = links[i]
            tabs.push(
                <TabPane tab={t} key={k} style={{fontWeight: "bold"}}></TabPane>
            )
        }

        return(
            <Tabs defaultActiveKey={currentLink} onTabClick={this.switchTab} style={{width:"100%"}}>
                {tabs}
            </Tabs>
        )
    }
})

module.exports = RouterTabs
