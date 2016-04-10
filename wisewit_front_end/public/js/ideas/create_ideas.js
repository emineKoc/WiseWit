'use strict'
const React = require('react');
const auth = require('../authComponents/auth.js');
const $ = require('jquery');

const Ideas = React.createClass({
  // let current_user : this.props.current_user
  contextTypes: {
  userid: React.PropTypes.string,
  current_user_name: React.PropTypes.string,
  userid: React.PropTypes.string,
  },

  seeCurrentUser: function(){
        $.ajax({
          url: 'http://localhost:9001/users/:id',
          beforeSend: function( xhr ) {
            xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken() );
          }
        }).done((data) => {
          this.setState({me: data.agent.email})
        })
  },

  getInitialState:function(){  // I will move there to app.js
    return { ideas:{},
             randomDecision:'' }
  },
  componentDidMount:function() {
   // this is where you'll get the data from the 'db'
   $.get({
      url: 'http://localhost:9001/projects/1/ideas',
      beforeSend: function( xhr ) {
       xhr.setRequestHeader( "Authorization", 'Bearer ' + localStorage.token );
     }
     }).done((data) => {
      data.forEach( el => {
        this.state.ideas[el.id] = el;
      });
      this.setState({ideas:this.state.ideas})
    })
  },
  addIdea:function( newIdea ) {
    var updateData = (data)=>{
      console.log('datatatatata: ',data)
      var id = data.id;
      // add new task to state
      this.state.ideas[id] = newIdea;
      this.setState({ ideas: this.state.ideas });
    }
    $.post({
      url: 'http://localhost:9001/projects/1/ideas',
      data: newIdea,
      beforeSend: function( xhr ) {
        xhr.setRequestHeader( "Authorization", 'Bearer ' + auth.getToken() );
      },
    })
    .done(updateData);
  },
  handleDelete:function(key){
        $.ajax(
          {
            url : `http://localhost:9001/projects/1/ideas/${key}`,
            method : 'DELETE',
            beforeSend: function( xhr ) {
              xhr.setRequestHeader( "Authorization", 'Bearer ' + localStorage.token );
            },
            data:{ id :key}
        }).done( ( data ) => {
        })
    this.setState({ ideas: this.state.ideas })
  },
  renderIdea:function(key){
    return (
      <Idea key={key} index={key} details={this.state.ideas[key]} handleDelete={this.handleDelete}  />
    )
  },
  IdeasArray: function(){
    let ideasForPoll = [];
    $.get('http://localhost:9001/projects/1/ideas').done( data=>{
       data.forEach( el => {
         ideasForPoll.push({ name: el.name , vote:5 })
       });
       let RandomNumber = Math.floor( Math.random() * ideasForPoll.length )
       let theChoice = ideasForPoll[RandomNumber].name
       this.setState({ randomDecision: theChoice });
     });
  },
  render: function() {
    return (
      <div id="ideas">
      <div className="container">
        <div className="row">
            {/* Ideas  FORM*/}
            <CreateIdeaForm addIdea={this.addIdea}/>
            {Object.keys(this.state.ideas)
                .map( this.renderIdea )}
        </div>
            <button onClick={this.IdeasArray}>Click here to find choice</button>
            <p>{this.state.randomDecision}</p>
            <p>{this.state.me}</p>
            <a href="#" onLoad={this.seeCurrentUser}></a>
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
    question:function(event) {
      event.preventDefault()
      let question = this.refs.questionInput.value
        $('#question').append(question)
        $('#questionForm').hide()

        let projectName =  { project: { name: question}}

        let currentProjectId =  $.post(
          {
          url : 'http://localhost:9001/projects',
          data : projectName,
          beforeSend: function( xhr ) {
            xhr.setRequestHeader( "Authorization", 'Bearer ' + auth.getToken() );
            }
            }).done((data) => {
           })
           .error((error) => {
             console.error(error);
           })

    },
    render:function() {
      return (
        <div>
        <form id="questionForm" onSubmit={this.question}>
        <label htmlFor="idea_name">  <p>What is the question? </p></label>
        <input type="text" ref="questionInput" />
        <button id="questionFormbutton" type="submit" name="action">Question</button>
        </form>
        <h1 id="question"></h1>
        <form ref="ideaForm" onSubmit={this.handleSubmit}>
          <h5>Create a new idea</h5>
              <label htmlFor="idea_name">  Idea  </label>
              <input type="text"  id="idea_name" ref="name" />
          <div className="row">
            <button  type="submit" name="action">Add an Idea</button>
          </div>
        </form>
        </div>
      )
    }
  });  // This is the end of idea create form.

  const Idea = React.createClass({
    handleClick : function(event) {
      event.preventDefault();
    },
    deleteIdea : function(event) {
      event.preventDefault();
      this.props.handleDelete(this.props.index)
        },
    render:function() {
      return (
        <li className = "ideas" className="collection-item">
          <div>
            <strong>{this.props.details.name}</strong>
            <a href="#" onClick={this.handleClick} className="secondary-content"></a>
            <a href="#" onClick={this.deleteIdea} className="secondary-content">x</a>
          </div>
        </li>
      )
    }
  });  // End of the idea rendering component
  module.exports = Ideas;
