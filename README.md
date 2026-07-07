# Developer Training Repo

This is the Developer Training Repo for Golioth. Here we have two main items:
* [The Docusaurus v2 based website](https://golioth.github.io/developer-training/) that includes all training material
* The [Golioth Docs](https://github.com/golioth/docs) as a submodule so that it's easy to update SDK install instructions across documentation sites.

## Installing this repo locally

Clone the repository (along with the submodule):

```console
git clone git@github.com:golioth/developer-training.git
cd developer-training
git submodule update --init
```

## Update the Golioth Docs submodule

When updates are made to the Golioth Docs repo, they can be pulled into this one by updating the submodule to the tip of its default branch (`main`):

```console
git submodule update --remote --merge
```

This leaves the updated submodule pointer staged, so commit it to record the update:

```console
git add submodule-goliothdocs
git commit -m "Update Golioth Docs submodule"
```

> **Note:** Don't use `git submodule foreach git pull`. Submodules are checked out in a detached-HEAD state, so a plain `git pull` has no branch to track and fails with *"You are not currently on a branch."*

## Testing and Deploying

The Docusaurus site lives in the `website/` directory, so run all npm commands from there.

Docs pages can be tested locally:

```bash
cd website
npm install
npm start
```

Docs can be deployed to the live page by running:

```bash
cd website
npm run deploy
```
