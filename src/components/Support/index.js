import React from "react"
import './styles.css'
import support_video from '../../assets/image/support_video.svg'
import support_play_btn from '../../assets/image/support_play_btn.svg'

const Support = () => {
  return (
    <div id='support'>
      <div className='supportPanel'>
        <div className='row'>
          <div className='col-md-6' style={{ alignSelf: 'center' }}>
            <section>
              <header>
                <div>
                  Need help using NarrationBot? 
                </div>
                <div>
                  Check out our video tutorial
                </div>
              </header>
              <div>
                <img src={support_video} alt='' />
                <aside>
                  <img src={support_play_btn} alt='' />
                </aside>
              </div>
            </section>
          </div>
          <div className='col-md-6' style={{ alignSelf: 'center' }}>
            <section>
              <header>
                <div>
                  Have a question?
                </div>
                <div>
                  Submit it below to get an answer!
                </div>
              </header>
              <nav>
                <input placeholder='Write Here...' />
                <textarea placeholder='Write Here...'></textarea>
                <button  className='defaultBtn'>Submit</button>
              </nav>
            </section>
          </div>
        </div>
      </div>
      <div className='supportReadyPanel'>
        <header>Ready to get started?</header>
        <section>
          Sign up for a free trial and receive your <br />first 1,000 words for free!
        </section>
        <footer>
          <button  className='defaultBtn'>Claim</button>
        </footer>
      </div>
    </div>
  )
}

export default Support
