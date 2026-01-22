import React from 'react'
import styles from './View.module.css'
import Table from './Table/Table'

export default function View() {
  return (
    <div className={styles.pageContainer}>
      View
      <Table></Table>
    </div>
  )
}
 