import React, { useState } from 'react'
import { Modal, Button, Row, Col, Form, Select, Card, Divider, Alert } from 'antd'
import { connect } from "react-redux";
import { addBalence, userUpdateBalance } from "../../actions/account";

const {Option} = Select
const BuyComponent = ({ user: currentUser, dispatch }) => {
  
  const [visible, setVisible] = useState(false)
  const [manaulBalence, setManaulBalence] = useState({balence: '10000', money: 10})

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
      setVisible(false)
      var tempUser = currentUser
      tempUser.balence += Number(manaulBalence.balence)
      tempUser.user_id = currentUser.sub
      // currentUser.money = manaulBalence.money
      console.log(tempUser)
      dispatch(userUpdateBalance(tempUser))
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setVisible(false)
  }

  const manualChange = (e) => {
    var money;
    if (e === '10000') {
      money = 10
    } else if (e === '20000') {
      money = 15
    } else {
      money = 20
    } 
    // setManaulBalence((prev) => {
    //   prev.balence = e
    //   prev.money = money
    // })
    setManaulBalence({balence: e, money: money})
  }
  return (
    <>
      <Row gutter={0, 24}>
        <Col span={12}>
          <Card title="Manually" bordered={true}>
            <p>10,000 for 10$</p>
            <p>20,000 for 15$</p>
            <p>30,000 for 20$</p>
            <Divider />
            <div className='text-right'>
              <Button type="primary" onClick={showModal}>
                Buy
              </Button>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Subscription" bordered={true}>
            <p>per week for 20$</p>
            <p>per month for 50$</p>
            <p>peryear for 200$</p>
            <Divider />
            <div className='text-right'>
              <Button type="primary" danger onClick={showModal}>
                Buy
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
      
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel} key="1">Cancel</Button>,
          <Button onClick={handleOk}  key="2" type="primary">
            Buy
          </Button>
        ]}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Alert message={'Your availbale Words: ' + currentUser.balence} type="info" />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
          <div><label htmlFor='amount'>Select the amount to buy</label></div>
          <Form.Item id='amount'>
            <Select
              placeholder="Select the amount to buy"
              onChange={(e) => manualChange(e)}
              allowClear
              defaultValue={manaulBalence.balence}
            >
              <Option value="10000">10,000 for $10</Option>
              <Option value="20000">20,000 for $15</Option>
              <Option value="30000">30,000 for $20</Option>
            </Select>
          </Form.Item>
          </Col>
        </Row>
        <Row style={{ marginBottom: '20px' }}>
          <Col span={24}>
            <Alert message={'Your account will be charged: $' + manaulBalence.money} type="warning" />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Alert message={'Your new Words balance will be: ' + (Number(currentUser.balence) + Number(manaulBalence.balence))} type="success" />
          </Col>
        </Row>
      </Modal>
    </>
  )
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(BuyComponent);