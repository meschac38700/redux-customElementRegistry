import UserPanel from "components/user/UserPanel";
import { subscribeUserStore } from "store/user";
import NotificationListElement from "components/shared/NotificationListElement";


const panel = new UserPanel();

subscribeUserStore( ({state}) => {
  panel.appendUsers(state.users);
})

// handler notification
panel.addElement(new NotificationListElement());
app.append(panel);
