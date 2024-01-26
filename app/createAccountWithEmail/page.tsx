'use client'

import { login_container } from "../components/styles"
import SignOrCreateAccountWithEmail from "../login/SignOrCreateAccountWithEmail"

const CreateAccountWithEmail = () => {
  return (
    <div className={login_container}>
        <SignOrCreateAccountWithEmail isCreate={true} />
    </div>
  )
}

export default CreateAccountWithEmail