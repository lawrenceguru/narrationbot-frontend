import React, { useEffect, useState } from "react"
import { Polly } from "@aws-sdk/client-polly";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { getSynthesizeSpeechUrl } from "@aws-sdk/polly-request-presigner";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Select, Input } from 'antd'
import { connect } from "react-redux";
import { addBalence } from "../../../actions/account";
import Languages from "../../../config/configLanguages.json"
import UserService from "../../../services/user.service";
import { error } from '../../Customs/Modals/Alert.js'
import directoriesService from '../../../services/directories.service'
import './styles.css'
import { userRoutes } from "../../../routes/allRoutes";
// import { ReactComponent as ClipIcon} from '../../../assets/image/clipIcon.svg'
// import { ReactComponent as DownlaodIcon} from '../../../assets/image/download_icon.svg'
const client = new Polly({
  region: "us-east-1",
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: "us-east-1" }),
    identityPoolId: "us-east-1:1b4b8a28-f01e-4b2c-a7a7-9fdb90f4f2dc" // IDENTITY_POOL_ID
  }),
});


const Option = Select
const Narrate = ({ user, balence, directories }) => {
  const [currentUser, setCurrentUser] = useState()
  const [voicer, setVoicer] = useState([])
  const [voicerId, setVoicerId] = useState('loading')
  const [loading, setLoading] = useState({voicer: false, narrate: false})
  const [text, setText] = useState('')
  const [devideLength, setDevideLength] = useState(0)
  const [dangerTxt, setDangerTxt] = useState(false)
  const [language, setLanguage] = useState('en-US')
  const [audio, setAudio] = useState()
  const [selectPage, setSelectPage] = useState({})
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      setCurrentUser(user)
    }
  }, [user])
  useEffect(() => {
    if (directories?.isLeaf) {
      directoriesService.getPage(directories.id).then(res => {
        console.log(res)
        if (res.data) {
          setText(res.data.sentence)
          setDevideLength(res.data.sentence.split(' ').length)
          getVoiceUserSearch(res.data.language, res.data.voicer)
        } else {
          setText('')
          setDevideLength(0)
          getVoiceUserSearch('en-US', false)
        }
      })
      .catch(error => {
        console.log(error)
      })
      setSelectPage(directories)
    } else {
      setText('')
      setDevideLength(0)
      getVoiceUserSearch('en-US', false)
      setSelectPage({ ...directories, title: '' })
    }
  }, [directories])
  
  useEffect(() => {
    setLoading({
      voicer: true,
      narrate: false
    })
    UserService.getVoiceUser(language)
      .then(({ data }) => {
        setVoicer(data.Voices)
        setVoicerId(data.Voices[0].Id)
        setLoading({
          voicer: false,
          narrate: false
        })
      })
      .catch((data) => {
        console.log(data)
      });
  }, [Languages])

  useEffect(() => {
    if (text.length >= 3000) {
      setDangerTxt(true)
    } else {
      setDangerTxt(false)
    }
  }, [devideLength])

  const getVoiceUser = val => {
    setLanguage(val)
    setLoading({
      voicer: true,
      narrate: false
    })
    setVoicerId('loading')
    UserService.getVoiceUser(val)
      .then(({ data }) => {
        setVoicer(data.Voices)
        var tempVoicers = data.Voices.find(res => res.SupportedEngines.includes('neural') === true )
        setVoicerId(tempVoicers.Id)
        setLoading({
          voicer: false,
          narrate: false
        })
      })
      .catch((data) => {
        console.log(data)
      });
  }

  const getVoiceUserSearch = (val, voicer) => {
    setLanguage(val)
    setLoading({
      voicer: true,
      narrate: false
    })
    setVoicerId('loading')
    UserService.getVoiceUser(val)
      .then(({ data }) => {
        setVoicer(data.Voices)
        var tempVoicers = data.Voices.find(res => res.SupportedEngines.includes('neural') === true )
        if (voicer) {
          setVoicerId(voicer)
        } else {
          setVoicerId(tempVoicers.Id)
        }
        setLoading({
          voicer: false,
          narrate: false
        })
      })
      .catch((data) => {
        console.log(data)
      });
  }

  const listenToSpeech = async () => {
    if (text && voicerId) {
      if (currentUser?.balence - devideLength < 0) {
        error('Your balance is low')
      } else {
        setLoading({
          voicer: false,
          narrate: true
        })
        const speechParams = {
          Engine: "neural",
          OutputFormat: "mp3", // For example, 'mp3'
          SampleRate: '16000', // For example, '16000
          Text: text, // The 'speakText' function supplies this value
          TextType: "text", // For example, "text"
          VoiceId: voicerId // For example, "Matthew"
        };
        try {
          let urlSpeech = await getSynthesizeSpeechUrl({
            client, params: speechParams
          });
          // Load the URL of the voice recording into the browser
          setAudio(urlSpeech)
          document.getElementById('speechAudio').play()

          // ---- send API
          var sendBalence = currentUser.balence - devideLength
          // setBalence((prev) => prev = prev - devideLength)
          var tempUser = {}
          tempUser.balence = Number(sendBalence)
          tempUser.language = language
          tempUser.sentence = text
          tempUser.user_id = currentUser.id
          tempUser.voicer = voicerId
          tempUser.url = ''
          tempUser.page_id = selectPage.id
          tempUser.cut_balence = devideLength
          console.log(tempUser, 'tempUser')
          dispatch(addBalence(tempUser))
          // -----

          setLoading({
            voicer: false,
            narrate: false
          })
        } catch (err) {
          console.log("Error", err);
          setLoading({
            voicer: false,
            narrate: false
          })
        }
      }
    } else {
      error('The text field is required')
    }
  }
  const onChangeText = (e) => {
    if (e.length <= 3000) {
      setText(e)
      if(e === '') {
        setDevideLength((prev) => 0)
      } else {
        setDevideLength((prev) => e.split(' ').length)
      }
    }
  }
  return (
    <div id='Narrate'>
      <div className='overviewPanel'>
        <header>Narrate</header>
        <footer>
          Access and download recently created narrations. Past narrations are featured on the My Folders menu on the left navigation. 
        </footer>
      </div>
      <div className='NarratePanel'>
        <header>
          <div>
            {selectPage?.title}
          </div>
          <div>
            Credit Balance: <span>{currentUser?.balence?.toLocaleString()}</span>
            Document Size:
            <span>{devideLength} Words</span>
          </div>
        </header>
        <section>
          <textarea value={text} onChange={(e) => onChangeText(e.target.value)}></textarea>
          <footer>
            <div className='row'>
              <div className='col-md-3'>
                <span className={dangerTxt ? 'active' : ''}>{text?.length}</span> Characters
              </div>
              <div className='col-md-9'>
                Tips: Want instant narration? Keep your text under 3,000 characters. 
              </div>
            </div>
          </footer>
        </section>
        <footer>
          <div className='row'>
            <div className='col-md-3'>
              <div>Language & Region</div>
              <Select value={language} style={{ width: '100% '}} onChange={(e) => getVoiceUser(e)}>
                {Languages?.data.map((_res, index) => (
                  <Option key={index} disabled={_res.standardEngin} value={_res.LanguageCode}>{_res.Language}</Option>
                ))}
              </Select>
            </div>
            <div className='col-md-3'>
              <div>Voicer</div>
              <Select value={voicerId} style={{ width: '100%' }} onChange={(e) => setVoicerId(e)}>
                {loading.voicer &&
                  <Option value='loading'>
                    <span className="spinner-border spinner-border-sm"></span> Loading...
                  </Option>
                }
                {voicer && voicer.map((_res, index) => (
                  <Option key={index} value={_res.Id} disabled={!_res.SupportedEngines.includes('neural')}>{_res.Name} ({_res.Gender})</Option>
                ))}
              </Select>
            </div>
            <div className='col-md-4'>
              <div>Name your file <span className='grayColor'>(optional)</span></div>
              <Input />
            </div>
            <div className='col-md-2'>
              <div>Click to change</div>
              <button className='defaultBtn' onClick={() => listenToSpeech()}>
                {loading.narrate ?
                  <>
                    <span className="spinner-border spinner-border-sm"></span> Loading...
                  </>
                : <>Narrate</>}
              </button>
            </div>
          </div>
        </footer>
      </div>
      <audio style={{ display: 'none' }} src={audio && audio} id="speechAudio" />
    </div>
  )
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { directories } = state.directories;
  return {
    user,
    directories
  };
}

export default connect(mapStateToProps)(Narrate);
