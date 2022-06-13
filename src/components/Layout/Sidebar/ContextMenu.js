import React, { useEffect, useState } from 'react'
import './styles.css'

const ContextMenu = ({ contextData, changeTreeDom }) => {
  const style = {
    top: contextData.y,
    left: contextData.x
  }
  return (
    contextData.context === 'tree' ? (
      <div id='context-menu' style={style}>
        <div onClick={() => changeTreeDom('createFolder')}>
          <span>Create Folder</span>
        </div>
        <div onClick={() => changeTreeDom('createFile')}>
          <span>Create Page</span>
        </div>
        <div onClick={() => changeTreeDom('rename')}>
          <span>Rename</span>
        </div>
        <div onClick={() => changeTreeDom('delete')}>
          <span>Delete</span>
        </div>
      </div>
    ) : (
      <div id='context-menu' style={style}>
        <div onClick={() => changeTreeDom('createFolder')}>
          <span>Create Folder</span>
        </div>
      </div>
    )
  )
}

export default ContextMenu