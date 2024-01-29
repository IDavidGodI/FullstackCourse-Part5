import { useState } from "react"

const Toggeable = (props) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible? "" : "none" }
  const hideWhenVisible = { display: visible? "none" : "" }


  const toggleVisible = () => {
    setVisible(!visible)
  }

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

}

export default Toggeable;