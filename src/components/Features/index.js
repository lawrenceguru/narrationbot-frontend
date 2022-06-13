import React from "react"
import { Link } from "react-router-dom";
import featured_icon1 from '../../assets/image/featured_icon1.svg'
import featured_icon2 from '../../assets/image/featured_icon2.svg'
import featured_icon3 from '../../assets/image/featured_icon3.svg'
import featured_icon4 from '../../assets/image/featured_icon4.svg'
import './styles.css'

const Features = () => {
  return (
    <div id='featured'>
      <div className='row featuredTitle'>
        <div className='col-md-2'></div>
        <div className='col-md-8'>
          <div>
            We bring simplicity to your narration, so you can focus on creativity.
            <br/>Focus on your creativity while we simplify narration.
          </div>
        </div>
        <div className='col-md-2'></div>
      </div>
      <div className='featuredIconPanel'>
        <div className='row'>
          <div className='col-md-3'>
            <div className='featuredIconList'>
              <div>
                <img src={featured_icon1} alt='' />
              </div>
              <section>
                Effortlessly narrate your text using royalty free voices
              </section>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='featuredIconList'>
              <div>
                <img src={featured_icon2} alt='' />
              </div>
              <section>
                Access your files from anywhere using cloud storage
              </section>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='featuredIconList'>
              <div>
                <img src={featured_icon3} alt='' />
              </div>
              <section>
                Select from dozens of voices from a variety of languages
              </section>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='featuredIconList'>
              <div>
                <img src={featured_icon4} alt='' />
              </div>
              <section>
                Straight forward, easy to understand pricing
              </section>
            </div>
          </div>
        </div>
      </div>

      <div className='row answerPanel'>
        <div className='col-md-2'></div>
        <div className='col-md-4'>
          <div>
            <div>
              Sign up for a free trial and receive your first 1,000 words for free!
            </div>
            <div>
              <button class='defaultBtn'><Link to={"/register"}>Claim</Link></button>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div>
            <div>
              Questions?<br />
              We have answers!
            </div>
            <div>
              <button class='defaultBtn'><Link to={"/support"}>Support</Link></button>
            </div>
          </div>
        </div>
        <div className='col-md-2'></div>
      </div>
    </div>
  )
}

export default Features
