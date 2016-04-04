import mockxhr from "mockxhr"

let React = window.React
let { Box, Item } = window.ReactLayout
let { Pagination, Icon } = window.antd
let { Link } = window.ReactRouter

const pageSize = 10

const ArticleList = React.createClass({
    getInitialState(){
        return {list:[], page:1, size:pageSize, total:0}
    },

    componentDidMount(){
        this.getArticleList(1)
    },

    getArticleList(page){
        this.setState({page:page})
        let _size = this.state.size
        mockxhr.post("/api/article", {page: page - 1, size: _size}, resp=>{
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
                <Box justified key={d.id}>
                    <Link to={`/article/${d.id}`}><Icon type="book" /><div style = {{ fontSize:16, paddingLeft:10, font:"bold", display:"inline" }}>{d.title}</div></Link>
                    <Box center style={{ paddingLeft:10 }}>
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
                    <Pagination current={page} pageSize={pageSize} total={total} onChange={this.getArticleList}/>
                </Box>
            </Box>
        )
    }
})

module.exports = ArticleList
