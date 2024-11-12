import express from 'express'

import { routes } from './presentation/routes/routes';
import swaggerUi from 'swagger-ui-express'
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const swaggerFile = JSON.parse(fs.readFileSync(path.join(__dirname, '../docs/swagger.json'), 'utf8'));

app.use(cors())
app.use(express.json())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes)

app.listen(3000, () => 'Server running on port 3000')