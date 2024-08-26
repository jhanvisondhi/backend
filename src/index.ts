import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import user from '../src/models/User';
const app = express();
const PORT = process.env.PORT || 5000;
const uri = "mongodb+srv://sondhijhanvi68:RflXUAr7w486ekKl@cluster0.fy6cq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

 
  mongoose
    .connect(uri, { dbName: "Signin" })
    .then((e) => console.log("DB Connected"))
    .catch((err) => {
      throw err;
    });

app.use(cors());
app.use(bodyParser.json());

app.post('/api/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Simple hardcoded check (for demo purposes only)
  if (email === 'test@example.com' && password === 'password') {
    res.status(200).send({ message: 'Login successful' });
  } else {
    res.status(401).send({ message: 'Invalid email or password' });
  }
});

app.post('/api/signup', async (req: Request, res: Response) => {
  try {
    const data = await user.create(req.body)
    res.status(201).json({
        status:"success", data

    }) 
}
catch(e){
    console.log(e);
}
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
