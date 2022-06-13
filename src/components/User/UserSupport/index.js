import React, { useEffect, useState } from "react"
// import { Row, Col, Select, Input } from 'antd'
import { connect } from "react-redux";
import './styles.css'
import { ReactComponent as ClipIcon} from '../../../assets/image/clipIcon.svg'

const UserSupport = ({ user }) => {
  const [currentUser, setCurrentUser] = useState()
  useEffect(() => {
    if (user) {
      setCurrentUser(user)
    }
  }, [user])
  return (
    <div id='UserSupport'>
      <div className='overviewPanel'>
        <header>Support</header>
        <footer>
          {/* This is where you can ask questions, request new features, or report issues. */}
        </footer>
      </div>
      <div className='SupportPanel'>
        <header>
          <div>I would like to</div>
          <div className='row'>
            <div className='col-md-4'>
              <section>
                Ask a Question
              </section>
            </div>
            <div className='col-md-4'>
              <section className='centerSection'>
                Request a Feature
              </section>
            </div>
            <div className='col-md-4'>
              <section>
                Report an Issue
              </section>
            </div>
          </div>
        </header>
        <nav>
          <div>
            <input type='text' placeholder='Subject' />
          </div>
          <div>
            <textarea placeholder='Type your message here'></textarea>
          </div>
        </nav>
        <footer>
          <div className='row'>
            <div className='col-md-6'>
              <div className='clipIcon'>
                <ClipIcon /> Attach File
              </div>
            </div>
            <div className='col-md-6 text-right'>
              <button className='defaultBtn'>Submit</button>
            </div>
          </div>
        </footer>
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

export default connect(mapStateToProps)(UserSupport);
