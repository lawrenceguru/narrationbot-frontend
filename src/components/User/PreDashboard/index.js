import React from "react"
import './styles.css'
import { history } from '../../../helpers/history';

const PreDashboard = () => {
  const goToDashboard = () => {
    history.push('/dashboard')
  }
  return (
    <div id='PreDashboard'>
      <div className='row PreDashboardTitle'>
        <div className='col-md-2'></div>
        <div className='col-md-8'>
          <section>
            <header>
              Thank you for signing up!
              <div>
                Begin your narration now. You already have 1000 free words on us! 
                Access more words by subscribing or purchasing additional credits. 
              </div>
            </header>
            <aside>
              NarrationBot has an easy to understand pricing options. <br/>You pay per word. 1 credit = 1 word. Simple as that!
            </aside>
            <footer>
              <button  class='defaultBtn' onClick={() => goToDashboard()}>Go to Dashboard</button>
            </footer>
          </section>
        </div>
        <div className='col-md-2'></div>
      </div>
      <div className='PreDashboardSubPanel'>
        <header>
          Subscriptions
        </header>
        <div className='row'>
          <div className='col-md-2'></div>
          <div className='col-md-2'>
            <section>
              <header>
                <div>Bronze</div>
                <div> <span>$4.99</span></div>
              </header>
              <aside>
                <div>
                  10,000 Credits per month
                  <br/>0.000499 Per Credit
                </div>
                <div>1 GB Included Storage</div>
              </aside>
              <footer>
                <button  class='defaultBtn'>Buy Bronze</button>
              </footer>
            </section>
          </div>
          <div className='col-md-2'>
            <section>
              <header>
                <div>Silver</div>
                <div> <span>$9.99</span></div>
              </header>
              <aside>
                <div>25,000 Credits per month
                  <br/>0.0003996 Per Credit</div>
                <div>5 GB Included Storage</div>
              </aside>
              <footer>
                <button  class='defaultBtn'>Buy Silver</button>
              </footer>
            </section>
          </div>
          <div className='col-md-2'>
            <section>
              <header>
                <div>Gold</div>
                <div> <span>$14.99</span></div>
              </header>
              <aside>
                <div>50,000 Credits per month
                  <br/>0.0002998 Per Credit</div>
                <div>10 GB Included Storage</div>
              </aside>
              <footer>
                <button  class='defaultBtn'>Buy Gold</button>
              </footer>
            </section>
          </div>
          <div className='col-md-2'>
            <section>
              <header>
                <div>PLATINUM</div>
                <div> <span>$24.99</span></div>
              </header>
              <aside>
                <div>100,000 Credits per month
                  <br/>0.00025 Per Credit</div>
                <div>20 GB Included Storage</div>
              </aside>
              <footer>
                <button  class='defaultBtn'>Buy Platinum</button>
              </footer>
            </section>
          </div>
          <div className='col-md-2'></div>
        </div>

      </div>
      
      <div className='PreDashboardPayPanel'>
        <header>
          <div>Pay as you go</div>
          <div>Purchase Credits</div>
        </header>
        <div className='row'>
          <div className='col-md-2'></div>
          <div className='col-md-2'>
            <section>
              <header>
                <div>10,000</div>
                <div><span>$6.99</span></div>
              </header>
              <aside>
                0.000699 Per Credit
              </aside>
              <footer>
                <button  class='defaultBtn'>Buy Now</button>
              </footer>
            </section>
          </div>
          <div className='col-md-2'>
            <section>
              <header>
                <div>25,000</div>
                <div> <span>$11.99</span></div>
              </header>
              <aside>
                0.0004796 Per Credit
              </aside>
              <footer>
                <button  class='defaultBtn'>Buy Now</button>
              </footer>
            </section>
          </div>
          <div className='col-md-2'>
            <section>
              <header>
                <div>50,000</div>
                <div> <span>$19.99</span></div>
              </header>
              <aside>
               0.0003998 Per Credit
              </aside>
              <footer>
                <button  class='defaultBtn'>Buy Now</button>
              </footer>
            </section>
          </div>
          <div className='col-md-2'>
            <section>
              <header>
                <div>100,000</div>
                <div> <span>$29.99</span></div>
              </header>
              <aside>
               0.0002999 Per Credit
              </aside>
              <footer>
                <button  class='defaultBtn'>Buy Now</button>
              </footer>
            </section>
          </div>
          <div className='col-md-2'></div>
        </div>
      </div>

      {/* <div className='PreDashboardReadyPanel'>
        <header>Ready to get started?</header>
        <section>
          Sign up for a free trial and receive your <br />first 1,000 words for free!
        </section>
        <footer>
          <button  class='defaultBtn'>Start Trial</button>
        </footer>
      </div> */}
    </div>
  )
}

export default PreDashboard
