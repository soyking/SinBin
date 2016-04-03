import mockxhr from "mockxhr"
import "./mockxhr"

let React = window.React
let { Box, Item } = window.ReactLayout

const ArticleList = React.createClass({
    getInitialState(){
        return {"list":[]}
    },
    componentDidMount(){
        mockxhr.get("/articles", {}, data=>{
            this.setState({"list": data.data})
        })
    },
    render() {
        let listData = this.state.list
        let list = []
        listData.forEach(d => {
            list.push(
                <Item style={{paddingLeft:75}} key={d.id}><strong>{d.title}</strong>&nbsp;&nbsp;{d.date}</Item>
            )
        })
        return(
            <Box vertical startJustified style={{width:400}} >
                {list}
            </Box>
        )
    }
})

module.exports = ArticleList
