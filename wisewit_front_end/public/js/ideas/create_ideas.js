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
   $.get('http://localhost:9001/ideas').done( data=>{
      data.forEach( el => {
        this.state.ideas[el.id] = el;
      });
      this.setState({ideas:this.state.ideas})
    })
  },
  addIdea:function( newIdea ) {
    var updateData = (data)=>{
      var id = data.idea_id;
      // add new task to state
      this.state.ideas[id] = newIdea;
      this.setState({ ideas: this.state.ideas });
    }
    $.post('http://localhost:9001/ideas', newIdea)
    .done(updateData);
  },
  renderIdea:function(key){
    return (
      <Idea key={key} index={key} details={this.state.ideas[key]}  />
    )
  },
  render:function() {
    return (
      <div id="ideas">
      <div className="container">
        <div className="row">
            <h4>Ideas</h4>
            {/* Ideas  FORM*/}
            <CreateIdeaForm addIdea={this.addIdea}/>
            <button onClick={this.renderIdea}>Show all ideas</button>
            {Object.keys(this.state.ideas)
                .map( this.renderIdea )}
        </div>
            <div className="row">
            </div>
        </div>
        </div>
    )
  }

  });  // ideas component ends here

  const CreateIdeaForm = React.createClass({

    handleSubmit:function(event) {
      event.preventDefault()
      const ideaInfo = { idea:{
        name : this.refs.name.value
      }
      }
      this.props.addIdea(ideaInfo)
      // clear the form
      this.refs.ideaForm.reset()

    },
    render:function() {

      return (
        <form ref="ideaForm" onSubmit={this.handleSubmit}>
          <h5>Create a new idea</h5>
              <label htmlFor="idea_name">  Idea  </label>
              <input type="text"  id="idea_name" ref="name" />
          <div className="row">
            <button  type="submit" name="action">Add an Idea</button>
          </div>
        </form>
      )
    }
  });  // This is the end of idea create form.

  const Idea = React.createClass({
    handleClick : function(event) {
      event.preventDefault();
    },

    render:function() {
      return (
        <li className="collection-item">
          <div>
            <strong>{this.props.details.idea.name}</strong>
            <a href="#" onClick={this.handleClick} className="secondary-content"></a>
          </div>
        </li>
      )
    }
  });  // End of the idea rendering component


  module.exports = Ideas;
