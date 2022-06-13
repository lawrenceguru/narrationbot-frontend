import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import footer_logo from '../../../assets/image/footer_logo.svg'
import footer_icon1 from '../../../assets/image/footer_icon1.svg'
import footer_icon2 from '../../../assets/image/footer_icon2.svg'
import footer_icon3 from '../../../assets/image/footer_icon3.svg'
import footer_icon4 from '../../../assets/image/footer_icon4.svg'
import './styles.css'

const Footer = () => {
  return (
    <div id='footer'>
      <div className='row'>
        <div className='col-md-4 footerLogo'>
          <img src={footer_logo} alt='' />
        </div>
        <div className='col-md-2'>
          <div className='footerListTitle'>Company</div>
          <div className='footerListUl'>About Us</div>
          <div className='footerListUl'>Careers</div>
          <div className='footerListUl'>Press & Media</div>
          <div className='footerListUl'>Contact Us</div>
        </div>
        <div className='col-md-2'>
          <div className='footerListTitle'>Discover</div>
          <div className='footerListUl'>Our Blog</div>
          <div className='footerListUl'>Advertising</div>
          <div className='footerListUl'>Plans & Pricing</div>
          <div className='footerListUl'>Testimonials</div>
        </div>
        <div className='col-md-2'>
          <div className='footerListTitle'>Legal</div>
          <div className='footerListUl'>Terms of Use</div>
          <div className='footerListUl'>Privacy Policy</div>
          <div className='footerListUl'>Cookie Policy</div>
          <div className='footerListUl'>All FAQs</div>
        </div>
        <div className='col-md-2'>
          <div className='footerListTitle'>Connect With Us</div>
          <div className='footer_icon_list'>
            <img src={footer_icon1} alt='' />
            <img src={footer_icon2} alt='' />
            <img src={footer_icon3} alt='' />
            <img src={footer_icon4} alt='' />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          2021 © Copyright, Narration Bot. All rights reserved.
        </div>
        <div className='col-md-6'>
          Terms & Privacy | Privacy Policy
        </div>
      </div>
    </div>
  );
}

export default Footer