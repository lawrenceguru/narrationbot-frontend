import React, { useEffect, useState } from "react"
import { Row, Col, Select, Input } from 'antd'
import { connect } from "react-redux";
import './styles.css'
import { ReactComponent as EditIcon} from '../../../assets/image/edit_icon.svg'

const { Option } = Select
const Subscription = ({ user }) => {
  const [currentUser, setCurrentUser] = useState()
  useEffect(() => {
    if (user) {
      setCurrentUser(user)
    }
  }, [user])
  return (
    <div id='Subscription'>
      <div className='overviewPanel'>
        <header>Subscription & Credits</header>
        <footer>
          Manage your subscription or purchase more credits. 
        </footer>
      </div>
      <div className='SubscriptionFirstSubPanel'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='SubscriptionpricingSubPanel'>
              <header>
                <div className='row'>
                  <div className='self-md-50'>Subscription GOLD</div>
                  <div className='self-md-50'>CUrrent plan</div>
                </div>
              </header>
              <section>
                <div className='row'>
                  <div className='self-md-50'>
                    <aside>Monthly Credits</aside>
                  </div>
                  <div className='self-md-50'>
                    <aside>50,000</aside>
                  </div>
                </div>
                <div className='row'>
                  <div className='self-md-50'>
                    <aside>Included Storage</aside>
                  </div>
                  <div className='self-md-50'>
                    <aside> 10.00 GB</aside>
                  </div>
                </div>
                <div className='row'>
                  <div className='self-md-50'>
                    <aside>Price</aside>
                  </div>
                  <div className='self-md-50'>
                    <aside>$14.99 /month</aside>
                  </div>
                </div>
                <div className='row'>
                  <div className='self-md-50'>
                    <aside>Per credit</aside>
                  </div>
                  <div className='self-md-50'>
                    <aside>0.0002998</aside>
                  </div>
                </div>
                <div className='row'>
                  <div className='self-md-50'>
                    <aside>Renewal date</aside>
                  </div>
                  <div className='self-md-50'>
                    <aside>5/15/2022</aside>
                  </div>
                </div>
              </section>
            
            </div>
          </div>
          <div className='col-md-6'>
            <div className='SubscriptionpricingPayPanel'>
              <header>
                <div>Purchase Credits</div>
              </header>
              <div className='row'>
                
                <div className='self-md-30'>
                  <section>
                    Credits
                  </section>
                </div>
                <div className='self-md-30'>
                  <section>
                    Price
                  </section>
                </div>
                <div className='self-md-30'>
                  <section>
                    Per Credit
                  </section>
                </div>
              </div>

              <div className='row'>
                <div className='self-md-30'>
                  <aside className='first_child'>
                    10,000
                  </aside>
                </div>
                <div className='self-md-30'>
                  <aside>
                    $6.99
                  </aside>
                </div>
                <div className='self-md-30'>
                  <aside>
                    0.000699
                  </aside>
                </div>
              </div>
              <div className='row'>
                <div className='self-md-30'>
                  <aside className='first_child'>
                    25,000
                  </aside>
                </div>
                <div className='self-md-30'>
                  <aside>
                    $11.99
                  </aside>
                </div>
                <div className='self-md-30'>
                  <aside>
                    0.0004796
                  </aside>
                </div>
              </div>
              <div className='row'>
                
                <div className='self-md-30'>
                  <aside className='first_child'>
                    50,000
                  </aside>
                </div>
                <div className='self-md-30'>
                  <aside>
                    $19.99
                  </aside>
                </div>
                <div className='self-md-30'>
                  <aside>
                    0.0003998
                  </aside>
                </div>
                
              </div>
              <div className='row'>
                
                <div className='self-md-30'>
                  <aside className='first_child'>
                    100,000
                  </aside>
                </div>
                <div className='self-md-30'>
                  <aside>
                    $29.99
                  </aside>
                </div>
                <div className='self-md-30'>
                  <aside>
                    0.0002999
                  </aside>
                </div>
                
              </div>
              
            </div>

          </div>
        </div>
      </div>
      <div className='SubscriptionSubPanel'>
        <header>
          Change Subscription
        </header>
        <div className='row'>
          <div className='self-md-2'>
            <section>
              Subscription
            </section>
          </div>
          <div className='self-md-2'>
            <section>
              Price
            </section>
          </div>
          <div className='self-md-2'>
            <section>
              Credits per month
            </section>
          </div>
          <div className='self-md-2'>
            <section>
              Included Storage
            </section>
          </div>
        </div>

        <div className='row'>
          <div className='self-md-2'>
            <aside className='first_child'>
              Bronze
            </aside>
          </div>
          <div className='self-md-2'>
            <aside>
              $4.99
            </aside>
          </div>
          <div className='self-md-2'>
            <aside>
              10,000
            </aside>
          </div>
          <div className='self-md-2'>
            <aside>
              1.0 GB
            </aside>
          </div>
        </div>
        <div className='row'>
          <div className='self-md-2'>
            <aside className='first_child'>
              Silver
            </aside>
          </div>
          <div className='self-md-2'>
            <aside>
              $9.99
            </aside>
          </div>
          <div className='self-md-2'>
            <aside>
              25,000
            </aside>
          </div>
          <div className='self-md-2'>
            <aside>
              5.0 GB
            </aside>
          </div>
        </div>
        <div className='row'>
          <div className='self-md-2'>
            <aside className='first_child'>
              Gold
            </aside>
          </div>
          <div className='self-md-2'>
            <aside>
              $14.99
            </aside>
          </div>
          <div className='self-md-2'>
            <aside>
              50,000
            </aside>
          </div>
          <div className='self-md-2'>
            <aside>
              10.00 GB
            </aside>
          </div>
        </div>
        <div className='row'>
          <div className='self-md-2'>
            <aside className='first_child'>
              Platnum
            </aside>
          </div>
          <div className='self-md-2'>
            <aside>
              $24.99
            </aside>
          </div>
          <div className='self-md-2'>
            <aside>
              100,000
            </aside>
          </div>
          <div className='self-md-2'>
            <aside>
              20.00 GB
            </aside>
          </div>
        </div>
      </div>
      <div className='text-center'>
        <button className='defaultBtn'>Downgrade to free subscription to change subscription.</button>
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

export default connect(mapStateToProps)(Subscription);
