'use strict'
const React = require('react');
const auth = require('../authComponents/auth.js');
const $ = require('jquery');
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;

const Swot = React.createClass({
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
  updateSwot:function(e){
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

  renderFactor:function(key){
    return (
      <Factor key={key} index={key} details={this.state.factors[key]} handleDelete={this.handleDelete}  />
    )
  },

  render: function() {
    return (
      <div id="factors">
      <h1 className="head_box_titles" >Swot Analysis</h1>

      <h4 className="mid_box_titles" >add your factors</h4>
      <CreateFactorForm addFactor={this.addFactor}/>
      <div className="row col-sm-12">
      <h4 className="mid_box_titles" ><a href="#" onClick={this.updateSwot}>Update Swot </a></h4>
      </div>

      <div className="container Swot">

        <div className="row col-sm-12" className = "swotcontainer">
            <div id="s_box" className="col-sm-5">
            <h4 className="box_titles">Strengths</h4>
            {Object.keys(this.state.factors)
                   .filter(this.filterStrengts)
                   .map( this.renderFactor )}
            </div>
            <div id="w_box" className="col-sm-5">
            <h4 className="box_titles" >Weaknesses</h4>
            {Object.keys(this.state.factors)
                   .filter(this.filterWeaknesses)
                   .map( this.renderFactor )}
            </div>
            </div>

            <div className="row col-sm-12" className = "swotcontainer">
            <div id="o_box" className="col-sm-5">
            <h4 className="box_titles">Opportunity</h4>
            {Object.keys(this.state.factors)
                   .filter(this.filterOpportunity)
                   .map( this.renderFactor )}
            </div>
            <div id="t_box" className="col-sm-5">
             <h4 className="box_titles">Treats</h4>
             {Object.keys(this.state.factors)
                    .filter(this.filterTreats)
                    .map( this.renderFactor )}
                    </div>
         </div>
         </div>
         <Link to= "/tows"> <div className="row col-sm-12" id = "towslink">
         CREATE TOWS STRATEGIES
         </div></Link>
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

  Strength:function(event) {
    event.preventDefault()
    const factorInfo = { factor: {
      name : this.refs.Sname.value,
      project_id : 1,
      category: "Strength"
      }
    }
    this.props.addFactor(factorInfo)
     this.refs.addStrength.reset()
  },

  Weakness:function(event) {
    event.preventDefault()
    const factorInfo = { factor: {
      name : this.refs.Wname.value,
      project_id : 1,
      category: "Weakness"
    }
    }
    this.props.addFactor(factorInfo)
     this.refs.addWeakness.reset()
  },

  Opportunity:function(event) {
    event.preventDefault()
    const factorInfo = { factor: {
      name : this.refs.Oname.value,
      project_id : 1,
      category: "Opportunity"
    }
    }
    this.props.addFactor(factorInfo)
     this.refs.addOpportunity.reset()
  },

  Treat:function(event) {
    event.preventDefault()
    const factorInfo = { factor: {
      name : this.refs.Tname.value,
      project_id : 1,
      category: "Treat"
    }
    }
    this.props.addFactor(factorInfo)
     this.refs.addTreat.reset()
  },
  render:function() {
    return (
      <div>
      <div className="container">
        <div className="row">

        <div className="col-lg-3">
        <form ref="addStrength" onSubmit={this.Strength} >
        <input  className="swotentry" type="text" ref="Sname"  placeholder= "Add a Strength"/>
        </form>
        </div>

        <div className="col-lg-3">
        <form ref="addWeakness" onSubmit={this.Weakness} >
        <input  className="swotentry" type="text" ref="Wname"  placeholder= " Add a Weakness"/>
        </form>
        </div>

        <div className="col-lg-3">
        <form ref="addOpportunity"  onSubmit={this.Opportunity} >
        <input  className="swotentry" type="text" ref="Oname"  placeholder= " Add a Opportunity"/>
        </form>
        </div>

        <div className="col-lg-3">
        <form ref="addTreat"  onSubmit={this.Treat} >
        <input  className="swotentry" type="text" ref="Tname"  placeholder= " Add a Treat"/>
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
module.exports = Swot;
