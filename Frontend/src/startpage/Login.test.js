import React from 'react';
import Login from './Login';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/** Login render test
* 
* @author Kamile Juvencius
*/
describe('<Login />', () => {
    const initialProps = {
        eMail: 'tariqd@kth.se',
        password: 'kth'
      };

      Enzyme.configure({ adapter: new Adapter() });
      const container = shallow(<Login {...initialProps}/>);

      it('should have proper props for email field', () => {
        expect(container.find('input[type="email"]').props()).toEqual({
            placeholder:"Enter email",
            class:"form-control",
            type:"email",
            name:"eMail",
            onChange: expect.any(Function)
        });
      });
      it('should have proper props for password field', () => {
        expect(container.find('input[type="password"]').props()).toEqual({
            placeholder:"Enter password",
            class:"form-control",
            type:"password",
            name:"password",
            onChange: expect.any(Function)
        });
      });
      it('should have proper props for a submit button', () => {
        expect(container.find('input[type="submit"]').props()).toEqual({
            className:"btn btn-secondary btn-sm m-2",
            type:"submit",
            value:"Log in",
            onClick: expect.any(Function)
        });
      });
      it('should have proper props for a forgot password link button', () => {
        expect(container.find('Link[to="/forgot"]').props()).toEqual({
            children: <button className="btn btn-secondary btn-sm m-2">
                    Forgot password?
                </button>,
            to: "/forgot",
        });
      });
      it('should have proper props for a raw fury logo', () => {
        expect(container.find('img[alt="rawfury"]').props()).toEqual({
            alt:"rawfury",
            src:"rawF.png",
            style: {blockSize: 180}
        });
      });
})
