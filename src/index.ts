import Router from './core/Router';
import Store from './core/Store';

import Error404 from './pages/error/Error404';
import Error505 from './pages/error/Error505';
import Singin from './pages/singin/singin';
import Singup from './pages/singup/singup';
import Profile from './pages/profile/profile';
import ProfileEdit from './pages/profile/profile_edit';
import Chats from './pages/chats/chats';

import './styles/global_styles.scss';
import './styles/profile_pattern.scss';
import './styles/profile.scss';
import './styles/chat.scss';

export enum StoreEvents {
  Updated = 'updated',
}

Store.on(StoreEvents.Updated, () => {});

Router.use('/404', Error404)
  .use('/505', Error505)
  .use('/sign-up', Singup)
  .use('/', Singin)
  .use('/settings', ProfileEdit)
  .use('/messenger', Chats)
  .use('/profile', Profile)
  .start();
