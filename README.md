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
  - Most recent transactions
- Add a form to submit transactions
  - Only has to have sending/beam (payment) operation
  - Creating can be automatic, just whenever the Fed returns the need or a normal address doesn't exist (seen from error)
  - Either way, message needs to be **clear** that the txn will require 
    - Minimum **10 XDB** sent to new account and **10 XDB** leftover, so min **20 XDB + gas (XDB) + transfer amt**
  - XDB values displayed in a base currency (ZUSD????) would also be useful, but that's roadmap stuff
- Set up the Go server, which will have federation and also txn building (since I can't get the JavaScript SDK working)
  - Test out the transaction builder part
- Download Go, PostgreSQL, and the federation server and test them locally


### To Do but less important

- Figure out how to add people to the database (when making their account)
- Set up netlify

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

##### Database Details

DB PK will be email, and someone can have multiple emails pointing to one ID but each email can only have one ID, otherwise transactions will just not work.
The only other field will be domain, which is pretty much always gonna be xdbe.am for this implementation.
The default federation.cfg has name instead of email. It doesn't *need* to be changed but just to keep in mind.

Extra field for XDBeam is gonna be needs-creation.
If it has "y" then a text memo will be added to the returned data with "needs-creation".
  Wallets will have to pass this message on, or automatically add a creation transaction if they are more hands-off.
If it has "n" then there will be no memo.

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
  
#### Initial/Current XDBeam Wallet Implementation  
  
Given the current time limitations, what *will* happen (if there is no record) is:
- If applicable, App checks destination address against Fed
- Fed checks validity of email
- Fed generates keypair and saves details in fed DB and Creation DB
- Fed returns id with memo "needs-creation"
- App will alert to the need for a creation operation
- Once there is one, App sends txn details (including sign) to Txn Server
- TxnS generates XDR and submits it
- TxnS returns success/error messages to App as appropriate

From Fed return stage:
- Fed listens for transactions to accounts with "needs-creation"
- Once there is one, it sends an email to the related address with data from Creation table and changes needs-creation to "n"
  - Optional, but good for scaling, after a set time (2 hrs?) un-created accounts are deleted from both DBs.
  
XDBeam can be split up into one service with a wallet interface (the current implementation) and another site just for Federation.
It will need to prove the link between each address so it will need to make a proof transaction.
That part can be "in the future", not fully related to the current project, but would extend XDBeam to add better compatibility to other wallets.
This will also mean less needless new accounts being created.

Ideally there will be a check for the federation and email stuff before they have to sign, just so they know if they are sending it to the right place.
Idk if this fits with the general pattern for wallets and transactions though.

I think it means that the fed server would be called before the txn server, but if it doesn't have anything to return it will make up the key, but it won't really exist yet. Then will the fed server be called again later so it can make the account?
Probably instead of creating the account, the fed server should instead let the wallet know that an account needs to be created. Something in the response.
Then it can watch for the creation of the account, like the XDB page says, and send the email after it has been created. 
It will need to keep the pair in a DB still, but if its in the fed DB it will need to have it marked as "needs-creation".
Then once it is created this can be updated to "n" by the process that sends the email and stuff.
So I'll add that part into the DB.
It can be returned by the fed server in a text memo.
Other wallets will have to update to display this though.
If they don't it will just not send stuff to accounts that haven't been created and return an error.
Some wallets may already be able to adjust the transaction to include a creation operation.

For the xdbeam wallet, creation will be automatic, as well as setting their home domain to xdbe.am (maybe also set inflation dest for revenue).
