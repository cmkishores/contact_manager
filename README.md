# contact_manager
## Local Setup

Python 3 and [Pipenv](https://docs.pipenv.org/) need to already be installed. If you need more complete local dev instructions, [see here](https://djangoforbeginners.com/initial-setup/).

Clone the repo to your computer. For example, to place it on your `Desktop`.

```
$ cd ~/Desktop
$ git clone https://github.com/cmkishores/contact_manager.git
$ cd contact_manager
```

## Backend

Install the `Pipenv` packages and start a new shell. Then from the root directory and run the local server.

```
$ pipenv install
$ pipenv shell
(contact_manager) $ ./manage.py runserver
```

You can see the API now at [http://127.0.0.1:8000/api](http://127.0.0.1:8000/api).

## Frontend

Open up a new command line console so there are now **two** open. Navigate to the `frontend` directory inside the root directory.

```
$ cd frontend
```

Make sure React is already installed globally. If not `$ npm install -g create-react-app`.

Then install necessary packages and start the React server:

```
$ npm install
$ npm start
```

Navigate to [http://localhost:3000/](http://localhost:3000/) to see a list of our DRF backend content outputted using React.

## Note

* Addd API Key in a ```.env``` file in ```frontend/ ```
* If mail ID is present in Enrich API, description and title is automatically fetched.
