import React, { useState, useEffect } from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import { connect } from "react-redux";
import classNames from "classnames";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch } from "react-redux";

import { Tree, Modal } from 'antd';
import ContextMenu from './ContextMenu'
import DirectoriesService from '../../../services/directories.service'
import { selectDirectories } from "../../../actions/directories";
import './styles.css'

const { DirectoryTree } = Tree;

const DirectoryTreeStyle = styled(DirectoryTree)`
  & {
    .ant-tree-treenode-selected:before {
      background: transparent !important;
    }
    .ant-tree-treenode-selected .ant-tree-node-selected {
      background: #857e4dbf !important;
      border-radius: 5px !important;
      color: white !important;
    }
    .ant-tree-treenode-selected .ant-tree-switcher {
      color: black !important;
    }
    .ant-tree-title {
      font-size: 20px;
      margin-left: 5px;
      font-family: emoji;
    }
    svg {
      width: 20px;
      height: 20px;
    }
    .ant-tree-switcher svg {
      width: 15px;
      height: 15px;
    }
  }
  margin-right: 20px;
`
const UnTreeContext =styled.div`
  & {
    section {
      border: 1px dashed #D7D7D7;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: #404656;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      cursor: pointer;
      padding: 10px;
    }
    min-height: calc(100vh - 450px);
    margin-right: 20px;
  }
`
const ModalStyled = styled(Modal)`
  .ant-modal-body {
    padding-top: 40px;
    input {
      margin-bottom: 30px;
    }
  }
  .ant-modal-header, .ant-modal-footer, .ant-modal-close {
    display: none;
  }
  .defaultBtn {
    background-color: #85714D;
    color: white;
    font-family: 'Poppins';
    font-style: normal;
    padding: 9px 21px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 16px;
    border: 0;
    cursor: pointer;
  }
  .defaultBtn:hover {
    opacity: 0.8;
    transition: opacity 0.5s
  }
  input {
    display: block;
    width: 100%;
    padding: 5px;
    background: #FCFCFC;
    border: 1px solid #F4F4F4;
    border-radius: 10px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    color: #A5A5A5;
  }
  input:focus {
    outline: none !important;
    border: 1px solid #dbdada !important;
  }
`
function list_to_tree(list) {
  var map = {}, node, roots = [], i;
  
  list.map(res => {
    if (!res.isLeaf) {
      res.isLeaf = null
    }
    return res
  })
  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }
  
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentId !== 0) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parentId]] && list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  console.log(roots)
  return roots;
}

var Entries = [
  {
    "id": "1",
    "parentId": 0,
    title: "Man",
    "level": 1,
    isLeaf: null
  }
];


