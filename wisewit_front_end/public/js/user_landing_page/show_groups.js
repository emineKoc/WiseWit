'use strict'
const React = require('react');
const auth = require('../authComponents/auth.js');
const $ = require('jquery');


const ShowGroups = React.createClass({
// use this.props.groups

  // componentDidMount : function(){
  //   $.get(
  //     {
  //     url: 'http://localhost:9001/users/24/groups/',
  //     beforeSend: function( xhr ) {
  //       xhr.setRequestHeader( "Authorization", 'Bearer ' + localStorage.token );
  //     }
  //   })
  //   .done( ( data )=> {
  //     data.forEach(function(el){
  //     this.state.groups[el.id] = el;
  //     this.setState( { groups : this.state.groups } )
  //   })
  // })
  //
  // },
  //

  componentDidMount:function() {
      let that = this

      $.ajax({
        url: 'http://localhost:9001/groups/',
        type: 'Get',
        beforeSend: function( xhr ) {
          xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken() );
        }
      })
      .done( function(data) {
        console.log(data);
        data.forEach(function(el){
        that.props.groups[el.id] = el;
        })
        that.props.handlegroups(that.props.groups)
        console.log('this is props ',that.props.groups);
      })
    },
  handleGroupDelete: function(key){
    $.ajax(
      {
        url : `http://localhost:9001/groups/${key}`,
        method : 'DELETE',
        beforeSend: function( xhr ) {
          xhr.setRequestHeader( "Authorization", 'Bearer ' + localStorage.token );
        },
        data:{ id :key}
    }).done( ( data ) => {
    })
  },
  renderGroups : function( key ){
   return (
     <div>
     <ShowGroup key={key} index={key}  details={ this.props.groups[key]} handleGroupDelete={this.handleGroupDelete} />
     </div>
      )
    },

    render: function(){
      return (
        <div>
        <li>{Object.keys(this.props.groups).map(this.renderGroups)}</li>
        </div>
      )
    }
})


  const ShowGroup = React.createClass({
    handleClick : function(event) {
      event.preventDefault();
    },
    deleteGroup : function(event) {
      event.preventDefault();
      this.props.handleGroupDelete(this.props.index)
        },

    render:function() {
      return (
        <li className="collection-item">
          <div>
            <strong>{this.props.details.name}</strong>
            <a href="#" onClick={this.handleClick} className="secondary-content"></a>
            <a href="#" onClick={this.deleteGroup} className="secondary-content">x</a>
          </div>
        </li>
      )
    }
  });  // End of the idea rendering component

module.exports = ShowGroups;
