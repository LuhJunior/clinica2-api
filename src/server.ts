import { port, logger } from './config';
import app from './app';

app.listen(port, () => console.log(`Server listening on ${port}`));
