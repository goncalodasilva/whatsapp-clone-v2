import AllInboxIcon from '@mui/icons-material/AllInbox';
import { welcome_inbox, welcome_inbox_text, welcome_inbox_title } from './styles';

const WelcomeInbox = () => {
  return (
    <div className={welcome_inbox}>
        <h1 className={welcome_inbox_title}>
        Welcome to you inbox
        </h1>
        <p className={welcome_inbox_text}>👈 To see your messages click on a chat in the side bar</p>
        <AllInboxIcon className="m-6" sx={{ height: 200, width: 200 }} />
    </div>
  )
}

export default WelcomeInbox