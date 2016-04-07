const React = require( 'react' );

const ShowGroup = React.createClass({

  handleDelete : function( event ) {
    event.preventDefault();
    let data = {
      id : this.props.details.group_id
    }
    $.ajax({
      url : '/users',
      data : data,
      method : 'delete',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token );
      }
    })
    .done((data)=> {
      this.props.reset()
    })
  },


  render : function() {
    return (

      <tr>
        <td><input type="checkbox" autoComplete="off" /></td>
        <td>{this.props.details.name}</td>
        <button id="cursor" onClick={this.handleDelete} href="#" className="btn btn-danger btn-xs"><span className="glyphicon glyphicon-remove"></span> Delete
        </button>
      </tr>
    )
  }
})

module.exports = ShowGroup;
