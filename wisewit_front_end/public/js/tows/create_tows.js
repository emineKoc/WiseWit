'use strict'
const React = require('react');
const auth = require('../authComponents/auth.js');
const $ = require('jquery');

const Tows = React.createClass({
  // let current_user : this.props.current_user
  contextTypes: {
  userid: React.PropTypes.string,
  current_user_name: React.PropTypes.string,
  userid: React.PropTypes.string,
  },

  getInitialState:function(){  // I will move there to app.js
    return { factors:{} }
  },

  componentDidMount:function() {
   // this is where you'll get the data from the 'db'
   $.get({
      url: 'http://localhost:9001/projects/1/factors',
      beforeSend: function( xhr ) {
       xhr.setRequestHeader( "Authorization", 'Bearer ' + localStorage.token );
     }
     }).done((data) => {
      data.forEach( el => {
        this.state.factors[el.id] = el;
      });
      this.setState({factors:this.state.factors})
    })
  },

  addFactor:function( newFactor ) {
    var updateFactors = (data)=>{
      var id = data.id;
      // add new task to state
      this.state.factors[id] = newFactor;
      this.setState({ factors: this.state.factors });
    }
    $.post({
      url: 'http://localhost:9001/projects/1/factors',
      data: newFactor,
      beforeSend: function( xhr ) {
        xhr.setRequestHeader( "Authorization", 'Bearer ' + auth.getToken() );
      },
    })
    .done(updateFactors);
  },
  updateTows:function(e){
    e.preventDefault()

    $.get({
       url: 'http://localhost:9001/projects/1/factors',
       beforeSend: function( xhr ) {
        xhr.setRequestHeader( "Authorization", 'Bearer ' + localStorage.token );
      }
      }).done((data) => {
       data.forEach( el => {
         this.state.factors[el.id] = el;
       });
       this.setState({factors:this.state.factors})
     })


   },
  handleDelete:function(key){
        $.ajax(
          {
            url : `http://localhost:9001/projects/1/factors/${key}`,
            method : 'DELETE',
            beforeSend: function( xhr ) {
              xhr.setRequestHeader( "Authorization", 'Bearer ' + localStorage.token );
            },
            data:{ id :key}
        }).done( ( data ) => {
        })
    this.setState({ factors: this.state.factors })
  },
  filterStrengts:function(key){
    return this.state.factors[key].category==="Strength"
  },
  filterWeaknesses:function(key){
    return this.state.factors[key].category==="Weakness"
  },
  filterOpportunity:function(key){
    return this.state.factors[key].category==="Opportunity"
  },
  filterTreats:function(key){
    return this.state.factors[key].category==="Treat"
  },
  // TOWS Filters
  filterSO:function(key){
    return this.state.factors[key].category==="SO"
  },
  filterSW:function(key){
    return this.state.factors[key].category==="SW"
  },
  filterST:function(key){
    return this.state.factors[key].category==="ST"
  },
  filterWT:function(key){
    return this.state.factors[key].category==="WT"
  },

  renderFactor:function(key){
    return (
      <Factor key={key} index={key} details={this.state.factors[key]} handleDelete={this.handleDelete}  />
    )
  },

  render: function() {
    return (
      <div id="factors">
      <h1 className="head_box_titles" >Tows Analysis-Strategies</h1>

      <h4 className="mid_box_titles" >add your strageties</h4>
      <CreateFactorForm addFactor={this.addFactor}/>
      <div className="row col-sm-12">
      <h4 className="mid_box_titles" ><a href="#" onClick={this.updateTows}>Update Tows </a></h4>
      </div>

      <div className="container Swot">

      <div className="row col-sm-12">

      <div id="thintows_box" id="towsicon" className="col-sm-3">
      <img id="towsicon" src="./img/towsIcon.svg"/>
      </div>

      <div id="tows_box"  className="col-sm-4">
      <h4 className="box_titles">Strengths</h4>
      {Object.keys(this.state.factors)
             .filter(this.filterStrengts)
             .map( this.renderFactor )}
      </div>

      <div id="tows_box"  className="col-sm-4">
      <h4 className="box_titles" > Weaknesses</h4>
      {Object.keys(this.state.factors)
             .filter(this.filterWeaknesses)
             .map( this.renderFactor )}
      </div>

      </div>

      <div className="row col-sm-12" >

      <div id="tows_box" className="col-sm-3">
      <h4 className="box_titles">Opportunity</h4>
      {Object.keys(this.state.factors)
             .filter(this.filterOpportunity)
             .map( this.renderFactor )}
      </div>

      <div id="s_box" className="col-sm-4">
      <h4 className="box_titles">SO Strageties</h4>
      {Object.keys(this.state.factors)
             .filter(this.filterSO)
             .map( this.renderFactor )}
        </div>

      <div id="s_box" className="col-sm-4">
      <h4 className="box_titles">SW Strageties</h4>
      {Object.keys(this.state.factors)
             .filter(this.filterSW)
             .map( this.renderFactor )}
      </div>
      </div>

      <div className="row col-sm-12">
      <div id="tows_box"  className="col-sm-3">
      <h4 className="box_titles">Treats</h4>
      {Object.keys(this.state.factors)
             .filter(this.filterTreats)
             .map( this.renderFactor )}

      </div>

      <div id="s_box" className="col-sm-4">
      <h4 className="box_titles">ST Strageties</h4>
      {Object.keys(this.state.factors)
             .filter(this.filterST)
             .map( this.renderFactor )}

      </div>

      <div id="s_box" className="col-sm-4">
      <h4 className="box_titles">WT Strageties</h4>
      {Object.keys(this.state.factors)
             .filter(this.filterWT)
             .map( this.renderFactor )}

      </div>
      </div>
      </div>

      </div>
    )
  }

});  // factors component ends here


