import React, { useEffect, useState } from "react"
import { Row, Col, Select, Input } from 'antd'
import { connect } from "react-redux";
import './styles.css'
import { ReactComponent as EditIcon} from '../../../assets/image/edit_icon.svg'
// import { ReactComponent as DownlaodIcon} from '../../../assets/image/download_icon.svg'

const { Option } = Select
const MyFiles = ({ user }) => {
  const [currentUser, setCurrentUser] = useState()
  useEffect(() => {
    if (user) {
      setCurrentUser(user)
    }
  }, [user])
  
  return (
    <div id='MyFiles'>
      <div className='overviewPanel'>
        <header>My Files</header>
        <footer>
          You can re-download recently created narrations. Use the folder tree on the left to find past narrations.
        </footer>
      </div>
      <div className='MyFilesMyFilesPanel'>
        <section>
          <footer>
            <Row gutter={8}>
              <Col span={6}>
                <aside>Subscription</aside>
              </Col>
              <Col span={3}>
                <aside>Date</aside>
              </Col>
              <Col span={3}>
                <aside>Duration</aside>
              </Col>
              <Col span={3}>
                <aside>Words</aside>
              </Col>
              <Col span={6}>
                <aside>Location</aside>
              </Col>
              <Col span={3}>
                <aside>Download</aside>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={6}>
                <nav>In_the_night...22:11:09.mp3 </nav>
              </Col>
              <Col span={3}>
                <nav>5/15/2022</nav>
              </Col>
              <Col span={3}>
                <nav>1:25 </nav>
              </Col>
              <Col span={3}>
                <nav>155 </nav>
              </Col>
              <Col span={6}>
                <nav>Unsorted</nav>
              </Col>
              <Col span={3}>
                <nav className='last_child'></nav>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={6}>
                <nav>In_the_night...22:11:09.mp3 </nav>
              </Col>
              <Col span={3}>
                <nav>5/15/2022</nav>
              </Col>
              <Col span={3}>
                <nav>1:25 </nav>
              </Col>
              <Col span={3}>
                <nav>155 </nav>
              </Col>
              <Col span={6}>
                <nav>Unsorted</nav>
              </Col>
              <Col span={3}>
                <nav className='last_child'></nav>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={6}>
                <nav>In_the_night...22:11:09.mp3 </nav>
              </Col>
              <Col span={3}>
                <nav>5/15/2022</nav>
              </Col>
              <Col span={3}>
                <nav>1:25 </nav>
              </Col>
              <Col span={3}>
                <nav>155 </nav>
              </Col>
              <Col span={6}>
                <nav>Unsorted</nav>
              </Col>
              <Col span={3}>
                <nav className='last_child'></nav>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={6}>
                <nav>In_the_night...22:11:09.mp3 </nav>
              </Col>
              <Col span={3}>
                <nav>5/15/2022</nav>
              </Col>
              <Col span={3}>
                <nav>1:25 </nav>
              </Col>
              <Col span={3}>
                <nav>155 </nav>
              </Col>
              <Col span={6}>
                <nav>Unsorted</nav>
              </Col>
              <Col span={3}>
                <nav className='last_child'></nav>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={6}>
                <nav>In_the_night...22:11:09.mp3 </nav>
              </Col>
              <Col span={3}>
                <nav>5/15/2022</nav>
              </Col>
              <Col span={3}>
                <nav>1:25 </nav>
              </Col>
              <Col span={3}>
                <nav>155 </nav>
              </Col>
              <Col span={6}>
                <nav>Unsorted</nav>
              </Col>
              <Col span={3}>
                <nav className='last_child'></nav>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={6}>
                <nav>In_the_night...22:11:09.mp3 </nav>
              </Col>
              <Col span={3}>
                <nav>5/15/2022</nav>
              </Col>
              <Col span={3}>
                <nav>1:25 </nav>
              </Col>
              <Col span={3}>
                <nav>155 </nav>
              </Col>
              <Col span={6}>
                <nav>Unsorted</nav>
              </Col>
              <Col span={3}>
                <nav className='last_child'></nav>
              </Col>
            </Row>
          </footer>
        </section>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(MyFiles);
