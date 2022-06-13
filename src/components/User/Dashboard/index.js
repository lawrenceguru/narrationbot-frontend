import React, { useEffect, useState } from "react"
import { Row, Col, Select, Input } from 'antd'
import { connect } from "react-redux";
import './styles.css'
import { ReactComponent as EditIcon} from '../../../assets/image/edit_icon.svg'
// import { ReactComponent as DownlaodIcon} from '../../../assets/image/download_icon.svg'

const { Option } = Select
const Dashboard = ({ user }) => {
  const [currentUser, setCurrentUser] = useState()
  useEffect(() => {
    if (user) {
      setCurrentUser(user)
    }
  }, [user])
  return (
    <div id='Dashboard'>
      <div className='overviewPanel'>
        <header>Overview</header>
        <footer>
          Manage your account infrmation, credit, subscription and change your narration settings. 
        </footer>
      </div>
      <div className='row DashboardSettingPanel' >
        <div className='col-md-6'>
          <section>
            <header>
              <div>
                USER SETTINGS
              </div>
              <div>
                User Information
              </div>
              <div>
                You can edit your name, email address, account password, and language.
              </div>
            </header>
            <footer>
              <div className='row'>
                <div className='col-md-6'>Firstname</div>
                <div className='col-md-6'>{currentUser?.firstname}</div>
              </div>
              <div className='row'>
                <div className='col-md-6'>Lastname</div>
                <div className='col-md-6'>{currentUser?.lastname}</div>
              </div>
              <div className='row'>
                <div className='col-md-6'>Email</div>
                <div className='col-md-6'>{currentUser?.email}</div>
              </div>
              <div>
                <EditIcon />
              </div>
            </footer>
          </section>
        </div>
        <div className='col-md-6'>
          <section>
            <header>
              <div className='row'>
                <div className='col-md-6'>
                  Subscription GOLD
                </div>
                <div className='col-md-6'>
                  <span>Credit Balance: </span>
                  <span>{currentUser?.balence?.toLocaleString()}</span>
                </div>
              </div>
              <div>
              Manage Credits
              </div>
              <div>
              You can change your subscription, or purchase credits
              </div>
            </header>
            <footer>
              <div className='row'>
                <div className='col-md-6'>Subscription</div>
                <div className='col-md-6'>Gold</div>
              </div>
              <div className='row'>
                <div className='col-md-6'>Monthly Credits</div>
                <div className='col-md-6'>100,000</div>
              </div>
              <div className='row'>
                <div className='col-md-6'>Included Storage</div>
                <div className='col-md-6'>10 GB</div>
              </div>
              <div>
                <EditIcon />
              </div>
            </footer>
          </section>
        </div>
      </div>
      <div className='DashboardMyFilesPanel'>
        <section>
          <header>
            <div>
            MY FILES
            </div>
            <div>
            Recent Files
            </div>
            <div>
            You can re download recently created narrations below.
            </div>
          </header>
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
            <div>
              See more history in <span>My Files</span>
            </div>
          </footer>
        </section>
      </div>
      <div className='DashboardNarrateSetting'>
        <section>
          <header>
            <div>
            Default Narration Settings
            </div>
            <div>
            Narration Settings
            </div>
            <div>
            You can change default voice and location settings for your narrations.
            </div>
          </header>
          <footer>
            <div className='row'>
              <div className='col-md-6'>
                <nav>
                  <div>Default Voice</div>
                  <div>
                    this is the voice that will be pre selected for your 
                    narration. So, if you do not change the narrator voice on 
                    the narration page, this one will be used.
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div>Language & Region</div>
                      <Select defaultValue="us" style={{ width: '100% '}}>
                        <Option value="us">English, Us</Option>
                      </Select>
                    </div>
                    <div className='col-md-6'>
                      <div>Narrator</div>
                      <Select defaultValue="us" style={{ width: '100%' }}>
                        <Option value="us">English, Us</Option>
                      </Select>
                    </div>
                  </div>
                </nav>
              </div>
              <div className='col-md-6'>
                <nav>
                  <div>Default Location</div>
                  <div>
                    This will be the folder your narrations will go into if you do 
                    not change locations before narrating.
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div>Language</div>
                    </div>
                    <div className='col-md-6 clickChange'>
                      Click to change
                    </div>
                    <div className='col-md-12'>
                      <Input />
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </footer>
        </section>
      </div>
      <div className='DashboardFooter'>
        <button className='defaultBtn'>Save</button>
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

export default connect(mapStateToProps)(Dashboard);
