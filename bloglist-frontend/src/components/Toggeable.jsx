import { useState, forwardRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"

const Toggeable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" }
  const hideWhenVisible = { display: visible ? "none" : "" }


  const toggleVisible = () => {
    setVisible(!visible)
  }
  useImperativeHandle(refs, () => {
    return {
      toggleVisible
    }
  })

  return(
    <>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}>cancel</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}>{props.buttonLabel}</button>
      </div>
    </>
  )

})
Toggeable.displayName = "Toggeable;"

Toggeable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}


export default Toggeable;