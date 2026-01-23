import React from 'react'
import styles from './View.module.css'
import Table from './Table/Table'
import Header from '../Utility/Header/Header'

export default function View() {
  return (
    <div className={styles.pageContainer}>
      <Header></Header>
      <Table></Table>
    </div>
  )
}
 