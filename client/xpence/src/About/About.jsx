import React from 'react'
import styles from './About.module.css'
import NavbarMenu from '../Utility/NavbarMenu/NavbarMenu'

export default function About() {
  return (
    <div className={styles.pageContainer}>
      <NavbarMenu></NavbarMenu>
      <h1>Overview</h1>
      <p>Expence is an app that tracks your spending. You have the choice of creating custom transactions to record and create shortcuts for 
        those expenses that frequently pop up. The user also has access to the history of all of the transactions that was made on their account.
      </p>

      <h1>Details and Thoughts Developing This Project:</h1>
      <p> This is a project that consists of the tech stack, nodejs, expressjs, reactjs, and mysql. This Project has the main purpose of
        being the first full stack project that I have made and my thoughts on it personally that it was really fun to develop.
        Concepts like logging in, signing up and overall just tweaking with the backend with my past knowledge of using mysql was very
        informative especially, when applied into a project as such. 
      </p>
    </div>
  )
}
