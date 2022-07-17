import render from './utils/renderDOM';

import Error404 from './pages/error/Error404';
import Error505 from './pages/error/Error505';
import Singin from './pages/singin/singin';
import Singup from './pages/singup/singup';
import Profile from './pages/profile/profile';
import ProfileEdit from './pages/profile/profile_edit';
import Chats from './pages/chats/chats';

const sampleError404 = new Error404();
const sampleError505 = new Error505();
const sampleSingin = new Singin();
const sampleSingup = new Singup();
const sampleProfile = new Profile();
const sampleProfileEdit = new ProfileEdit();
const sampleChats = new Chats();

const { pathname } = window.document.location;

if (pathname === '/404') {
  render('.app', sampleError404);
} else if (pathname === '/505') {
  render('.app', sampleError505);
} else if (pathname === '/') {
  render('.app', sampleSingup);
} else if (pathname === '/singin') {
  render('.app', sampleSingin);
} else if (pathname === '/profile') {
  render('.app', sampleProfile);
} else if (pathname === '/edit') {
  render('.app', sampleProfileEdit);
} else if (pathname === '/chats') {
  render('.app', sampleChats);
}
