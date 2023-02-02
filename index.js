const express = require('express');
const app = express();
const port = 8080;

// Just here to pass Fly.io healthchecks.
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

async function readme() {
  const PgBoss = require('pg-boss');
  const boss = new PgBoss(process.env.DATABASE_URL);

  boss.on('error', error => console.error(error));

  await boss.start();

  const queue = 'some-queue';

  await boss.schedule(queue, '* * * * *');

  console.log(`created cronjob in queue ${queue}`);

  await boss.work(queue, someAsyncJobHandler);
}

async function someAsyncJobHandler(job) {
  console.log(`running job ${job.id}`);
}

readme();
