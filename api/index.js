import {account} from './account/index';
import {device} from './device/index';

export const apiFactory = () => ({
  data: {
    account: () => account(),
    device: () => device(),
  },
});