const Subject = React.createClass({
  whatissubject:function(event){
    event.preventDefault()
    let question = this.refs.questionInput.value
      $('#subject').append(question)
      $('#subjectForm').hide()
  },
  render:function(){
    return (
      <div>

      <form id="subjectForm" onSubmit={this.whatissubject}>
      <label htmlFor="idea_name">  <h4>What is the subject? </h4></label>
      <input type="text" ref="questionInput" />
      <button id="questionFormbutton" type="submit" name="action">Question</button>
      </form>

      <div id="subject"></div>

      </div>
    )
  }
})


const CreateFactorForm = React.createClass({

  SO:function(event) {
    event.preventDefault()
    const factorInfo = { factor: {
      name : this.refs.SO.value,
      project_id : 1,
      category: "SO"
      }
    }
    this.props.addFactor(factorInfo)
     this.refs.addSO.reset()
  },

  SW:function(event) {
    event.preventDefault()
    const factorInfo = { factor: {
      name : this.refs.SW.value,
      project_id : 1,
      category: "SW"
    }
    }
    this.props.addFactor(factorInfo)
     this.refs.addSW.reset()
  },

  ST:function(event) {
    event.preventDefault()
    const factorInfo = { factor: {
      name : this.refs.ST.value,
      project_id : 1,
      category: "ST"
    }
    }
    this.props.addFactor(factorInfo)
     this.refs.addST.reset()
  },

  WT:function(event) {
    event.preventDefault()
    const factorInfo = { factor: {
      name : this.refs.WT.value,
      project_id : 1,
      category: "WT"
    }
    }
    this.props.addFactor(factorInfo)
     this.refs.addWT.reset()
  },
  render:function() {
    return (
      <div>
      <div className="container">
        <div className="row">

        <div className="col-lg-3">
        <form ref="addSO" onSubmit={this.SO} >
        <input  className="swotentry" type="text" ref="SO"  placeholder= "Add a SO Strategy"/>
        </form>
        </div>

        <div className="col-lg-3">
        <form ref="addSW" onSubmit={this.SW} >
        <input  className="swotentry" type="text" ref="SW"  placeholder= " Add a SW Strategy"/>
        </form>
        </div>

        <div className="col-lg-3">
        <form ref="addST"  onSubmit={this.ST} >
        <input  className="swotentry" type="text" ref="ST"  placeholder= " Add a ST Strategy"/>
        </form>
        </div>

        <div className="col-lg-3">
        <form ref="addWT"  onSubmit={this.WT} >
        <input  className="swotentry" type="text" ref="WT"  placeholder= " Add a WT Strategy"/>
        </form>
        </div>

        </div>
        </div>
      </div>
    )
  }
});  // This is the end of factor create form.

const Factor = React.createClass({
  handleClick : function(event) {
    event.preventDefault()
  },
  deleteFactor : function(event) {
    event.preventDefault();
    this.props.handleDelete(this.props.index)
  },
  render:function() {
    return (
      <li className = "factors" className="collection-item">
        <div>
          <strong>{this.props.details.name}</strong>
          <a href="#" onClick={this.handleClick} className="secondary-content"></a>
          <a href="#" onClick={this.deleteFactor} className="secondary-content">x</a>
        </div>
      </li>
    )
  }
});  // End of the idea rendering component
module.exports = Tows;
