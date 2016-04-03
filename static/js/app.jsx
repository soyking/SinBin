import ArticleList from "./articleList"
import MomentList from "./momentList"
import RouterTabs from "./routertabs"
import Article from "./article"
import "../css/app.css"

let ReactDOM = window.ReactDOM
let React = window.React
let { Router, Route, IndexRoute, hashHistory, IndexRedirect } = window.ReactRouter
let { Box } = window.ReactLayout

const App = React.createClass({
    render() {
        return (
            <Box centerJustified >
                <Box vertical center style={{ width:500 }}>
                    <img src="http://7xs94t.com1.z0.glb.clouddn.com/avatar.jpg" style={{ width:350, margin:10 }}/>
                    <b style={{ marginTop:30, marginBottom:30, color:"#777872", fontSize:"14px" }}><center> Kiss 乐队的贝斯手，标志是斧头贝斯</center></b>
                    <RouterTabs titles={["长话","短说","关于"]} links={["/","short","about"]} />
                    { this.props.children }
                </Box>
            </Box>
        );
    }
});

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="articles" />
            <Route path="articles" component={ArticleList} />
            <Route path="short" component={MomentList}/>
            <Route path="article/:id" component={Article}/>
        </Route>
    </Router>
, document.querySelector(".app"));
