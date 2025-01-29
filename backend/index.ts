import app from './app';
import { config } from "./src/config/env";

const PORT = config.PORT ;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})