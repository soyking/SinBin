import ArticleList from "./articleList"
import MomentList from "./momentList"
import RouterTabs from "./routertabs"
import "../css/app.css"

let ReactDOM = window.ReactDOM
let React = window.React
let { Router, Route, IndexRoute, hashHistory } = window.ReactRouter
let { Box } = window.ReactLayout

const App = React.createClass({
    render() {
        return (
            <Box centerJustified >
                <Box vertical center style={{ width:500 }}>
                    <img src="http://7xs94t.com1.z0.glb.clouddn.com/avatar.jpg" style={{ width:400 }}/>
                    <b style={{ marginTop:30, marginBottom:30, color:"#777872" }}><center> Kiss 乐队的贝斯手，标志是斧头贝斯</center></b>
                    <RouterTabs titles={["长话","短说","关于"]} links={["","short"]} />
                    { this.props.children }
                </Box>
            </Box>
        );
    }
});

ReactDOM.render((
   <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={ArticleList} />
            <Route path="short" component={MomentList}/>
        </Route>
    </Router>
), document.querySelector(".app"));
