The goal of this repo is to show a minimal reproducable example for an error that ends up killing node when the database is removed on Fly.io.

## To launch on fly
Run `fly launch` in this directory.

> **Note**
> Make sure you say yes to both creating a PostgreSQL database and to deploying.

## Log error output
Run `fly logs` to view the logs. There should be a `fly.toml` file in this dir from launching, so it knows what app to show the logs for.

When the app is running, go into the UI and delete the database app.

See fly.logs for an example of what happens, where it fails for a few seconds then the node process terminates.

However, if I remove `pg-boss` from the app and do the same thing, it does not die, this isn't some Fly.io behavior that somehow notices the DB was deleted and reaps the app. It seems like `pg` maybe cannot handle a DNS loss of the hostname while running, or we need to trap some error better in `pg-boss` or the app itself?
