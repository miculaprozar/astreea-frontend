import { account } from "./account/index";

export const apiFactory = () => ({
  data: {
    account: () => account(),
  },
});
