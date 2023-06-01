import React from 'react'
import styles from "../styles/Contact.module.css"
import axios from 'axios'
const Contact = () => {
    const handleSubmit = () => {
        let formData = {
            "name": document.getElementById("name").value,
            "email": document.getElementById("email").value,
            "description": document.getElementById("description").value
        }

        let response = axios.post("/api/post_contact", formData)
        response.then((res)=> {
            alert(res.data.message)
        })
    }
    return (
        <div className={styles.contactForm}>
            <h1>Raise a query</h1>
            <input id='name' type="text" placeholder='Your name' />
            <input type="email" placeholder='Your email' name="" id="email" />
            <textarea name="description" placeholder='Explain your query' id="description" cols="30" rows="10"></textarea>
            <button onClick={handleSubmit} type="submit" style={{ backgroundColor: "white", color: "black" }}>Submit</button>
        </div>
    )
}

export default Contact