const TreeViewSidebar = ({ isOpen, toggle, user, directories }) => {
  const [currentUser, setCurrentUser] = useState()
  const [visible, setVisible] = useState(false)
  const [contextData, setContextData] = useState()
  const [treeData, setTreeData] = useState()
  const [visibleModal, setVisibleModal] = useState(false)
  const [entries, setEntries] = useState([])
  const dispatch = useDispatch();
  
  console.log(directories, 'directories')
  useEffect(() => {
    DirectoriesService.getAllDir({user_id: 1}).then(res => {
      setEntries(res.data)
      setTreeData(prev => prev = setTreeData(list_to_tree(res.data)))
    })
  }, [])
  // useEffect(() => {
  //   setTreeData(list_to_tree(Entries))
  // }, [entries])
  useEffect(() => {
    if (user) {
      setCurrentUser(user)
    }
  }, [user])

  useEffect(() => {
    const closeMenu = () => {
      setVisible(false)
    }
    window.addEventListener('click', closeMenu)
  })

  const onSelect = (keys, info) => {
    var data = {
      id: info.node.id,
      parent_id: info.node.parent_id,
      user_id: info.node.user_id,
      isLeaf: info.node.isLeaf,
      title: info.node.title
    }
    dispatch(selectDirectories(data))
  };

  const onExpand = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };
  const showContextMenu = (e, val) => {
    if (val === 'tree') {
      setContextData({
        x: e.event.clientX,
        y: e.event.clientY,
        parentId: e.node.parentId,
        id: e.node.id,
        isLeaf: e.node.isLeaf,
        level: e.node.level,
        title: e.node.title,
        context: 'tree'
      })
    } else {
      e.preventDefault()
      setContextData({
        x: e.clientX,
        y: e.clientY,
        parentId: 0,
        context: 'unTree'
      })
    }
    setVisible(true)
  }
  // treeNodeonRightClick = e => {
  //   this.setState({
  //     display:'block',
  //     rightClickNodeTreeItem: {
  //       pageX: e.event.pageX,
  //       pageY: e.event.pageY,
  //       id: e.node.props['data-key'],
  //       categoryName: e.node.props['data-title'],
  //     },
  //   });
  //   this.
  //  //console.log("id::",e.node.props["title"])
  // };
  const changeTreeDom = val => {
    if (val === 'createFolder') {
      if (!contextData.isLeaf) {
        var param = []
        if (contextData.context === 'tree') {
          param = {
            parentId: contextData.id,
            title: "New Folder",
            level: Number(contextData.level) + 1,
            isLeaf: false,
            user_id: currentUser.id
          }
        } else {
          param = {
            parentId: 0,
            title: "New Folder",
            isLeaf: false,
            level: 1,
            user_id: currentUser.id
          }
        }
        DirectoriesService.createDir(param).then(res => {
          // setEntries(res.data)
          entries.push({
            id: res.data.id,
            parentId: res.data.parentId,
            title: res.data.title,
            level: res.data.level,
            isLeaf: res.data.isLeaf
          })
          setTreeData(prev => prev = setTreeData(list_to_tree(entries)))
        })
      }
    } else if (val === 'createFile') {
      if (!contextData.isLeaf) {
        var param = {
          parentId: contextData.id,
          title: "New Page",
          level: Number(contextData.level) + 1,
          isLeaf: true,
          user_id: currentUser.id
        }
        DirectoriesService.createDir(param).then(res => {
          entries.push({
            id: res.data.id,
            parentId: res.data.parentId,
            title: res.data.title,
            level: res.data.level,
            isLeaf: res.data.isLeaf
          })
          setTreeData(prev => prev = setTreeData(list_to_tree(entries)))
        })
      }
    } else if (val === 'rename') {
      setVisibleModal(true)
    } else {
      var param = {
        id: contextData.id
      }
      DirectoriesService.deleteDirId(param).then(res => {
        const deleteIndex = entries.findIndex(res => res.id === contextData.id)
        entries.splice(deleteIndex, 1)
        setTreeData(prev => prev = setTreeData(list_to_tree(entries)))
      })
    }
  }
  const changeTreeViewName = () => {
    setVisibleModal(false)
    var param = {
      id: contextData.id,
      title: contextData.title
    }
    DirectoriesService.updateDirName(param).then(res => {
      const itemIndex = entries.findIndex(data => data.id === contextData.id)
      entries[itemIndex].title = contextData.title
      setTreeData(prev => prev = setTreeData(list_to_tree(entries)))
    })
  }
  const onChangeRenameTxt = (e) => {
    setContextData(prev => {
      return {
        ...prev,
        title: e
      }
    })
  }
  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="TreeViewSidebarHeader">
        My Folder
      </div>
      <div className="side-menu">
        <DirectoryTreeStyle
          multiple
          defaultExpandAll
          onSelect={onSelect}
          onExpand={onExpand}
          treeData={treeData}
          onRightClick={(e) => showContextMenu(e, 'tree')}
        />
        {visible ?
          <ContextMenu contextData={contextData} changeTreeDom={changeTreeDom} />
        : null}
        <UnTreeContext onContextMenu={e => showContextMenu(e, 'unTree')}>
          {treeData?.length === 0 &&
            <section>
              Create folder and page pressing right click to make narration page.
            </section>
          }
        </UnTreeContext>
      </div>
      <ModalStyled
        title="Modal"
        visible={visibleModal}
      >
        <p>
          <input
            value={contextData?.title}
            onChange={e => onChangeRenameTxt(e.target.value)}
            type='text'
          />
        </p>
        <div className='text-center'>
          <button  className='defaultBtn' onClick={() => changeTreeViewName()}>Rename</button>
        </div>
      </ModalStyled>
    </div>
  )
}

function mapStateToProps(state) {
  const { user, directories } = state.auth;
  return {
    user,
    directories
  };
}

export default connect(mapStateToProps)(TreeViewSidebar);