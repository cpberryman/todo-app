import React from 'react'
import { render } from 'react-dom'
import AddItemForm from "./components/AddItemForm";

const init = () => {
  render(<AddItemForm />, document.getElementById('app'))
}

init()
