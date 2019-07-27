import React from 'react'
import AddItemForm from './AddItemForm.js'
import AppBar from '@material-ui/core/AppBar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import jesttestsetup from '../../test/jestsetup.js'

describe('AddItemForm', () => {

  const wrapper = mount(<AddItemForm/>)
  const textBox = wrapper.find(TextField)
  const button = wrapper.find(Button)

  it('renders', () => {
    expect(wrapper.length).toBe(1)
  })

  it('renders the text box', () => {
    expect(textBox.length).toBe(1)
  })

  it('renders the button', () => {
    expect(button.length).toBe(1)
  })

  it('adds the to do item when button is pressed', () => {
    const toDo = 'a to do item'

    textBox.at(0).props().onChange({ target: { value: toDo } })

    button.simulate('click')

    expect(wrapper.find('p').text()).toBe(toDo)
  })

  it('removes the to do item when the item is clicked', () => {

    let p = wrapper.find('p')

    p.simulate('click')

    p = wrapper.find('p')

    expect(p.length).toBe(0)
  })

});
