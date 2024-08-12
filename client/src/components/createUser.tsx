import { useClerk, useUser } from "@clerk/clerk-react";

const CreateUser = () => {
  const { session } = useClerk()
  const {user} = useUser()

  const createUser = async () => {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user?.username,
        email: user?.emailAddresses[0].emailAddress,
        clerkId: user?.id,
      })
  })
}