import app from './app'
import 'dotenv/config';

app.listen(process.env.PORT || 5000, () => console.log("server is at port " + process.env.PORT))