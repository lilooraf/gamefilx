# Getting Started


You have two ways to run this project:

### 1. Use Docker

For this option you need to have [Docker](https://www.docker.com/) and [make](https://www.gnu.org/software/make/manual/make.html) installed on your machine.

#### Build the docker image and start the development server run:

```bash
make app-development
# or
make app-production
```

You can check the [Makefile](./Makefile) to see all the options or run `make help` to see all the commands for [Docker](https://www.docker.com/).


### 2. Use Local Node

### Node
First, install the dependencies:

```bash
yarn
```

Then, build the project:

```bash
yarn build
```

Finally, start the development server:

```bash
yarn dev
```

### Database

You need to have a [PostgreSQL](https://www.postgresql.org/) database running on your machine or online.

You can configure the database connection on the [.env](./.env).

After that, you need to push the migrations to the database:

```bash
yarn prisma migrate deploy
```

Then, run the seeds to populate the database:

```bash
yarn prisma db seed
```

---

### Enjoy!

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about [GameFlix](https://www.youtube.com/watch?v=gkTb9GP9lVI), take a look at the following resources:

- [Documentation](https://www.youtube.com/watch?v=dQw4w9WgXcQ) - learn about our API.

You can check out [the GitHub repository](https://github.com/lilooraf/gamefilx) - your feedback and contributions are welcome!