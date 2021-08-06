# XDBeam

### Send digitalbits to *anyone*

#### DigitalBits' premier public federation service

This is my project for the [**Next Top Blockchain Startup** Hackathon][1].
It is based off an idea from the [digitalbits docs][2] which will be the first of its kind in the digitalbits ecosystem.

Currently available is a prototype UI for XDBeam's main service of facilitating easy payment transactions to users via e-mail.
Also available is a prototype UI for participating in the federation service. 
This will allows anyone to make payments to you by using your email address followed by "\*xdbe.am", instead of remembering a 56-digit string.
In the XDBeam wallet, the "\*xdbe.am" suffix will be added automatically to all payments made to email addresses, and if an account doesn't exist in our system yet, a key pair will be generated and the details sent to their email, allowing you to send your digitalbits to anyone with an email address, even if they have never used DigitalBits before.
These services will soon be available at [xdbe.am][3] and [federation.xdbe.am][5]

Watch [our introduction video][4] for more information and a walkthrough of the system.

If you have any feedback or advice, I can be contacted through info@xdbe.am or w.surjenko@gmail.com.

[1]: https://topblockchainstartup.com/
[2]: https://developer.digitalbits.io/guides/things-to-build.html#digitalbits-to-any-email-address
[3]: https://xdbe.am
[4]: /# "It's not here yet hehe"
[5]: https://federation.xdbe.am

### Thanks for taking a look!





(The rest is to organise myself haha)

## To Do:

- Add a form to submit transactions
  - Creating can be automatic, just whenever the Fed returns the need or a normal address doesn't exist (seen from error)
  - Either way, message needs to be **clear** that the txn will require 
    - Minimum **10 XDB** sent to new account and **10 XDB** leftover, so min **20 XDB + gas (XDB) + transfer amt**
- Add a federation submission page
  - Connect it
- Set up the Go server, which will have federation and also txn building (since I can't get the JavaScript SDK working)
  - Test out the transaction builder part

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
- HostCab
  - The Web App
  - /.well-known/digitalbits.toml
- Heroku
  - The Federation Server
  - The txn and management server
  - The Databases (Fed and Ctrl)

##### Database Details

DB PK will be email, and someone can have multiple emails pointing to one ID but each email can only have one ID, otherwise transactions will just not work.
The only other field will be domain, which is pretty much always gonna be xdbe.am for this implementation.
The default federation.cfg has name instead of email. It doesn't *need* to be changed but just to keep in mind.

Extra field for XDBeam is gonna be needs-creation.
If it has true then a text memo will be added to the returned data with "needs-creation".
  Wallets will have to pass this message on, or automatically add a creation transaction if they are more hands-off.
If it has false then there will be no memo.

The table name is people.

Another table will be needed for the process that sends the emails (it needs the seed, but this shouldn't be in the fed DB for security)
It will just map PK to seed.

#### XDBeam Differentiation

In step 5, the SQL query might return nothing. This means there is no record.
What is supposed to happen now is a new empty account is created and linked in the database, and then that account is sent back to the API.
So the federation server needs to be the one intercepting the empty return and doing something about it, 
because I can't put it into the digitalbits API, and I can't ensure that every wallet has my code to make the new account.

The federation server needs to: 
- Check the returned data from the query.
- If it is not found, it needs to check the validity of the email.
- If it is a valid email, create a key pair and return the address to the API.
  - Put the record in the DB, noting that it needs creation
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

## Known Issues

- Reload makes everything reset
- Each session can only handle one account login
