import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleClick (event) {
    const { items, value } = this.state;
    if (value !== '') {
        this.setState({value : '', items: [value, ...items]})
    }
  }

  deleteItem (itemToDelete) {
    const { items } = this.state;
    this.setState({items: items.filter(item => item !== itemToDelete)})
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
        {items.map(item => <p key={item} onClick={() => this.deleteItem(item)}>{item}</p>)}
      </div>
    )
  }
}

export default withStyles(styles) (AddItemForm)