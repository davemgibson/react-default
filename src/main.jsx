import React from 'react'
import ReactDOM from 'react-dom'
import ReactStore from './ReactStore'
import StyleSheet from 'react-inline';
var toastr = require('./toastr.min');


const App = React.createClass({
  addAlert () {
    toastr.success("My name is Inigo Montoya. You killed my father. Prepare to die!")
  },
  click1(){
    ReactStore.dispatch({
        type: 'TEST'
    })      
  },
  click2(){
    //  alert('click2');

    ReactStore.dispatch({
        type: 'INC'
    })      
  },
  click3(text){
    for(var i=0;i<1;i++){
    ReactStore.dispatch({
        type: 'ADD',
        text:text
    })      
    }
  },  
  tabChange(i){
    ReactStore.dispatch({
        type: 'TABCHANGE',
        tab: i
    }); 
  },
  render() {
    const styles = StyleSheet.create({
       
    });
      
    var id=1;
    var input;    
    var tab;
    
    if(ReactStore.getState().tab==1){
        tab=<div>Hello2!<br/>  
        <a onClick={this.click1}>click me</a><br/>
        {ReactStore.getState().text}<br/>
        <a onClick={this.click2}>click me</a><br/>
        {ReactStore.getState().counter}<br/>
         <input ref={node => {input = node}} /><a onClick={()=>{
             if(input.value.trim())this.click3(input.value.trim());
             input.value='';
            }
           }>Add</a><br/>
        {ReactStore.getState().list.map(thing => 
          <div key={id++}>{thing}</div>  
        )}
        </div>
        
    }else if(ReactStore.getState().tab==2){
        tab=<button type="button" className="btn btn-default"
           onClick={this.addAlert}>Primary button</button>
      
    }else if(ReactStore.getState().tab==3){
        tab=    <div><br/> 
            <div className="panel panel-default">
                <div className="panel-heading">Panel heading without title</div>
                <div className="panel-body">
                    Panel content
                </div>
             </div>
             </div>
    }
    
    return (
      <div>          
        
      <nav className="navbar navbar-atkins">
        <div className="navbar-middle">
            <div className="navbar-header">
            
            <span className="navbar-brand" style={styles.navtext}>
                Atkins
            </span>
            </div>
        </div>
      </nav>
      <div className="mid-page">
      <ul className="nav nav-tabs">
        <li role="presentation" className={ReactStore.getState().tab==1?'active':''}><a href="#" 
            onClick={()=>{this.tabChange(1)}}>Home</a></li>
        <li role="presentation" className={ReactStore.getState().tab==2?'active':''}><a href="#"
            onClick={()=>{this.tabChange(2)}}>Profile</a></li>
        <li role="presentation" className={ReactStore.getState().tab==3?'active':''}><a href="#"
            onClick={()=>{this.tabChange(3)}}>Messages</a></li>
      </ul>
      
      {tab}                     
      </div>
      </div>
    )
  }
  
})

const render=()=> {
    ReactDOM.render(
        <App/>,
        document.getElementById('example')
    );
};

ReactStore.store.subscribe(render);
render();