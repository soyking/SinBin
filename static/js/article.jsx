import mockxhr from "mockxhr"

let { Box } = window.ReactLayout
let React = window.React
let { Icon } = window.antd

const Article = React.createClass({
    getInitialState(){
        return { article: {} }
    },

    componentDidMount(){
        let id = this.props.params.id
        mockxhr.get("/api/article/"+id, {}, resp=>{
            if (resp.code && resp.code === 200) {
                this.setState({ article: resp.data })
            }
        })
    },

    createMarkup(content) { 
        return {__html: content}
    },

    render(){
        let title = this.state.article.title
        let date = (new Date(this.state.article.date * 1000)).toLocaleDateString()
        let content = this.state.article.content

        return (
            <Box vertical startJustified style={{width:460, marginBottom:40 }}>
                <div style={{ fontSize:16 }}><strong>{title}</strong></div>
                <div style={{ color:"#999", padding:"5px 10px 5px 0px" }}><Icon type="file" style={{ paddingRight:10}}/>{date}</div>
                <div dangerouslySetInnerHTML={ this.createMarkup(content) } className="article-content"/>
            </Box>
        )
    }
})

module.exports = Article