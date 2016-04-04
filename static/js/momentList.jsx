import RouterTabs from "./routertabs"
import mockxhr from "mockxhr"

let { Box, Item } = window.ReactLayout
let React = window.React
let { Pagination, Icon } = window.antd

const pageSize = 10

const MomentList = React.createClass({
    getInitialState(){
        return {"list":[], page:1, size:pageSize, total:0}
    },

    componentDidMount(){
        this.getMomentList(1)
    },

    getMomentList(page){
        this.setState({page:page})
        let _size = this.state.size
        mockxhr.post("/api/moment", {page: page - 1, size: _size}, resp=>{
            if (resp.code && resp.code === 200) {
                this.setState({list: resp.data.results || [], total:resp.data.total})
            }
        })
    },

    render() {
        let listData = this.state.list
        let list = []
        listData.forEach(d => {
            let date = (new Date(d.date * 1000)).toLocaleDateString() 
            list.push(
                <Box vertical key={d.id}>
                    <div><Icon type="tag-o" /><div style={{ fontSize:16, paddingLeft:10, font:"bold", display:"inline" }}>{d.content}</div></div>
                    <Box center endJustified >
                        <Icon type="clock-circle" /><div style={{ color:"#999", paddingLeft:10 }}>{date}</div>
                    </Box>
                </Box>
            )
        })
        let total = this.state.total
        let page = this.state.page

        return(
            <Box vertical startJustified style={{width:460, marginBottom:40 }} >
                {list}
                <Box endJustified style={{ marginTop: 20}}>
                    <Pagination current={page} pageSize={pageSize} total={total} onChange={this.getMomentList}/>
                </Box>
            </Box>
        )
    }
})

module.exports = MomentList
