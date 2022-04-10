import UserPanel from "components/user/UserPanel";
import {subscribeUserStore} from "store/user";

const panel = new UserPanel();

subscribeUserStore( ({state}) => {
  panel.appendUsers(state.users);
})

app.append(panel);