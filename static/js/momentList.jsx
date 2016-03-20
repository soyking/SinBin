import React from "react"
import { Box, Item } from "react-polymer-layout"
import RouterTabs from "./routertabs"
import mockxhr from "mockxhr"
import "./mockxhr"

const MomentList = React.createClass({
    getInitialState(){
        return {"list":[]}
    },
    componentDidMount(){
        mockxhr.get("/moments", {}, data=>{
            this.setState({"list": data.data})
        })
    },
    render() {
        let listData = this.state.list
        let list = []
        listData.forEach(d => {
            list.push(
                <Item style={{paddingLeft:75}} key={d.id}><strong>{d.moment}</strong>&nbsp;&nbsp;{d.date}</Item>
            )
        })
        return(
            <Box vertical startJustified style={{width:400}} >
                {list}
            </Box>
        )
    }
})

module.exports = MomentList
