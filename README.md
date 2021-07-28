# XDBeam

### Send digitalbits to *anyone*

This is my project for the [**Next Top Blockchain Startup** Hackathon][1].
It is based off an idea from the [digitalbits docs][2] which will be the first of its kind in the digitalbits ecosystem.
XDBeam is aiming to become the most prominent federation service for digitalbits, but it is only just the beginning.

Visit the current page at [XDBe.am][3] or watch [the introduction video][4].

If you have any feedback or advice, I can be contacted through info@xdbe.am (I'll know what you're talking about) or w.surjenko@gmail.com.

[1]: https://topblockchainstartup.com/
[2]: https://developer.digitalbits.io/guides/things-to-build.html#digitalbits-to-any-email-address
[3]: https://XDBe.am
[4]: /# "It's not here yet hehe"

### Thanks for taking a look!

(The rest is to organise myself haha)

## To Do:

- Add a wallet part to display:
  - Balances of CDAs
  - Most recent transactions
- Put the [DigitalBits JS SDK](https://xdbfoundation.github.io/js-digitalbits-sdk/) in a separate .js file and reference it like a store
  - Swap out the REST API usage for this one
    - even though i spent so much time on it ;((((
  - Test out the transaction builder part
- Download Go, PostgreSQL, and the federation server and test them locally


### To Do but less important

- Figure out how to add people to the database (when making their account)
- Integrate federation part with Netlify if HostCab says it can't be done there
  - Add a subdomain and make it point to Netlify

## Notes

### Federation - How Does It Work?

To my understanding, there are 6 main steps, usually.

1. The website or app gets the address ending in *xdbe.am
2. They submit the transaction to the digitalbits API
3. The digitalbits API looks into xdbe.am/.well-known/digitalbits.toml
   - They are looking for FEDERATION_SERVER="https://<wherever-the-fed-server-is.tld>"
4. The digitalbits API asks the federation server at the address specified there for a federation record
    - The response to this is configured in the federation.cfg file, but it is usually a SQL query
5. The fed server sends the SQL query to the database it has recorded (also in federation.cfg)
6. The response is sent back through the fed server to the API, who then will hopefully have a normal address to send the CDAs to
   - If they don't, the API will send back an error, which will probably be dispayed in the app

So the places which need to be set up are:
- The digitalbits.toml in HostCab
- The federation server literally anywhere
- The database can be anywhere also
- (Bonus from further down) Extra API for making new accounts can also be anywhere (but I want to put it on HostCab)

#### XDBeam Differentiation

In step 5, the SQL query might return nothing. This means there is no record.
What is supposed to happen now is a new empty account is created and linked in the database, and then that account is sent back to the API.
So the federation server needs to be the one intercepting the empty return and doing something about it, 
because I can't put it into the digitalbits API, and I can't ensure that every wallet has my code to make the new account.

The federation server needs to: 
- Check the returned data from the query.
- If it is not found, it needs to check the validity of the email.
- If it is a valid email, create a key pair and return the address to the API.
- Watch the address for creation transaction (through API calls? through subscription?) \*
- If it is created:
  - Send an email with the details of the account
    - This part can be optimised for security in future development with having encryption and sending a link rather than the seed itself \*
  - Add the pair to the database
  
\* Sending digitalbits to a non-existent account does not automatically create it.
A creation operation must be added to the transaction for it to work.
For now, it can be added to the XDBeam wallet but it will have to be a transaction made by the federation server.
  
\* The new account should have XDBeam as a signer so that we can close the account down and remove it from the DB if nothing ever happens to it.
Also it will allow an easy merging process if that option is chosen.
Once the person confirms reception of their seed and key, a transaction will be made to remove XDBeam as a signer.
  
#### Initial/Current XDBeam Implementation  
  
Given the current time limitations, what *will* happen (if there is no record) is:
- App sends transaction to API
- API checks fed server for account
- Fed server sees there is no record and calls another API
- New API generates keypair, creates the account, adds it to the db, sends an email, returns the keypair
- Fed server returns the address
- API and App continue as if nothing went wrong
  
New API can be integrated into the fed server if I learn GoLang, or it can be made with Node.js and put onto HostCab.
Advantage of Node is the reuse of the JS SDK I'm using in the web app, and also more tutorials and dev help.
Probably initial implementation with Node and then if I am told to continue development I can do Go as well.
