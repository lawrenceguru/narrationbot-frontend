import React, { useState, useEffect } from "react";

import { Redirect } from 'react-router-dom';
import { Button, notification, Alert, Row, Col } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { Polly, PollyClient, StartSpeechSynthesisTaskCommand } from "@aws-sdk/client-polly";
import { getSynthesizeSpeechUrl } from "@aws-sdk/polly-request-presigner";
import { useSelector, useDispatch } from "react-redux";

import UserService from "../services/user.service";
import Languages from "../config/configLanguages.json"

import { addBalence } from "../actions/account";
import { history } from '../helpers/history';
// import { getUser } from "../actions/account";

import AWS from 'aws-sdk'

const S3_BUCKET ='narrationbot.s3.bucket';
const REGION ='us-east-1';


AWS.config.update({
    accessKeyId: 'AKIAQU3HY5MISINLJZ4H',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})


const client = new Polly({
  region: "us-east-1",
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: "us-east-1" }),
    identityPoolId: "us-east-1:1b4b8a28-f01e-4b2c-a7a7-9fdb90f4f2dc" // IDENTITY_POOL_ID
  }),
});

const close = () => {
  console.log(
    'Notification was closed. Either the close button was clicked or duration time elapsed.',
  );
};

const openNotification = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => {notification.close(key); history.push("/profile");}}>
      Go to
    </Button>
  );
  notification.open({
    message: 'Note',
    description:
      'You need to have balance for this. Go to account page?',
    btn,
    key,
    onClose: close,
  });
};

const downloadFileAlert = () => {
  notification.open({
    message: 'Note',
    description:
      'Updating... Please just second.',
    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
  });
};

const openNotificationRequired = (_it) => {
  notification.open({
    message: 'Note',
    description:
      _it,
    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
  });
};


