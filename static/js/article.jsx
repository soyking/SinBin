import mockxhr from "mockxhr"

let { Box } = window.ReactLayout
let React = window.React

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

    render(){
        let title = this.state.article.title
        let date = (new Date(this.state.article.date * 1000)).toLocaleDateString()
        let content = this.state.article.content

        return (
            <Box>
                {content}
            </Box>
        )
    }
})

module.exports = Article