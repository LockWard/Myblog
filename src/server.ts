import app from './index.js';
import { PORT } from './config/config.js';
import './libs/inititalSetup.js'; // This create the user admin and its role

app.listen(PORT, () => {
    console.log(`Listening on port...${PORT}`)
});