const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [voicer, setVoicer] = useState([])
  const [text, setText] = useState('')
  const [language, setLanguage] = useState()
  const [sendVoicer, setSendVoicer] = useState()
  const [loading, setLoading] = useState(false)
  const [audio, setAudio] = useState()
  const [balence, setBalence] = useState()
  const [devideLength, setDevideLength] = useState(0)
  const [toggleAudioTag, setToggleAudioTag] = useState(false)
  const [url, setUrl] = useState()
  const [downButton, setDownButton] = useState(false)
  const [downButtonSub, setDownButtonSub] = useState(true)
  const [downLoadUrl, setDownLoadUrl] = useState()

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getUser())
  // }, [])
  useEffect(() => {
    setBalence(currentUser.balence)
  }, [currentUser])
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  const downloadActive = async () => {
    var blob = await fetch(downLoadUrl).then(r => r.blob());
    console.log(blob)
    if (blob.type === 'application/xml') {
      downloadFileAlert()
    } else {
      const Url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = Url;
      link.setAttribute('download', 'file.mp3'); //or any other extension
      document.body.appendChild(link);
      link.click();
      setAudio(Url)
      document.getElementById('speechAudio').play()
      setDownButtonSub(true)
    }
  }
  const getVoiceUser = val => {
    setLanguage(val)
    setLoading(true)
    UserService.getVoiceUser(val)
      .then(({ data }) => {
        setVoicer(data.Voices)
        setLoading(false)
      })
      .catch((data) => {
        console.log(data)
      });
  }
  
  const listenToSpeech = async () => {
    if (text && sendVoicer) {
      if (balence - devideLength < 0) {
        openNotification()
      } else {
        setLoading(true)
        console.log(text.length)
        const speechParams = {
          OutputFormat: "mp3", // For example, 'mp3'
          SampleRate: '16000', // For example, '16000
          Text: text, // The 'speakText' function supplies this value
          TextType: "text", // For example, "text"
          VoiceId: sendVoicer // For example, "Matthew"
        };
        try {
          let urlSpeech = await getSynthesizeSpeechUrl({
            client, params: speechParams
          });
          // Load the URL of the voice recording into the browser
          setAudio(urlSpeech)
          var tempUser = currentUser
          setToggleAudioTag(true)
          document.getElementById('speechAudio').play()
          setUrl(urlSpeech)
          // var blob = await fetch(urlSpeech).then(r => r.blob());
          // var d = new Date()
          // var fileUrl = tempUser.email + d.getTime() +'.mp3'
          // const params = {
          //     // ACL: 'public-read',
          //     Body: blob,
          //     Bucket: S3_BUCKET,
          //     Key: fileUrl
          // };
          // await myBucket.putObject(params)
          //     .on('httpUploadProgress', (evt) => {
          //       console.log(evt)
          //         // setProgress(Math.round((evt.loaded / evt.total) * 100))
          //     })
          //     .send((err) => {
          //         if (err) console.log(err)
          //     })

          // // setUrl(urlSpeech)
          // var sendBalence = balence - devideLength
          // setBalence((prev) => prev = prev - devideLength)
          // document.getElementById('speechAudio').play()
          // setToggleAudioTag(true)
          // tempUser.balence = Number(sendBalence)
          // tempUser.language = language
          // tempUser.sentence = text
          // tempUser.user_id = tempUser.sub
          // tempUser.voicer = sendVoicer
          // tempUser.url = 'https://s3.amazonaws.com/narrationbot.s3.bucket/' + fileUrl
          // dispatch(addBalence(tempUser))
          // setDevideLength((prev) => prev + ' ' )
          // setLoading(false)

          var params = {
            OutputFormat: "mp3",
            OutputS3BucketName: S3_BUCKET,
            Text: text,
            TextType: "text",
            VoiceId: sendVoicer,
            SampleRate: "22050"
          };
          try {
            const data = await client.send(
              new StartSpeechSynthesisTaskCommand(params)
            );
            // setDownLoadUrl(data.SynthesisTask.OutputUri)
            var sendBalence = balence - devideLength
            setBalence((prev) => prev = prev - devideLength)
            var tempUser = currentUser
            tempUser.balence = Number(sendBalence)
            tempUser.language = language
            tempUser.sentence = text
            tempUser.user_id = tempUser.sub
            tempUser.voicer = sendVoicer
            tempUser.url = data.SynthesisTask.OutputUri
            dispatch(addBalence(tempUser))
            
            setLoading(false)
          } catch (err) {
            console.log("Error putting object", err);
            setLoading(false)
          }

        } catch (err) {
          console.log("Error", err);
          setLoading(false)
        }
      }
    } else {
      openNotificationRequired('Required Text and Voice field')
    }
  }
  const saveToSpeech = async () => {
    setLoading(true)
    setAudio(url)

    var blob = await fetch(url).then(r => r.blob());

    const link = document.createElement('a');
    const Url = window.URL.createObjectURL(blob);
    link.href = Url;
    link.setAttribute('download', 'file.mp3'); //or any other extension
    document.body.appendChild(link);
    link.click();
    setLoading(false)
  }
  const downloadFromS3 = async () => {
    if (text && sendVoicer) {
      if (balence - devideLength < 0) {
        openNotification()
      } else {
        setLoading(true)
        // Create the parameters
        var params = {
          OutputFormat: "mp3",
          OutputS3BucketName: S3_BUCKET,
          Text: text,
          TextType: "text",
          VoiceId: sendVoicer,
          SampleRate: "22050"
        };
        try {
          const data = await client.send(
            new StartSpeechSynthesisTaskCommand(params)
          );
          setDownLoadUrl(data.SynthesisTask.OutputUri)
          var sendBalence = balence - devideLength
          setBalence((prev) => prev = prev - devideLength)
          var tempUser = currentUser
          tempUser.balence = Number(sendBalence)
          tempUser.language = language
          tempUser.sentence = text
          tempUser.user_id = tempUser.sub
          tempUser.voicer = sendVoicer
          tempUser.url = data.SynthesisTask.OutputUri
          dispatch(addBalence(tempUser))
          setDevideLength((prev) => prev + ' ' )
          
          downloadFileAlert()
          setLoading(false)
          setDownButtonSub(false)
          setDownButton(false)
        } catch (err) {
          console.log("Error putting object", err);
          setLoading(false)
        }
      }
    } else {
      openNotificationRequired('Required Text and Voice field')
    }
  }
  const onChangeText = (e) => {
    setText(e)
    if (e.length > 3000) {
      setDownButton(true)
      setDownButtonSub(true)
    } else {
      setDownButton(false)
    }
    if(e === '') {
      setDevideLength((prev) => 0)
    } else {
      setDevideLength((prev) => e.split(' ').length)
    }
  }
  return (
    <div className="container">
      {loading &&
        <div className='block_ui'>
          <div>
            <span className="spinner-border spinner-border-sm"></span> Loading...
            </div>
        </div>
      }
      <Row gutter={16}>
        <Col span={12}>
          <Alert message={'Your Balance: ' + balence} type="success" />
        </Col>
        <Col span={12}>
          <Alert message={'Reducing Balance: ' + devideLength} type="warning" />
        </Col>
      </Row>
      <div className='row'>
        <div className='col-12'>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Input text</label>
            <textarea value={text} onChange={(e) => onChangeText(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="7"></textarea>
          </div>
        </div>
      </div>
      <Row style={{ marginBottom: 10 }}>
        <Col span={12}>
          Character number: {text.length}
        </Col>
        <Col span={12} className='text-right'>
          <a href='#' onClick={() => setText('')}>Clear Text</a>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <audio style={{ width:'100%', marginBottom: 10 }} src={audio} controls="controls" id="speechAudio" />
        </Col>
      </Row>
      <div className='row'>
        <div className='col-4'>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1" style={{ marginTop: 0 }}>Language and Region</label>
            <select className="form-control" id="exampleFormControlSelect1" onChange={(e) => getVoiceUser(e.target.value)}>
              {Languages?.data.map((_res, index) => (
                <option key={index} value={_res.LanguageCode}>{_res.Language}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='col-4'>
          <div>Voice</div>
          {voicer && voicer.map((_res, index) => (
            <div className="form-check" key={index}>
              <input onClick={(e) => setSendVoicer(e.target.value)} className="form-check-input" type="radio" name="exampleRadios" id={_res.Id} value={_res.Id} />
              <label className="form-check-label" htmlFor={_res.Id}>
                {_res.Id} , {_res.Gender}
              </label>
            </div>
          ))}

        </div>
        <div className='col-4'>
          <div style={{ marginBottom: '20px' }}>
            <button disabled={text.length > 3000} onClick={() => listenToSpeech()} type="button" className="btn btn-primary btn-lg btn-block">Listen to speech</button>
          </div>
          <div>
            <button disabled={!toggleAudioTag && 'disabled'} onClick={() => saveToSpeech()} type="button" className="btn btn-secondary btn-lg btn-block">Save speech as MP3</button>
          </div>
          <div style={{ marginTop: '20px' }}>
            <button hidden={!downButton} onClick={() => downloadFromS3()} type="button" className="btn btn-primary btn-lg btn-block">Download</button>
            <button hidden={downButtonSub} onClick={() => downloadActive()} type="button" className="btn btn-primary btn-lg btn-block">Download</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Home
