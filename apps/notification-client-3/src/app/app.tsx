
import { Notification } from "./components/notification";

import { AppWrapper } from "./components/style";

export function App() {
  return (
    <AppWrapper>
      <Notification userId="3" user_role={['RPROJECTA_ROLE_1', 'RPROJECTA_ROLE_2']} />


    </AppWrapper>
  );
}

export default App;
