# Password Detective

Checks a user's password against a data set of compromised passwords on https://haveibeenpwned.com/.

## How it works

The user's password is hashed using SHA-1 and the first five characters are sent to the [haveibeenpwned API](https://haveibeenpwned.com/API/v3). The API returns a list of hashes which begin with these five characters and password detective checks if the user's password hash is included in this list.

## Usage

Use the -p option to pass in a password

```
$ pass-detect -p
```

Use the -h option to display the help menu

```
$ pass-detect -h
```

## Acknowledgements

Special thanks to Dr Mike Pound of Computerphile for inspiring this project. https://www.youtube.com/watch?v=hhUb5iknVJs 

## License

* [MIT](LICENSE)
