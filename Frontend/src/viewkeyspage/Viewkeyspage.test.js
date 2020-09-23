import React from 'react';
import ViewKeys from './Viewkeyspage';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/** ViewKeys render test
* 
* @author Kamile Juvencius
*/

describe('<ViewKeys />', () => {

      Enzyme.configure({ adapter: new Adapter() });

    it('renders view keys page without crashing', () => {
        const viewkeyspage = shallow(<ViewKeys {...initialProps}/>);
    });
})
