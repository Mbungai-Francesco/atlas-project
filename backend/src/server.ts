import express, {Request,Response} from 'express';
require('dotenv').config()
require('../routes/UserRoutes')
import UserRoutes from '../routes/UserRoutes'
import TeacherRoutes from "../routes/TeacherRoutes"



const app = express()

app.use(express.json())

app.get('/', (req:Request, res:Response) =>{

  res.send("hello coming from the atlas landing page")

})

app.use(UserRoutes,TeacherRoutes)
// app.use(UserRoutes,TeacherRoutes, /**.Routes */)




app.listen(5000, () => {
  console.log('server running on port 5000 : http://localhost:5000')
})


