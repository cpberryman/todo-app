import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import fetch from 'node-fetch'
//import { getTasks } from '../ApiClients.js'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    marginTop: '10px'
  }
})

class AddItemForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      items: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  componentDidMount () {
    fetch('http://localhost:9000/tasks/find/all', {
         method: 'GET'
    })
    .then(response => response.json())
    .then(json => this.setState({items: json}))
    .catch(error => console.error(error))
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleClick (event) {
    const { items, value } = this.state;
    if (value !== '') {
        this.setState({value : '', items: [{description: value, complete: false}, ...items]})
        fetch('http://localhost:9000/tasks/add', {
                 method: 'POST',
                 headers: {
                     'Accept': 'application/json, text/plain, */*',
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({description: value, complete: false})
              })
        .then(response => response.json())
        .then(json => console.error(json))
        .catch(error => console.error(error))
    }
  }

  deleteItem (itemToDelete) {
    const { items } = this.state;
    this.setState({items: items.filter(item => item !== itemToDelete)})
    fetch('http://localhost:9000/tasks/delete/' + itemToDelete.id , {
        method: 'DELETE'
    })
    .catch(error => console.error(error))
  }

  render () {
    const { items, value } = this.state
    const { classes } = this.props
    return (
      <div className={classes.root}>
      <AppBar position='static' color='default'>
        <label>
          <TextField id='addToDoInput' multiline fullWidth label='Enter task here' value={value} onChange={this.handleChange} />
        </label>
        <span>
        <Button
            id='addToDoButton'
            fullWidth
            variant='contained'
          onClick={this.handleClick}
          className={classes.button}
        >Add task</Button>
        </span>
      </AppBar>
        {items.map(item => <p key={item.id} onClick={() => this.deleteItem(item)}>{item.description}</p>)}
      </div>
    )
  }
}

export default withStyles(styles) (AddItemForm)