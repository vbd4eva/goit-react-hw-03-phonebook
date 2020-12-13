import React from 'react'

function ContactFilter({value, onChange}) {
    return (
         <label>
             Find contacts by name
             <input
                 type="text"
                 name="filter"
                 value={value}
                 onChange={onChange}
             />
         </label>
    )
}


export default ContactFilter

