'use strict'
const React = require('react');
// const auth = require('./auth');
const $ = require('jquery');

const Ideas = React.createClass({
  getInitialState:function(){
    return { ideas:{} }
  },
  componentDidMount:function() {
   // this is where you'll get the data from the 'db'
   $.get('/ideas').done( data=>{

      data.forEach( el=> {
        this.state.ideas[el.task_id] = el;
      });

      this.setState({ideas:this.state.ideas})
    })
  },
  addIdea:function( newIdea ) {

    var updateData = (data)=>{
      var newID = data.idea_id;
      // add new task to state
      this.state.ideas[newID] = newIdea;
      this.setState({ ideas: this.state.ideas });
      console.log("inside updatedata event handler");
    }

    $.post('/ideas', newIdea)
    .done(updateData);

  },
  // toggleTask:function(key){
  //   this.state.ideas[key].completed = !this.state.ideas[key].completed;
  //   this.setState({ideas:this.state.ideas});
  // },
  //
  //
  // filterComplete:function(key){
  //   return this.state.ideas[key].completed
  // },
  // filterNotComplete:function(key){
  //   return !this.filterComplete(key)
  // },
  renderIdea:function(key){
    return (
      <idea key={key} index={key} details={this.state.ideas[key]}  />
    )
  },

  render:function() {
    return (
      <section id="ideas">
      <div className="container">
        <div className="row">
          <section className="col s12">


            <section id="todo-display" className="col s7">
              <ul className="collection with-header">
                <li className="collection-header"><h4>ideas</h4></li>
                {/*open ideas here*/}
                {Object.keys(this.state.ideas)
                  .map( this.renderIdea )}
              </ul>
            </section>

            {/* Ideas  FORM*/}
            <section className="col s5">
              <aside className="card-panel">
                <CreateTaskForm addIdea={this.addIdea}/>
              </aside>
            </section>

          </section>
        </div>
        <div className="row">
        </div>
      </div>)
  }

});  // ideas component ends here


const Idea = React.createClass({
  handleClick : function(event) {
    event.preventDefault();
    this.props.toggleTask(this.props.index);
  },

  render:function() {
    return (
      <li className="collection-item">
        <div>
          <strong>{this.props.details.idea_name}</strong> {this.props.details.idea_desc}
          <a href="#" onClick={this.handleClick} className="secondary-content">
            <i className="material-icons">check</i>
          </a>
        </div>
      </li>
  )
  }
});

module.exports = Ideas;
