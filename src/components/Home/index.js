import React, { useState, useEffect } from "react"
import { Row, Col, Input } from 'antd'
import { Polly } from "@aws-sdk/client-polly";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { getSynthesizeSpeechUrl } from "@aws-sdk/polly-request-presigner";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { Link } from "react-router-dom";
import './styles.css'
import play_btn from '../../assets/image/play_btn.svg'
import avatar1 from '../../assets/image/avatar1.svg'
import avatar2 from '../../assets/image/avatar2.svg'
import avatar3 from '../../assets/image/avatar3.svg'
import { error } from '../Customs/Modals/Alert.js'

const client = new Polly({
  region: "us-east-1",
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: "us-east-1" }),
    identityPoolId: "us-east-1:1b4b8a28-f01e-4b2c-a7a7-9fdb90f4f2dc" // IDENTITY_POOL_ID
  }),
});

const Home = () => {
  const [txt, setTxt] = useState()
  const [dangerTxt, setDangerTxt] = useState(false)
  const [devideLength, setDevideLength] = useState(0)
  const [audio, setAudio] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (devideLength > 50) {
      // setDevideLength(50)
      setDangerTxt(true)
    } else {
      setDangerTxt(false)
    }
  }, [devideLength])
  const onChangeText = (e) => {
    if (devideLength < 50 || e.length < txt?.length) {
      setTxt(e)
      if(e === '') {
        setDevideLength((prev) => 0)
      } else {
        setDevideLength((prev) => e.split(' ').length)
      }
    }
  }
  const listenToSpeech = async () => {
    if (devideLength > 50) {
      error('You have to login')
    } else {
      setLoading(true)
      const speechParams = {
        Engine: "neural",
        OutputFormat: "mp3", // For example, 'mp3'
        SampleRate: '16000', // For example, '16000
        Text: txt, // The 'speakText' function supplies this value
        TextType: "text", // For example, "text"
        VoiceId: "Joanna" // For example, "Matthew"
      };
      try {
        let urlSpeech = await getSynthesizeSpeechUrl({
          client, params: speechParams
        });
        // Load the URL of the voice recording into the browser
        setAudio(urlSpeech)
        document.getElementById('speechAudio').play()
        setLoading(false)
      } catch (err) {
        console.log("Error", err);
        setLoading(false)
      }
    }
  }
  return (
    <div id='formContent'>
      <div className='row'>
        <div className='col-md-6 trialPanel'>
          <div>
            FINALLY, <span>AI Narration</span> that's simple and priced right for you!
          </div>
          <div>
            Enjoy your first 1000 words on us when you sign up. 
          </div>
          <div>
            <button className='defaultBtn'>Start today</button>
          </div>
        </div>
        <div className='col-md-6 writePanel'>
          <div>
            <div>
              Try NarrationBot. Type your sample text and turn it into speech. 
            </div>
            <div>
              <textarea
                value={txt}
                placeholder='Write Here ...'
                onChange={e => onChangeText(e.target.value)}
              />
              <div className='text-right'>
                <span className={dangerTxt ? 'active' : ''}>{devideLength}</span>
                <span>/50 words</span>
              </div>
            </div>
            <div>
              <button disabled={loading ? 'disabled' : ''} onClick={() => listenToSpeech()}>
                <img alt='' width={100} height={100} src={play_btn} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-8 bringPanel'>
          <div>
            <div>
              BRING YOUR WRITING TO THE NEXT LEVEL BY LEVERAGING THE POWER OF AI NARRATION
            </div>
            <div>
              Turn your words into speech. NarrationBot is simple to use and gives you access to a wide range of voices. 
            </div>
            <div>
              Best of all, by using our uncomplicated subscription or pay as you options you will always know what you're paying. 
            </div>
            <div>
              <button className='defaultBtn'>Learn More</button>
            </div>
          </div>
        </div>
        <div className='col-md-2'></div>
      </div>
      <div className='row avatarPanel'>
        <div className='col-md-12'>WHAT OUR CLIENT SAY?</div>
        <div className='col-md-4'>
          <div className='avatar_img'>
            <img src={avatar1} alt='' />
          </div>
          <div className='avatar_title'>
            I NEVER POST AN ARTICLE WITHOUT  USING NARRATIONBOT FIRST!
          </div>
          <div className='avatar_content'>
            It's now part of my business process and provides me with an extra level of security knowing that my article is accurate and ready to post. I also love the simple pricing model so I know exactly how much I need to budget.
          </div>
        </div>
        <div className='col-md-4'>
          <div className='avatar_img'>
            <img src={avatar2} alt='' />
          </div>
          <div className='avatar_title'>
            NarrationBot helps me catch the errors before I send it for professional narration.
          </div>
          <div className='avatar_content'>
            It's important that my writing is absolutely error free before I send it  for professional narration. NarrationBot gives me that peace of mind and confidence that my work is ready to for professional Narration.
          </div>
        </div>
        <div className='col-md-4'>
          <div className='avatar_img'>
            <img src={avatar3} alt='' />
          </div>
          <div className='avatar_title'>
            As a creative, it has taken my editing to a new level. 
          </div>
          <div className='avatar_content'>
            Listening to my writing read back to me exactl as it is written helps me evolve and edit my work. NarrationBot is now part of my creative process. 
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
              <button className='defaultBtn'><Link to={"/register"}>Claim</Link></button>
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
              <button className='defaultBtn'><Link to={"/support"}>Support</Link></button>
            </div>
          </div>
        </div>
        <div className='col-md-2'></div>
      </div>
      <audio style={{ display: 'none' }} src={audio && audio} id="speechAudio" />
    </div>
  )
}

export default Home
