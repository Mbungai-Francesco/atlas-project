const GetUsers = async () =>{
  try {
    const response = await fetch(`http://localhost:5000/api/users`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error);
  }
}

export default GetUsers