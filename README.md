Clone the Repo by "git clone https://github.com/kunaldey/OpenAi.git"

SERVER SETUP
===========================
* Navigate to server folder by "cd OpenAI/server"
* Create a file called ".env"
* Now create a OpenAI account if not alreayd created and login to OpenAI
* Now navigate here https://beta.openai.com/account/api-keys to generate an api-key if not alreay created. Keep it handy.
* Now edit the .env file and add the following line 
  * OPENAI_API_KEY="Your api-key"
* Save the file
* Verify id node.js is installed in the system by "node -v", if it returs the version means node is installed else install node
  * Refer here for installtion: https://kinsta.com/blog/how-to-install-node-js/
  * For linux installtion follow the commands below
    * sudo apt update
    * sudo apt-get install -y nodejs
    * sudo npm install -g npm
* Once node is installed, now run the command "npm install" to download all the dependent modules
* Now execute "npm run server"
* This should run the server on http://localhost:5000
* Copy the url and run it on a browser, if everything is find the following message should be displayed
  * {"message":"Code AI is running fine..."}

CLIENT SETUP
===========================
* Navigate to client folder by "cd OpenAI/client"
* Follow the node installtion steps from Server Installtion section, if it's not installed already
* Once node is installed, now run the command "npm install" to download all the dependent modules
* Now execute "npm run dev"
* This should run the server on http://localhost:5173
* Copy the url and run it on a browser, if everything is find the chat dashboard will appear
