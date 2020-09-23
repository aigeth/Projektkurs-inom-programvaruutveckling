import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/** App render test 
* 
* @author Kamile Juvencius
*/
test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
