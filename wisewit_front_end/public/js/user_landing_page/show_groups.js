'use strict'
const React = require('react');
// const auth = require('./auth');
const $ = require('jquery');
const ShowGroup = require('./showGroup.js')


const ShowGroups = React.createClass({
  getInitialState : function(){
    return {
      groups: {}
    }
  },


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

  // componentDidMount:function() {
  //     let that = this
  //
  //     $.ajax({
  //       url: 'http://localhost:9001/users/24/groups/',
  //       type: 'Get',
  //       beforeSend: function(xhr){
  //         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.token}` );
  //       }
  //     })
  //     .done( function(data) {
  //       console.log(data);
  //       data.forEach(function(el){
  //       that.props.groups[el.id] = el;
  //       })
  //       that.props.handlegroups(that.props.groups)
  //       console.log('this is props ',that.props.groups);
  //     })
  //   },


  renderGroups : function( key ){
   return (
     <div>
     <ShowGroup key={key} index={key}  details={ this.state.groups[key] }/>
     </div>
      )
    },

    render: function(){
      return (
        <div>
        <li>{Object.keys(this.state.groups).map(this.renderGroups)}</li>
        </div>
      )
    }
})


module.exports = ShowGroups;
