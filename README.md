# Developer Training Repo

This is the Developer Training Repo for Golioth. Here we have two main items:
* [The Docusaurus v2 based website](https://golioth.github.io/developer-training/) that includes all training material
* The [Golioth Docs](https://github.com/golioth/docs) as a submodule so that it's easy to update SDK install instructions across documentation sites.

## Installing this repo locally

Clone the repository (along with the submodule):

```console
git clone git@github.com:golioth/developer-training.git
git submodule update --init
```

## Update the Golioth Docs submodule

When updates are made to the Golioth Docs repo, the can be pulled into this one by updating the submodule:

```console
git submodule foreach git pull
```

## Testing and Deploying

Docs pages can be tested locally:

```bash
npm install
npm start
```

Docs can be deployed to the live page by running:

```bash
npm run deploy
```
