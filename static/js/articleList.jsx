import mockxhr from "mockxhr"

let React = window.React
let { Box, Item } = window.ReactLayout
let { Pagination } = window.antd
let { Link } = window.ReactRouter

const pageSize = 2

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
                <Box key={d.id}>
                    <Link to={`/article/${d.id}`}><strong style = {{ fontSize:14 }}>{d.title}</strong></Link>
                    <div style={{ color:"#999", paddingLeft:15, paddingTop:2 }}>({date})</div>
                </Box>
            )
        })
        let total = this.state.total
        let page = this.state.page

        return(
            <Box vertical startJustified style={{width:500}} >
                {list}
                <Box endJustified >
                    <Pagination current={page} pageSize={pageSize} total={total} onChange={this.getArticleList}/>
                </Box>
            </Box>
        )
    }
})

module.exports = ArticleList
